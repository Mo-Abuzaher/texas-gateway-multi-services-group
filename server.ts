import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize data directory and inquiries file
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

  // JSON parsing middleware
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get all inquiries (stored locally)
  app.get("/api/inquiries", (req, res) => {
    try {
      if (fs.existsSync(INQUIRIES_FILE)) {
        const content = fs.readFileSync(INQUIRIES_FILE, "utf8");
        return res.json(JSON.parse(content));
      }
      res.json([]);
    } catch (err) {
      console.error("Error reading inquiries:", err);
      res.status(500).json({ error: "Failed to read inquiries" });
    }
  });

  // Submit new inquiry
  app.post("/api/inquiries", async (req, res) => {
    const { fullName, firmEmail, serviceSector, notes } = req.body;
    if (!fullName || !firmEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newInquiry = {
      id: Date.now().toString(),
      fullName,
      firmEmail,
      serviceSector,
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    let inquiries = [];
    try {
      if (fs.existsSync(INQUIRIES_FILE)) {
        const content = fs.readFileSync(INQUIRIES_FILE, "utf8");
        inquiries = JSON.parse(content);
      }
    } catch (err) {
      console.error("Error reading inquiries file:", err);
    }

    inquiries.push(newInquiry);

    try {
      const dataDir = path.dirname(INQUIRIES_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf8");
    } catch (err) {
      console.error("Error writing inquiry:", err);
    }

    // Attempt SMTP forwarding
    let emailSent = false;
    let emailError = "";

    const myEmail = process.env.INQUIRY_RECEIVER_EMAIL || "medorocks15@gmail.com";
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
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

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
                  <td style="padding: 8px 0;">${fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${firmEmail}" style="color: #1B2C6B; text-decoration: none;">${firmEmail}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Focus Sector:</td>
                  <td style="padding: 8px 0;"><span style="background-color: #f0f4ff; color: #1B2C6B; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${serviceSector}</span></td>
                </tr>
              </table>

              <p style="font-weight: bold; color: #555; margin-bottom: 5px;">Inquiry Note / Context:</p>
              <div style="background-color: #f9f9f9; border-left: 4px solid #B8922A; padding: 15px; border-radius: 4px; font-style: italic;">
                ${notes ? notes.replace(/\n/g, "<br>") : "No additional information provided."}
              </div>
            </div>
            <div style="font-size: 11px; color: #999999; text-align: center; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 15px;">
              Submitted at: ${new Date().toLocaleString()}<br>
              Texas Gateway Group Portal - Self-Service System
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"${fullName} Web Inquiry" <${smtpUser}>`,
          to: myEmail,
          replyTo: firmEmail,
          subject: `🔔 [New Gateway Inquiry] ${serviceSector} - ${fullName}`,
          html: messageHtml,
        });

        emailSent = true;
      } catch (err: any) {
        console.error("Failed to send email relative to SMTP configuration:", err);
        emailError = err.message || "Unknown SMTP error";
      }
    } else {
      emailError =
        "SMTP not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS to enable email notifications.";
    }

    res.json({
      success: true,
      savedLocal: true,
      emailSent,
      emailError,
      inquiry: newInquiry,
    });
  });

  // Delete stored inquiry
  app.delete("/api/inquiries/:id", (req, res) => {
    const { id } = req.params;
    try {
      if (fs.existsSync(INQUIRIES_FILE)) {
        const content = fs.readFileSync(INQUIRIES_FILE, "utf8");
        let inquiries = JSON.parse(content);
        inquiries = inquiries.filter((inq: any) => inq.id !== id);
        fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf8");
        return res.json({ success: true });
      }
      res.status(404).json({ error: "Inquiry not found" });
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      res.status(500).json({ error: "Failed to delete inquiry" });
    }
  });

  // Serve static assets / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server boots on host 0.0.0.0 and port ${PORT}`);

    const receiverEmail = process.env.INQUIRY_RECEIVER_EMAIL || "medorocks15@gmail.com";
    const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    if (smtpConfigured) {
      console.log(`Inquiry email forwarding: enabled → ${receiverEmail}`);
    } else {
      console.warn(
        "Inquiry email forwarding: DISABLED. Submissions are saved locally only.\n" +
          "Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local (or your host's env/secrets panel) to receive emails."
      );
    }
  });
}

startServer();
