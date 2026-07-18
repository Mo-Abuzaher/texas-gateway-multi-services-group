import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";
import rateLimit from "express-rate-limit";
import { Pool } from "pg";
import {
  DEFAULT_SITE_URL,
  buildCanonicalUrl,
  buildOrganizationJsonLd,
  buildServiceJsonLd,
  getMetaForPage,
  getPageFromPath,
} from "./src/seo";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

// Local development fallback only. Production sessions are persisted in Postgres.
const activeTokens = new Map<string, number>();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DATABASE_URL = process.env.DATABASE_URL;
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;
const ADMIN_SESSION_COOKIE = "admin_session";

interface InquiryRecord {
  id: string;
  fullName: string;
  firmEmail: string;
  serviceSector: string;
  notes: string;
  createdAt: string;
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);
  const isProduction = process.env.NODE_ENV === "production";
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  const db = DATABASE_URL
    ? new Pool({
        connectionString: DATABASE_URL,
        ssl:
          process.env.DATABASE_SSL === "false"
            ? false
            : {
                rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
              },
      })
    : null;

  const initializeLocalInquiryStore = () => {
    try {
      const dataDir = path.dirname(INQUIRIES_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (!fs.existsSync(INQUIRIES_FILE)) {
        fs.writeFileSync(INQUIRIES_FILE, "[]", "utf8");
      } else {
        const content = fs.readFileSync(INQUIRIES_FILE, "utf8").trim();
        if (!content) {
          fs.writeFileSync(INQUIRIES_FILE, "[]", "utf8");
        } else {
          JSON.parse(content);
        }
      }
    } catch (err) {
      console.warn("Could not auto-initialize inquiries file, resetting to empty array:", err);
      try {
        fs.writeFileSync(INQUIRIES_FILE, "[]", "utf8");
      } catch (_) {}
    }
  };

  const initializeDatabase = async () => {
    if (!db) {
      if (isProduction) {
        console.warn("DATABASE_URL is not configured. Inquiry storage and admin sessions require Postgres in production.");
      } else {
        initializeLocalInquiryStore();
      }
      return;
    }

    await db.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        firm_email TEXT NOT NULL,
        service_sector TEXT NOT NULL,
        notes TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admin_sessions (
        token_hash TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMPTZ NOT NULL,
        revoked_at TIMESTAMPTZ
      );

      CREATE INDEX IF NOT EXISTS admin_sessions_expires_at_idx ON admin_sessions (expires_at);
      CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
    `);

    await db.query("DELETE FROM admin_sessions WHERE expires_at < NOW() OR revoked_at IS NOT NULL");
  };

  await initializeDatabase();

  const requirePersistentStore = () => {
    if (!db && isProduction) {
      throw new Error("Persistent database is not configured");
    }
  };

  const readLocalInquiries = (): InquiryRecord[] => {
    if (!fs.existsSync(INQUIRIES_FILE)) return [];
    const content = fs.readFileSync(INQUIRIES_FILE, "utf8");
    return JSON.parse(content);
  };

  const writeLocalInquiries = (inquiries: InquiryRecord[]) => {
    const dataDir = path.dirname(INQUIRIES_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf8");
  };

  const mapInquiryRow = (row: any): InquiryRecord => ({
    id: row.id,
    fullName: row.full_name,
    firmEmail: row.firm_email,
    serviceSector: row.service_sector,
    notes: row.notes || "",
    createdAt: new Date(row.created_at).toISOString(),
  });

  const listInquiries = async (): Promise<InquiryRecord[]> => {
    requirePersistentStore();
    if (!db) return readLocalInquiries();

    const result = await db.query(
      "SELECT id, full_name, firm_email, service_sector, notes, created_at FROM inquiries ORDER BY created_at DESC"
    );
    return result.rows.map(mapInquiryRow);
  };

  const saveInquiry = async (inquiry: InquiryRecord) => {
    requirePersistentStore();
    if (!db) {
      const inquiries = readLocalInquiries();
      inquiries.push(inquiry);
      writeLocalInquiries(inquiries);
      return;
    }

    await db.query(
      `INSERT INTO inquiries (id, full_name, firm_email, service_sector, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [inquiry.id, inquiry.fullName, inquiry.firmEmail, inquiry.serviceSector, inquiry.notes, inquiry.createdAt]
    );
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    requirePersistentStore();
    if (!db) {
      const inquiries = readLocalInquiries();
      const nextInquiries = inquiries.filter((inquiry) => inquiry.id !== id);
      writeLocalInquiries(nextInquiries);
      return nextInquiries.length !== inquiries.length;
    }

    const result = await db.query("DELETE FROM inquiries WHERE id = $1", [id]);
    return (result.rowCount || 0) > 0;
  };

  const hashToken = (token: string) => crypto.createHash("sha256").update(token).digest("hex");

  const parseCookies = (cookieHeader?: string): Map<string, string> => {
    const cookies = new Map<string, string>();
    if (!cookieHeader) return cookies;
    cookieHeader.split(";").forEach((cookie) => {
      const separatorIndex = cookie.indexOf("=");
      if (separatorIndex === -1) return;
      const key = cookie.slice(0, separatorIndex).trim();
      const value = cookie.slice(separatorIndex + 1).trim();
      cookies.set(key, decodeURIComponent(value));
    });
    return cookies;
  };

  const getSessionToken = (req: express.Request): string | null => {
    const cookies = parseCookies(req.headers.cookie);
    const cookieToken = cookies.get(ADMIN_SESSION_COOKIE);
    if (cookieToken) return cookieToken;

    const authHeader = req.headers.authorization;
    return authHeader && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
  };

  const sessionCookieOptions = (expiresAt: Date) => {
    const secureFlag = isProduction ? "; Secure" : "";
    return `Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Max-Age=${Math.floor(
      SESSION_DURATION_MS / 1000
    )}${secureFlag}`;
  };

  const setSessionCookie = (res: express.Response, token: string, expiresAt: Date) => {
    res.setHeader("Set-Cookie", `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}; ${sessionCookieOptions(expiresAt)}`);
  };

  const clearSessionCookie = (res: express.Response) => {
    const secureFlag = isProduction ? "; Secure" : "";
    res.setHeader(
      "Set-Cookie",
      `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0${secureFlag}`
    );
  };

  const createAdminSession = async (): Promise<{ token: string; expiresAt: Date }> => {
    const token = crypto.randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    if (db) {
      await db.query("INSERT INTO admin_sessions (token_hash, expires_at) VALUES ($1, $2)", [hashToken(token), expiresAt]);
    } else {
      activeTokens.set(token, expiresAt.getTime());
    }

    return { token, expiresAt };
  };

  const validateAdminSession = async (token: string): Promise<boolean> => {
    if (db) {
      const result = await db.query(
        "SELECT 1 FROM admin_sessions WHERE token_hash = $1 AND expires_at > NOW() AND revoked_at IS NULL",
        [hashToken(token)]
      );
      return result.rowCount === 1;
    }

    const expiresAt = activeTokens.get(token);
    if (expiresAt && Date.now() < expiresAt) return true;
    activeTokens.delete(token);
    return false;
  };

  const revokeAdminSession = async (token: string) => {
    if (db) {
      await db.query("UPDATE admin_sessions SET revoked_at = NOW() WHERE token_hash = $1", [hashToken(token)]);
      return;
    }
    activeTokens.delete(token);
  };

  // JSON parsing middleware
  // Supports the existing 5,000-character notes limit even for multi-byte text.
  app.use(express.json({ limit: "32kb" }));

  // API responses can contain credentials or inquiry PII and must never be cached.
  app.use("/api", (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });

  // Cookie-authenticated state changes must originate from the same host.
  app.use("/api", (req, res, next) => {
    if (!isProduction || ["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      return next();
    }

    const requestHost = req.get("host");
    const source = req.get("origin") || req.get("referer");

    try {
      if (requestHost && source && new URL(source).host === requestHost) {
        return next();
      }
    } catch (_) {}

    return res.status(403).json({ error: "Invalid request origin" });
  });

  // Security Headers Middleware
  app.use((req, res, next) => {
    const cspNonce = crypto.randomBytes(16).toString("base64");
    res.locals.cspNonce = cspNonce;
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
    res.setHeader(
      "Content-Security-Policy",
      isProduction
        ? `default-src 'self'; script-src 'self' 'nonce-${cspNonce}'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; frame-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`
        : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; frame-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    );
    next();
  });

  // Global rate limiter for general API routes (100 requests per 15 minutes)
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests from this IP, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Strict rate limiter for authentication endpoints (5 attempts per 15 minutes)
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Too many login attempts, please try again in 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Rate limiter for inquiry form submissions (5 submissions per hour per IP to prevent spam)
  const submissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { error: "Submission threshold exceeded. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply general limiter on all API routes
  app.use("/api/", generalLimiter);

  // Simple auth middleware for secure operations with automatic expiration
  const requireAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const clientToken = getSessionToken(req);

      if (clientToken && (await validateAdminSession(clientToken))) {
        return next();
      }

      clearSessionCookie(res);
      return res.status(401).json({ error: "Unauthorized access to administrator panel" });
    } catch (err) {
      console.error("Error validating admin session:", err);
      clearSessionCookie(res);
      return res.status(503).json({ error: "Administrator session validation is temporarily unavailable" });
    }
  };

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Admin login endpoint
  app.post("/api/admin/login", authLimiter, async (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (!ADMIN_PASSWORD) {
      return res.status(503).json({ error: "Administrator login is temporarily unavailable" });
    }

    if (isProduction && !db) {
      return res.status(503).json({ error: "Administrator login is temporarily unavailable" });
    }

    const suppliedPassword = typeof password === "string" ? Buffer.from(hashToken(password)) : null;
    const configuredPassword = Buffer.from(hashToken(ADMIN_PASSWORD));
    const passwordMatches = Boolean(
      suppliedPassword &&
      crypto.timingSafeEqual(suppliedPassword, configuredPassword)
    );

    if (passwordMatches) {
      try {
        const { token, expiresAt } = await createAdminSession();
        setSessionCookie(res, token, expiresAt);
        return res.json({ success: true });
      } catch (err) {
        console.error("Error creating admin session:", err);
        return res.status(503).json({ error: "Administrator login is temporarily unavailable" });
      }
    }

    res.status(401).json({ error: "Invalid administrator password" });
  });

  app.get("/api/admin/session", requireAuth, (_req, res) => {
    res.json({ authenticated: true });
  });

  // Admin logout endpoint (securing session invalidation)
  app.post("/api/admin/logout", async (req, res) => {
    const clientToken = getSessionToken(req);
    try {
      if (clientToken) {
        await revokeAdminSession(clientToken);
      }
    } catch (err) {
      console.error("Error revoking admin session:", err);
    }
    clearSessionCookie(res);
    res.json({ success: true });
  });

  // Get all inquiries (stored persistently, secured)
  app.get("/api/inquiries", requireAuth, async (_req, res) => {
    try {
      res.json(await listInquiries());
    } catch (err) {
      console.error("Error reading inquiries:", err);
      res.status(500).json({ error: "Failed to read inquiries" });
    }
  });

  // Helper to escape HTML characters to prevent HTML/XSS injection in emails
  const escapeHtml = (str: string): string => {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const safeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

  const injectSeoMeta = (html: string, req: express.Request, cspNonce?: string) => {
    const page = getPageFromPath(req.path);
    const meta = getMetaForPage(page);
    const publicSiteUrl = process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;
    const canonicalUrl = buildCanonicalUrl(meta.path, publicSiteUrl);
    const imageUrl = buildCanonicalUrl(meta.image, publicSiteUrl);
    const schemas: unknown[] = [buildOrganizationJsonLd(publicSiteUrl)];

    if (meta.service) {
      schemas.push(buildServiceJsonLd(meta.service, publicSiteUrl));
    }

    const schemaTags = schemas
      .map((schema, index) => {
        const nonceAttribute = cspNonce ? ` nonce="${escapeHtml(cspNonce)}"` : "";
        return `<script type="application/ld+json" id="tgmsg-server-schema-${index}"${nonceAttribute}>${safeJsonLd(schema)}</script>`;
      })
      .join("\n    ");

    const seoBlock = [
      cspNonce ? `<meta name="csp-nonce" content="${escapeHtml(cspNonce)}" />` : "",
      `<title>${escapeHtml(meta.title)}</title>`,
      `<meta name="description" content="${escapeHtml(meta.metaDescription)}" />`,
      `<meta name="keywords" content="${escapeHtml(meta.keywords.join(", "))}" />`,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
      `<meta property="og:type" content="${meta.service ? "website" : "business.business"}" />`,
      `<meta property="og:site_name" content="Texas Gateway Multi Services Group" />`,
      `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(meta.metaDescription)}" />`,
      `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(meta.metaDescription)}" />`,
      `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
      schemaTags,
    ].join("\n    ");

    return html
      .replace(/<title>[\s\S]*?<\/title>/i, "")
      .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
      .replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, "")
      .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
      .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
      .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
      .replace(/<script[^>]*id=["']tgmsg-base-schema["'][^>]*>[\s\S]*?<\/script>\s*/gi, "")
      .replace("</head>", `    ${seoBlock}\n  </head>`);
  };

  // Submit new inquiry
  app.post("/api/inquiries", submissionLimiter, async (req, res) => {
    const { fullName, firmEmail, serviceSector, notes } = req.body;

    // Server-side input validation and sanitization
    if (!fullName || !firmEmail) {
      return res.status(400).json({ error: "Full Name and Email are required fields" });
    }

    if (
      typeof fullName !== "string" || 
      fullName.trim().length === 0 || 
      fullName.length > 100
    ) {
      return res.status(400).json({ error: "Invalid Full Name. Must be between 1 and 100 characters." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      typeof firmEmail !== "string" || 
      firmEmail.trim().length === 0 || 
      firmEmail.length > 150 || 
      !emailRegex.test(firmEmail)
    ) {
      return res.status(400).json({ error: "Invalid email address format" });
    }

    if (serviceSector && (typeof serviceSector !== "string" || serviceSector.length > 100)) {
      return res.status(400).json({ error: "Invalid Service Sector selected." });
    }

    if (notes && (typeof notes !== "string" || notes.length > 5000)) {
      return res.status(400).json({ error: "Notes exceed maximum limit of 5000 characters." });
    }

    const newInquiry = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      firmEmail: firmEmail.trim(),
      serviceSector: (serviceSector || "General Advisory").trim(),
      notes: (notes || "").trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await saveInquiry(newInquiry);
    } catch (err) {
      console.error("Error writing inquiry:", err);
      return res.status(503).json({ error: "Inquiry storage is temporarily unavailable. Please contact us directly." });
    }

    // Attempt Resend or SMTP forwarding
    let emailSent = false;
    let emailError = "";

    const receiverEmail = process.env.INQUIRY_RECEIVER_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Securely sanitize parameters for safe email rendering
    const safeFullName = escapeHtml(newInquiry.fullName);
    const safeFirmEmail = escapeHtml(newInquiry.firmEmail);
    const safeServiceSector = escapeHtml(newInquiry.serviceSector);
    const safeNotes = newInquiry.notes ? escapeHtml(newInquiry.notes).replace(/\n/g, "<br>") : "No additional information provided.";

    const messageHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #1B2C6B; padding: 20px; text-align: center; border-radius: 6px 6px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Texas Gateway Group</h1>
          <p style="color: #B8922A; margin: 5px 0 0; font-size: 13px; text-transform: uppercase; font-family: monospace;">New Consultation Inquiry</p>
        </div>
        <div style="padding: 20px; color: #333333; line-height: 1.6;">
          <p style="margin-top: 0;">You have received a new consultation inquiry from the website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #555;">Full Name:</td>
              <td style="padding: 8px 0;">${safeFullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeFirmEmail}" style="color: #1B2C6B; text-decoration: none;">${safeFirmEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Focus Sector:</td>
              <td style="padding: 8px 0;"><span style="background-color: #f0f4ff; color: #1B2C6B; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${safeServiceSector}</span></td>
            </tr>
          </table>

          <p style="font-weight: bold; color: #555; margin-bottom: 5px;">Inquiry Note / Context:</p>
          <div style="background-color: #f9f9f9; border-left: 4px solid #B8922A; padding: 15px; border-radius: 4px; font-style: italic;">
            ${safeNotes}
          </div>
        </div>
        <div style="font-size: 11px; color: #999999; text-align: center; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 15px;">
          Submitted at: ${new Date().toLocaleString()}<br>
          Texas Gateway Group Portal - Self-Service System
        </div>
      </div>
    `;

    if (!receiverEmail) {
      emailError = "Notification delivery is temporarily unavailable. Please contact us directly.";
    } else if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

        const { error } = await resend.emails.send({
          from: `Texas Gateway Group <${fromEmail}>`,
          to: receiverEmail,
          replyTo: firmEmail,
          subject: `🔔 [New Gateway Inquiry] ${serviceSector} - ${fullName}`,
          html: messageHtml,
        });

        if (error) {
          throw error;
        }

        emailSent = true;
      } catch (err: any) {
        console.error("Failed to send email via Resend:", err);
        emailError = "Notification delivery failed. Please contact us if you do not receive a response.";
      }
    } else {
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpHost && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort || "587"),
            secure: smtpPort === "465",
            requireTLS: smtpPort !== "465",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          await transporter.sendMail({
            from: `"${fullName} Web Inquiry" <${smtpUser}>`,
            to: receiverEmail,
            replyTo: firmEmail,
            subject: `🔔 [New Gateway Inquiry] ${serviceSector} - ${fullName}`,
            html: messageHtml,
          });

          emailSent = true;
        } catch (err: any) {
          console.error("Failed to send email relative to SMTP configuration:", err);
          emailError = "Notification delivery failed. Please contact us if you do not receive a response.";
        }
      } else {
        emailError = "Notification delivery is temporarily unavailable. Please contact us directly.";
      }
    }

    res.json({
      success: true,
      savedLocal: !db,
      savedPersistent: Boolean(db),
      emailSent,
      emailError,
      inquiry: newInquiry,
    });
  });

  // Delete stored inquiry (secured)
  app.delete("/api/inquiries/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
      if (await deleteInquiry(id)) {
        return res.json({ success: true });
      }
      res.status(404).json({ error: "Inquiry not found" });
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      res.status(500).json({ error: "Failed to delete inquiry" });
    }
  });

  // Export inquiries as CSV or JSON (secured)
  app.get("/api/inquiries/export", requireAuth, async (req, res) => {
    const format = req.query.format || "csv";
    try {
      const inquiries = await listInquiries();

      if (format === "csv") {
        // Escape helper for clean CSV generation
        const escapeCsv = (val: string) => {
          if (!val) return '""';
          const escaped = val.replace(/"/g, '""');
          return `"${escaped}"`;
        };

        const headers = ["ID", "Full Name", "Firm Email", "Service Sector", "Notes", "Created At"];
        const rows = inquiries.map((inq) => [
          escapeCsv(inq.id),
          escapeCsv(inq.fullName),
          escapeCsv(inq.firmEmail),
          escapeCsv(inq.serviceSector),
          escapeCsv(inq.notes),
          escapeCsv(inq.createdAt),
        ]);

        const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader("Content-Disposition", "attachment; filename=texas_gateway_inquiries.csv");
        return res.send(csvContent);
      }

      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", "attachment; filename=texas_gateway_inquiries.json");
      return res.send(JSON.stringify(inquiries, null, 2));
    } catch (err) {
      console.error("Error exporting inquiries:", err);
      res.status(500).json({ error: "Failed to export inquiries database" });
    }
  });

  // Diagnostics endpoint to test SMTP settings (secured)
  app.post("/api/admin/test-smtp", requireAuth, async (req, res) => {
    const { host, port, user, pass, to } = req.body;

    // Strict parameter validation
    if (host && (typeof host !== "string" || host.length > 255)) {
      return res.status(400).json({ error: "Invalid host parameter" });
    }
    if (port && (typeof port !== "string" && typeof port !== "number")) {
      return res.status(400).json({ error: "Invalid port parameter" });
    }
    if (user && (typeof user !== "string" || user.length > 255)) {
      return res.status(400).json({ error: "Invalid username parameter" });
    }
    if (pass && (typeof pass !== "string" || pass.length > 255)) {
      return res.status(400).json({ error: "Invalid password parameter" });
    }
    if (to && (typeof to !== "string" || to.length > 255)) {
      return res.status(400).json({ error: "Invalid recipient email parameter" });
    }
    
    const smtpHost = host || process.env.SMTP_HOST;
    const smtpPort = port || process.env.SMTP_PORT || "587";
    const smtpUser = user || process.env.SMTP_USER;
    const smtpPass = pass || process.env.SMTP_PASS;
    const targetEmail = to || process.env.INQUIRY_RECEIVER_EMAIL;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (targetEmail && !emailRegex.test(targetEmail)) {
      return res.status(400).json({ error: "Invalid recipient email format" });
    }
    if (!targetEmail) {
      return res.status(400).json({ error: "Missing recipient email parameter" });
    }

    if (!smtpHost || !smtpUser || !smtpPass) {
      return res.status(400).json({ 
        error: "Missing SMTP configuration parameters. Supply them in request or configure server env variables." 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: smtpPort === "465",
        requireTLS: smtpPort !== "465",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Verify connection configuration
      await transporter.verify();

      // Send a test email
      const info = await transporter.sendMail({
        from: `"Texas Gateway SMTP Test" <${smtpUser}>`,
        to: targetEmail,
        subject: "🔔 Texas Gateway SMTP Diagnostics Test Success!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #22c55e; border-radius: 8px;">
            <div style="background-color: #22c55e; padding: 15px; text-align: center; border-radius: 6px 6px 0 0; color: white;">
              <h1 style="margin: 0; font-size: 18px;">SMTP Connection Valid</h1>
            </div>
            <div style="padding: 20px; color: #333333; line-height: 1.6;">
              <p>Your SMTP mail delivery server setup is working perfectly!</p>
              <p>This test message confirms that new consultation inquiries will successfully route to your target email: <strong>${targetEmail}</strong>.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <table style="width: 100%; font-size: 12px; color: #666;">
                <tr><td>Host:</td><td>${smtpHost}</td></tr>
                <tr><td>Port:</td><td>${smtpPort}</td></tr>
                <tr><td>Username:</td><td>${smtpUser}</td></tr>
              </table>
            </div>
          </div>
        `
      });

      res.json({
        success: true,
        message: "SMTP settings verified and test email dispatched successfully!",
        messageId: info.messageId,
      });
    } catch (err: any) {
      console.error("SMTP verification failed:", err);
      res.status(500).json({ 
        error: `SMTP connection failed: ${err.message || "Unknown SMTP connection error"}` 
      });
    }
  });

  // Serve static assets / Vite middleware
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const clientAssetsPath = path.join(distPath, "assets");
    app.use("/assets", express.static(clientAssetsPath));
    app.use(express.static(distPath, { index: false }));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      fs.readFile(indexPath, "utf8", (err, html) => {
        if (err) {
          res.sendFile(indexPath);
          return;
        }

        res.type("html").send(injectSeoMeta(html, req, res.locals.cspNonce));
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server boots on host 0.0.0.0 and port ${PORT}`);

    const receiverEmail = process.env.INQUIRY_RECEIVER_EMAIL;
    const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    if (smtpConfigured && receiverEmail) {
      console.log(`Inquiry email forwarding: enabled → ${receiverEmail}`);
    } else {
      console.warn(
        "Inquiry email forwarding: DISABLED. Submissions are still saved to configured storage.\n" +
          "Set INQUIRY_RECEIVER_EMAIL plus SMTP or Resend credentials in .env.local (or your host's env/secrets panel) to receive emails."
      );
    }
  });
}

startServer();
