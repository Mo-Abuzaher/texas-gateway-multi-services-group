import { useState } from "react";
import { ChevronDown, Menu, X, Languages } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  currentPage: "home" | "about" | "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "payments" | "terms";
  setCurrentPage: (page: "home" | "about" | "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "payments" | "terms") => void;
}

export default function Navbar({ lang, setLang, currentPage, setCurrentPage }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";

  const handleNavClick = (sectionId: string, targetPage: "home" | "about" | "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "payments" | "terms") => {
    setIsOpen(false);
    if (targetPage === "home") {
      setCurrentPage("home");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      setCurrentPage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    setLang(isAr ? "en" : "ar");
  };

  const servicesList = [
    { id: "gate1", title: t.gate1Title, tag: t.gate1Tag },
    { id: "gate2", title: t.gate2Title, tag: t.gate2Tag },
    { id: "gate3", title: t.gate3Title, tag: t.gate3Tag },
    { id: "gate4", title: t.gate4Title, tag: t.gate4Tag },
    { id: "gate5", title: t.gate5Title, tag: t.gate5Tag },
  ] as const;

  return (
    <nav className="relative z-50 w-full px-4 sm:px-8 lg:px-8 xl:px-28 py-4 bg-transparent">
      <div className="flex items-center justify-between w-full">
        
        {/* Left side: Logo & Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 lg:contents xl:flex xl:items-center xl:gap-20">
          <button
            onClick={() => handleNavClick("hero_section", "home")}
            className="flex items-center gap-2 group cursor-pointer text-start /* RTL: mirrored */ bg-transparent border-none p-0 focus:outline-none"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-transparent" id="navbar_logo_container">
              <img
                src="/assets/images/tx_multi_services_group.png"
                alt="Texas Gateway Multi Services Group logo"
                className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
                id="navbar_logo"
              />
            </div>
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white font-sans whitespace-nowrap" id="navbar_logo_text">
              TGMSG
            </span>
          </button>

          {/* Desktop links */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-4 xl:gap-6 bg-black/65 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 shadow-lg hover:border-white/20 hover:bg-black/75 transition-all duration-300 z-[100]" id="navbar_links">
            <button
              onClick={() => handleNavClick("hero_section", "home")}
              className={`text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none focus:outline-none ${
                currentPage === "home" ? "text-[#B8922A]" : "text-white/85 hover:text-[#B8922A]"
              }`}
            >
              {t.navHome}
            </button>

            {/* Our Services with Submenu dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setDesktopServicesOpen(true)}
              onMouseLeave={() => setDesktopServicesOpen(false)}
            >
              <button
                className={`text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none focus:outline-none flex items-center gap-1.5 ${
                  currentPage.startsWith("gate") ? "text-[#B8922A]" : "text-white/85 hover:text-[#B8922A]"
                }`}
              >
                <span>{t.navServices}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ease-out ${
                    desktopServicesOpen ? "rotate-0 text-[#B8922A]" : "rtl:rotate-90 ltr:-rotate-90 text-white/70"
                  }`} 
                />
              </button>

              {/* Submenu Dropdown */}
              <AnimatePresence>
                {desktopServicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute start-0 top-full mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl py-3 w-80 shadow-2xl z-50"
                    id="services_desktop_submenu"
                  >
                    {servicesList.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => {
                          handleNavClick("", srv.id);
                          setDesktopServicesOpen(false);
                        }}
                        className="w-full px-4 py-2 text-xs sm:text-sm text-start /* RTL: mirrored */ text-white/90 hover:text-[#B8922A] hover:bg-white/5 transition-colors flex flex-col gap-0.5 border-none bg-transparent cursor-pointer focus:outline-none rounded-lg"
                      >
                        <span className="text-[10px] font-mono font-bold text-[#B8922A] uppercase tracking-wider">{srv.tag}</span>
                        <span className="font-semibold">{srv.title}</span>
                      </button>
                    ))}
                    <div className="border-t border-white/10 mt-1.5 pt-2 px-4">
                      <button
                        onClick={() => {
                          handleNavClick("sectors_section", "home");
                          setDesktopServicesOpen(false);
                        }}
                        className="w-full text-center text-xs font-semibold text-[#B8922A] hover:underline bg-transparent border-none py-1.5 cursor-pointer focus:outline-none"
                      >
                        {isAr ? "عرض بوابات المجموعة" : "View Group Portals"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNavClick("", "about")}
              className={`text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none focus:outline-none ${
                currentPage === "about" ? "text-[#B8922A]" : "text-white/85 hover:text-[#B8922A]"
              }`}
              id="about_nav_link"
            >
              {t.navAboutUs}
            </button>
            
            <button
              onClick={() => handleNavClick("", "payments")}
              className={`text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none focus:outline-none ${
                currentPage === "payments" ? "text-[#B8922A]" : "text-white/85 hover:text-[#B8922A]"
              }`}
              id="payments_nav_link"
            >
              {t.navPayments}
            </button>
            
            <button
              onClick={() => handleNavClick("contact", "home")}
              className="text-sm font-medium text-white/85 hover:text-[#B8922A] transition-colors duration-200 cursor-pointer bg-transparent border-none focus:outline-none"
            >
              {t.navContact}
            </button>
          </div>
        </div>

        {/* Right side: Language switcher + Action button & Mobile toggle */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
          
          {/* Elegant Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 font-sans font-semibold text-xs text-white/90 hover:text-[#B8922A] transition-colors duration-300 cursor-pointer bg-transparent border-none focus:outline-none uppercase select-none"
          >
            <span>{isAr ? "EN" : "عربي"}</span>
            <Languages className="w-4 h-4 transition-colors" />
          </button>

          {/* Active button shown on tablet landscape/portrait & desktop (sm and up) */}
          <button
            onClick={() => handleNavClick("contact", "home")}
            className="hidden sm:block bg-[#B8922A] text-white px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-[#a37f20] active:scale-95 cursor-pointer shadow-md whitespace-nowrap"
            id="navbar_signin_btn"
          >
            {t.navButton}
          </button>

          {/* Mobile menu toggle container for right-aligned popover */}
          <div className="relative flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center text-white/95 hover:text-white hover:bg-white/10 p-2 rounded-lg cursor-pointer bg-transparent border-none focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Floating Mobile Popover Dropdown */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute end-0 top-full mt-3 w-64 sm:w-72 bg-[#1B2C6B] border border-white/15 rounded-xl shadow-2xl z-50 py-3"
                >
                  <div className="flex flex-col gap-1 px-2">
                    <button
                      onClick={() => handleNavClick("hero_section", "home")}
                      className="w-full py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 px-3 rounded-md transition-colors border-none bg-transparent focus:outline-none cursor-pointer text-start /* RTL: mirrored */"
                    >
                      {t.navHome}
                    </button>

                    {/* Mobile Services Toggle */}
                    <div className="w-full">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`w-full py-2 text-sm font-medium hover:text-white hover:bg-white/10 px-3 rounded-md transition-colors border-none bg-transparent focus:outline-none cursor-pointer flex items-center justify-between ${
                          currentPage.startsWith("gate") ? "text-[#B8922A]" : "text-white/90"
                        }`}
                      >
                        <span>{t.navServices}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {mobileServicesOpen && (
                        <div className="pl-4 pr-4 py-1.5 space-y-1 bg-black/10 rounded-lg mt-1">
                          {servicesList.map((srv) => (
                            <button
                              key={srv.id}
                              onClick={() => handleNavClick("", srv.id)}
                              className="w-full py-2 text-xs text-white/80 hover:text-white text-start /* RTL: mirrored */ border-none bg-transparent cursor-pointer"
                            >
                              <span className="text-[#B8922A] font-bold mr-1 ml-1">•</span> {srv.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleNavClick("", "about")}
                      className={`w-full py-2 text-sm font-medium hover:text-white hover:bg-white/10 px-3 rounded-md transition-colors border-none bg-transparent focus:outline-none cursor-pointer text-start /* RTL: mirrored */ ${
                        currentPage === "about" ? "text-[#B8922A]" : "text-white/90"
                      }`}
                    >
                      {t.navAboutUs}
                    </button>
                    
                    <button
                      onClick={() => handleNavClick("", "payments")}
                      className={`w-full py-2 text-sm font-medium hover:text-white hover:bg-white/10 px-3 rounded-md transition-colors border-none bg-transparent focus:outline-none cursor-pointer text-start /* RTL: mirrored */ ${
                        currentPage === "payments" ? "text-[#B8922A]" : "text-white/90"
                      }`}
                      id="payments_mobile_nav_link"
                    >
                      {t.navPayments}
                    </button>
                    
                    <button
                      onClick={() => handleNavClick("contact", "home")}
                      className="w-full py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 px-3 rounded-md transition-colors border-none bg-transparent focus:outline-none cursor-pointer text-start /* RTL: mirrored */"
                    >
                      {t.navContact}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile-only portrait CTA button */}
      <div className="block sm:hidden w-full mt-3.5 pl-0" id="navbar_mobile_portrait_cta">
        <button
          onClick={() => handleNavClick("contact", "home")}
          className="bg-[#B8922A] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-[#a37f20] active:scale-95 cursor-pointer shadow-md whitespace-nowrap w-full"
        >
          {t.navButton}
        </button>
      </div>
    </nav>
  );
}
