import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";
import FounderProfile from "./components/FounderProfile";
import Sectors from "./components/Sectors";
import InteractiveShowcase from "./components/InteractiveShowcase";
import StatsMetrics from "./components/StatsMetrics";
import Faq from "./components/Faq";
import FooterCta from "./components/FooterCta";
import ServiceDetail from "./components/ServiceDetail";
import Navbar from "./components/Navbar";
import PaymentMethods from "./components/PaymentMethods";
import TermsAndPolicies from "./components/TermsAndPolicies";
import {
  DEFAULT_SITE_URL,
  PageId,
  buildCanonicalUrl,
  buildOrganizationJsonLd,
  buildServiceJsonLd,
  getMetaForPage,
  getPageFromPath,
  getPathForPage,
  getServiceByGateId,
  getServiceByPageId,
} from "./seo";

const ensureMetaTag = (selector: string, createTag: () => HTMLMetaElement | HTMLLinkElement) => {
  const existing = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (existing) return existing;
  const tag = createTag();
  document.head.appendChild(tag);
  return tag;
};

const setMetaContent = (selector: string, createTag: () => HTMLMetaElement, content: string) => {
  const tag = ensureMetaTag(selector, createTag) as HTMLMetaElement;
  tag.setAttribute("content", content);
};

const setJsonLd = (id: string, data: unknown) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    const nonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute("content");
    if (nonce) {
      script.setAttribute("nonce", nonce);
    }
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

export default function App() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window === "undefined") return "home";
    return getPageFromPath(window.location.pathname);
  });
  const [preselectedSector, setPreselectedSector] = useState<string | undefined>(undefined);

  const navigateToPage = (page: PageId, options?: { replace?: boolean }) => {
    const path = getPathForPage(page);
    setCurrentPage(page);
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      const method = options?.replace ? "replaceState" : "pushState";
      window.history[method]({}, "", path);
    }
  };

  const navigateHomeAndScroll = (sectionId?: string) => {
    navigateToPage("home");
    setTimeout(() => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const meta = getMetaForPage(currentPage);
    const canonicalUrl = buildCanonicalUrl(meta.path, DEFAULT_SITE_URL);
    const imageUrl = buildCanonicalUrl(meta.image, DEFAULT_SITE_URL);

    document.documentElement.lang = lang;
    document.title = meta.title;

    setMetaContent('meta[name="description"]', () => {
      const tag = document.createElement("meta");
      tag.name = "description";
      return tag;
    }, meta.metaDescription);

    setMetaContent('meta[name="keywords"]', () => {
      const tag = document.createElement("meta");
      tag.name = "keywords";
      return tag;
    }, meta.keywords.join(", "));

    setMetaContent('meta[property="og:title"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:title");
      return tag;
    }, meta.title);

    setMetaContent('meta[property="og:description"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:description");
      return tag;
    }, meta.metaDescription);

    setMetaContent('meta[property="og:url"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:url");
      return tag;
    }, canonicalUrl);

    setMetaContent('meta[property="og:image"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:image");
      return tag;
    }, imageUrl);

    setMetaContent('meta[name="twitter:title"]', () => {
      const tag = document.createElement("meta");
      tag.name = "twitter:title";
      return tag;
    }, meta.title);

    setMetaContent('meta[name="twitter:description"]', () => {
      const tag = document.createElement("meta");
      tag.name = "twitter:description";
      return tag;
    }, meta.metaDescription);

    const canonical = ensureMetaTag('link[rel="canonical"]', () => {
      const tag = document.createElement("link");
      tag.rel = "canonical";
      return tag;
    }) as HTMLLinkElement;
    canonical.href = canonicalUrl;

    const service = getServiceByPageId(currentPage);
    setJsonLd("tgmsg-organization-schema", buildOrganizationJsonLd(DEFAULT_SITE_URL));
    if (service) {
      setJsonLd("tgmsg-service-schema", buildServiceJsonLd(service, DEFAULT_SITE_URL));
    } else {
      document.getElementById("tgmsg-service-schema")?.remove();
    }
  }, [currentPage, lang]);

  return (
    <main 
      className="w-full bg-[#1B2C6B] min-h-screen text-[#F5F5F0] relative overflow-x-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      
      {/* 1. Navigation bar shown on Service Detail pages */}
      {currentPage !== "home" && (
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          currentPage={currentPage} 
          setCurrentPage={navigateToPage} 
        />
      )}

      {/* 2. Main Page Render Logic */}
      {currentPage === "home" ? (
        <>
          {/* Section 1: Hero Section (with background video and its own embedded Navbar) */}
          <Hero 
            lang={lang} 
            setLang={setLang} 
            currentPage={currentPage} 
            setCurrentPage={navigateToPage} 
          />

          {/* Section 2: Testimonial Section with scroll word reveal */}
          <Testimonial lang={lang} />

          {/* Section 3: Sectors Section (US Visas & Immigration - Detailed 5 Gates with direct Page link) */}
          <Sectors 
            lang={lang} 
            onSelectGatePage={(gateId) => {
              const service = getServiceByGateId(gateId);
              if (service) {
                navigateToPage(service.pageId);
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />

          {/* Section 4: Stats Metrics & Sponsorship Savings Calculator */}
          <StatsMetrics lang={lang} />

          {/* Section 5: Interactive Showcase Dashboard (Immigration & Visa Estimator) */}
          <InteractiveShowcase lang={lang} />

          {/* Section 6: FAQ Accordions with immigration and compliance context */}
          <Faq lang={lang} />
        </>
      ) : currentPage === "about" ? (
        <FounderProfile 
          lang={lang} 
          onBack={() => {
            navigateHomeAndScroll();
          }}
        />
      ) : currentPage === "payments" ? (
        <PaymentMethods 
          lang={lang} 
          onBack={() => {
            navigateHomeAndScroll();
          }}
        />
      ) : currentPage === "terms" ? (
        <TermsAndPolicies 
          lang={lang} 
          onBack={() => {
            navigateHomeAndScroll();
          }}
        />
      ) : (
        /* Section 3.5: Bespoke, Highly detailed, immersive service pages for specific Gates */
        <ServiceDetail
          gateId={parseInt(currentPage.replace("gate", ""))}
          lang={lang}
          onBack={() => {
            navigateHomeAndScroll("sectors_section");
          }}
          onContactSelect={(sector) => {
            setPreselectedSector(sector);
            navigateHomeAndScroll("contact");
          }}
        />
      )}

      {/* Section 7: Consultation Contact Form & Brand Footer */}
      <FooterCta 
        lang={lang} 
        preselectedSector={preselectedSector} 
        onNavigateToTerms={() => {
          navigateToPage("terms");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </main>
  );
}
