import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "./Navbar";
import SeamlessVideo from "./SeamlessVideo";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  currentPage: "home" | "about" | "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "payments" | "terms";
  setCurrentPage: (page: "home" | "about" | "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "payments" | "terms") => void;
}

export default function Hero({ lang, setLang, currentPage, setCurrentPage }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";

  // Parallax Scroll Effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero text content group
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen overflow-hidden flex flex-col justify-between bg-[#1B2C6B]"
      id="hero_section"
    >
      {/* 1. Background Video Layer */}
      <SeamlessVideo
        src="/src/assets/images/hero_bg_video.mp4"
        className="z-0 pointer-events-none blur-[8px] scale-105"
        id="hero_bg_video"
      />

      {/* 2. Seamless Header (Navbar) */}
      <Navbar lang={lang} setLang={setLang} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* 3. Hero Content - Centered */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 md:px-20 py-20 lg:py-0 text-center">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-center max-w-4xl mx-auto"
          id="hero_text_group"
        >
          {/* Tag pill: A "liquid glass" styled pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className={`bg-[#6B1A1A]/35 border border-[#6B1A1A]/45 flex items-center gap-3 px-3 py-2 rounded-lg mb-6 shadow-2xl backdrop-blur-md ${isAr ? "flex-row-reverse" : "flex-row"}`}
            id="hero_badge_pill"
          >
            <span
              className="bg-[#B8922A] text-white rounded-md text-xs font-semibold px-2.5 py-0.5 tracking-wide font-sans"
              id="hero_badge_tag"
            >
              {t.heroTag}
            </span>
            <span
              className="text-sm font-medium text-white/95 font-sans"
              id="hero_badge_text"
            >
              {t.heroWelcome}
            </span>
          </motion.div>

          {/* Title focused on US Visas, Legal Precedent, and Financial Compliance */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-sans font-semibold tracking-[-2px] leading-tight md:leading-[1.12] text-white max-w-4xl mb-5 text-center"
            id="hero_title"
          >
            {t.heroTitle1}
            <br />
            <span className="font-serif italic font-normal text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] glow-word">
              {t.heroTitle2}
            </span>
          </motion.h1>

          {/* Subtitle mapping the core business sections simply */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "var(--hero-subtitle, hsl(210 17% 95%))" }}
            className="text-base md:text-lg font-normal leading-relaxed opacity-95 max-w-2xl mb-10 text-center font-sans"
            id="hero_subtitle"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* CTA Button scrolls down to footer appointment form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            id="hero_cta_container"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#B8922A] text-white rounded-full px-8 py-4 text-base font-semibold shadow-xl hover:shadow-[#B8922A]/20 transition-all duration-300 cursor-pointer font-sans"
              id="hero_cta_btn"
            >
              {t.heroCta}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Bottom shadow / gradient transition to make Section 2 blend perfectly */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1B2C6B] to-transparent z-30 pointer-events-none"
        id="hero_bottom_gradient"
      />
    </section>
  );
}
