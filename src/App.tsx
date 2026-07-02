import { useState } from "react";
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

export default function App() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "payments" | "terms">("home");
  const [preselectedSector, setPreselectedSector] = useState<string | undefined>(undefined);

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
          setCurrentPage={setCurrentPage} 
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
            setCurrentPage={setCurrentPage} 
          />

          {/* Section 2: Testimonial Section with scroll word reveal */}
          <Testimonial lang={lang} />

          {/* Section 3: Sectors Section (US Visas & Immigration - Detailed 5 Gates with direct Page link) */}
          <Sectors 
            lang={lang} 
            onSelectGatePage={(gateId) => {
              setCurrentPage(`gate${gateId}` as any);
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
            setCurrentPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : currentPage === "payments" ? (
        <PaymentMethods 
          lang={lang} 
          onBack={() => {
            setCurrentPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : currentPage === "terms" ? (
        <TermsAndPolicies 
          lang={lang} 
          onBack={() => {
            setCurrentPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : (
        /* Section 3.5: Bespoke, Highly detailed, immersive service pages for specific Gates */
        <ServiceDetail
          gateId={parseInt(currentPage.replace("gate", ""))}
          lang={lang}
          onBack={() => {
            setCurrentPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onContactSelect={(sector) => {
            setPreselectedSector(sector);
            setCurrentPage("home");
            setTimeout(() => {
              const el = document.getElementById("contact");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }, 150);
          }}
        />
      )}

      {/* Section 7: Consultation Contact Form & Brand Footer */}
      <FooterCta 
        lang={lang} 
        preselectedSector={preselectedSector} 
        onNavigateToTerms={() => {
          setCurrentPage("terms");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </main>
  );
}
