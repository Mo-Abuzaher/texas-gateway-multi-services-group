import { useState, useEffect, useRef } from "react";
import { 
  Scale, 
  Globe, 
  FileCheck, 
  Landmark, 
  Coins, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Calculator, 
  HelpCircle,
  FileSpreadsheet,
  Users,
  Briefcase,
  AlertTriangle,
  Award,
  Heart
} from "lucide-react";
import { motion } from "motion/react";
import { TRANSLATIONS } from "../translations";
import { SERVICE_SEO_PAGES, getServiceByGateId } from "../seo";

interface Props {
  gateId: number;
  lang: "en" | "ar";
  onBack: () => void;
  onContactSelect: (sector: string) => void;
}

interface ServiceItem {
  category: string;
  details: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: any;
  description?: string;
  items?: ServiceItem[];
}

function BlackWordReveal({ word, index, total }: { word: string; index: number; total: number; key?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0.35, color: "rgba(44, 44, 44, 0.45)" }}
      animate={{
        opacity: [0.35, 1, 0.35],
        color: ["rgba(44, 44, 44, 0.45)", "#000000", "rgba(44, 44, 44, 0.45)"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        delay: index * 0.2,
        ease: "easeInOut",
      }}
      className="mr-[0.25em] ml-[0.25em] inline-block select-none font-sans"
    >
      {word}
    </motion.span>
  );
}

function ServiceSeoContent({ gateId, isAr }: { gateId: number; isAr: boolean }) {
  const service = getServiceByGateId(gateId);
  if (!service) return null;

  const relatedServices = SERVICE_SEO_PAGES.filter((item) => item.gateId !== gateId).slice(0, 5);

  return (
    <section
      className="mt-16 bg-[#F5F5F0] text-[#2C2C2C] rounded-2xl border border-[#B8922A]/25 p-6 sm:p-8 lg:p-10 space-y-10"
      aria-labelledby="service_seo_heading"
      dir="ltr"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#B8922A] font-bold">
            {isAr ? "Service Overview" : "Dedicated Service Page"}
          </span>
          <h2 id="service_seo_heading" className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-[#1B2C6B]">
            {service.primaryKeyword.charAt(0).toUpperCase() + service.primaryKeyword.slice(1)} for Texas Clients
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-[#2C2C2C]/80">
            {service.summary}
          </p>
        </div>

        <div className="lg:col-span-5 bg-white border border-black/10 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-[#1B2C6B]">Best fit for</h3>
          <ul className="space-y-2.5">
            {service.clientFit.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-[#2C2C2C]/80">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#B8922A] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-black/10 rounded-xl p-5 space-y-4">
          <h3 className="text-lg font-bold text-[#1B2C6B]">How our {service.primaryKeyword} process works</h3>
          <ol className="space-y-3">
            {service.process.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm text-[#2C2C2C]/80">
                <span className="w-7 h-7 rounded-full bg-[#1B2C6B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white border border-black/10 rounded-xl p-5 space-y-4">
          <h3 className="text-lg font-bold text-[#1B2C6B]">Common questions about {service.primaryKeyword}</h3>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-black/10 pb-4 last:border-b-0 last:pb-0">
                <h4 className="text-sm font-bold text-[#2C2C2C]">{faq.question}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#2C2C2C]/75">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#1B2C6B]">Related Texas Gateway services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {relatedServices.map((item) => (
              <a
                key={item.slug}
                href={`/services/${item.slug}`}
                className="text-sm font-semibold text-[#2C2C2C] hover:text-[#B8922A] bg-white border border-black/10 rounded-lg px-3 py-2 transition-colors"
              >
                {item.h1}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#1B2C6B]">Authoritative resources</h3>
          <div className="flex flex-col gap-2.5">
            {service.externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#2C2C2C]/80 hover:text-[#B8922A] underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const servicesDataEn: ServiceCategory[] = [
  {
    id: "employment",
    title: "1. Employment Based",
    icon: Briefcase,
    items: [
      { category: "Nonimmigrant Employment visas", details: "H-1B, L-1-A/B, E-1, E-2, E-3, O-1, P-1, P-3, R1, TN" },
      { category: "Nonimmigrant Student visas", details: "F-1, F2, J1, M1" },
      { category: "Nonimmigrant other visas", details: "B-1/B-2" },
      { category: "Employment Based Green Cards", details: "EB1, EB2, EB3, NIW" },
      { category: "Labor Certification & Filings", details: "PERM Labor applications, I-140 immigrant worker applications" }
    ]
  },
  {
    id: "family",
    title: "2. Family Based (Immediate Relatives)",
    icon: Heart,
    items: [
      { category: "F1 Petition", details: "Unmarried Sons and Daughters of U.S. Citizens" },
      { category: "F2A Petition", details: "Spouses and Children of Permanent Residents" },
      { category: "F2B Petition", details: "Unmarried Sons & Daughters (21+ years old) of Permanent Residents" },
      { category: "F3 Petition", details: "Married Sons and Daughters of U.S. Citizens" },
      { category: "F4 Petition", details: "Brothers and Sisters of Adult U.S. Citizens" }
    ]
  },
  {
    id: "nvc",
    title: "3. NVC Application Process",
    icon: FileText,
    description: "Consulate-bound synchronization featuring Form DS-260 processing, Form I-864 Financial Support documents, and civil document optimization."
  },
  {
    id: "aos",
    title: "4. Adjustment of Status Applications",
    icon: Landmark,
    description: "In-country green card solutions with seamless concurrent packaging, Form I-485 filing, Form I-765 Work Permit, and Form I-131 Travel Permit tracking."
  },
  {
    id: "naturalization",
    title: "5. Naturalization Applications",
    icon: Award,
    description: "The final path to US civic integration. Full qualification screening via Form N-400, continuous presence analysis, and rigorous civics test preparation."
  }
];

const servicesDataAr: ServiceCategory[] = [
  {
    id: "employment",
    title: "1. رعاية أصحاب العمل وتأشيرات العمل",
    icon: Briefcase,
    items: [
      { category: "تأشيرات عمل لغير المهاجرين", details: "H-1B, L-1-A/B, E-1, E-2, E-3, O-1, P-1, P-3, R1, TN" },
      { category: "تأشيرات الطلاب ومرافقيهم", details: "F-1, F2, J1, M1" },
      { category: "تأشيرات سياحة وزيارة لغير المهاجرين", details: "B-1/B-2" },
      { category: "البطاقة الخضراء القائمة على العمل", details: "EB1, EB2, EB3, NIW" },
      { category: "شهادة تصديق العمل والملفات", details: "طلبات تصديق العمل PERM، وعرائض العمال المهاجرين I-140" }
    ]
  },
  {
    id: "family",
    title: "2. الهجرة العائلية والقرابة المباشرة",
    icon: Heart,
    items: [
      { category: "عرائض فئة F1", details: "الأبناء والبنات غير المتزوجين (بالغين) للمواطنين الأمريكيين" },
      { category: "عرائض فئة F2A", details: "أزواج وأبناء المقيمين الدائمين (حاملي البطاقة الخضراء)" },
      { category: "عرائض فئة F2B", details: "الأبناء والبنات غير المتزوجين (21 عاماً فأكثر) للمقيمين الدائمين" },
      { category: "عرائض فئة F3", details: "الأبناء والبنات المتزوجين للمواطنين الأمريكيين" },
      { category: "عرائض فئة F4", details: "أشقاء وشقيقات المواطنين الأمريكيين البالغين" }
    ]
  },
  {
    id: "nvc",
    title: "3. معاملات مركز التأشيرات الوطني (NVC)",
    icon: FileText,
    description: "متابعة وتنسيق الملفات القنصلية بما في ذلك معالجة نماذج DS-260، وإعداد وثائق الدعم المالي ونموذج الضامن I-864، وتدقيق المستندات المدنية."
  },
  {
    id: "aos",
    title: "4. طلبات تعديل الوضع داخل أمريكا (AOS)",
    icon: Landmark,
    description: "حلول متكاملة للحصول على الإقامة الدائمة من داخل الولايات المتحدة عبر تعبئة وتدقيق نموذج I-485، وتصاريح العمل I-765، ووثيقة السفر المؤقتة I-131."
  },
  {
    id: "naturalization",
    title: "5. معاملات الجنسية والاندماج المدني",
    icon: Award,
    description: "المرحلة النهائية للاندماج المدني الكامل. فحص الأهلية والمؤهلات عبر نموذج N-400، ودراسة الإقامة المستمرة، والتحضير المكثف لامتحان الجنسية والتاريخ الأمريكي."
  }
];

export default function ServiceDetail({ gateId, lang, onBack, onContactSelect }: Props) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const servicesData = isAr ? servicesDataAr : servicesDataEn;
  const titleWords = (isAr ? "مجالات اختصاصات الهجرة والمواطنة" : "Immigration & Citizenship Practice Areas").split(" ");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [gateId]);

  // Specific content and interactive states for Gate 2: Translation
  const [docType, setDocType] = useState<"standard" | "complex" | "academic">("standard");
  const [wordCount, setWordCount] = useState<number>(250);

  // Specific content and interactive states for Gate 3: Apostille
  const [docOrigin, setDocOrigin] = useState<"texas" | "other-us" | "foreign">("texas");
  const [targetCountry, setTargetCountry] = useState<string>("saudi-arabia");

  // Specific content and interactive states for Gate 5: Financial Services
  const [employeeCount, setEmployeeCount] = useState<number>(5);
  const [monthlyTx, setMonthlyTx] = useState<number>(100);

  // Specific content and interactive states for Gate 6: Management & Consulting
  const [hasSop, setHasSop] = useState<boolean>(false);
  const [hasOrgChart, setHasOrgChart] = useState<boolean>(false);
  const [hasDigitalRecord, setHasDigitalRecord] = useState<boolean>(false);
  const [hasDailyPlan, setHasDailyPlan] = useState<boolean>(false);

  // Calculate SME Administrative Health Score
  const calculateSmeHealthScore = () => {
    let score = 0;
    if (hasSop) score += 25;
    if (hasOrgChart) score += 25;
    if (hasDigitalRecord) score += 25;
    if (hasDailyPlan) score += 25;
    return score;
  };
  const smeHealthScore = calculateSmeHealthScore();

  // Help calculate turnaround for Translation
  const calculateTranslation = () => {
    let rate = docType === "standard" ? 0.12 : docType === "complex" ? 0.18 : 0.15;
    let days = Math.max(1, Math.ceil(wordCount / 1000));
    let price = Math.round(wordCount * rate);
    return { price, days };
  };

  const transEstimate = calculateTranslation();

  // Help calculate Apostille steps
  const getApostilleSteps = () => {
    if (docOrigin === "texas") {
      return isAr ? [
        "التصديق من كاتب العدل بولاية تكساس (نوتر)",
        "المصادقة من وزير خارجية تكساس (Apostille)",
        "التصديق النهائي من السفارة/القنصلية للبلد المستهدف إذا لم يكن عضواً في اتفاقية لاهاي"
      ] : [
        "Notarization by a registered Texas Notary Public",
        "Apostille processing through the Texas Secretary of State",
        "Final Embassy/Consular attestation if the target nation is a non-Hague member"
      ];
    } else if (docOrigin === "other-us") {
      return isAr ? [
        "التوثيق المحلي في الولاية المصدرة للمستند",
        "المصادقة من سكرتارية الولاية المصدرة (State Secretary of State)",
        "المصادقة الفيدرالية من وزارة الخارجية الأمريكية في واشنطن (إذا لزم الأمر)",
        "التوثيق الدبلوماسي من السفارة المعنية"
      ] : [
        "Local notarization in the origin state",
        "Apostille by the issuing State's Secretary of State office",
        "U.S. Department of State federal authentication in Washington D.C. (if required)",
        "Consular legalizations at the specific foreign embassy"
      ];
    } else {
      return isAr ? [
        "الحصول على وثيقة رسمية مصدقة من بلد المصدر الأصلي",
        "التصديق من وزارة الخارجية في بلد المصدر",
        "التصديق من السفارة الأمريكية في ذلك البلد",
        "التحقق القانوني والترجمة المعتمدة داخل الولايات المتحدة"
      ] : [
        "Obtain certified document copy from the origin country authorities",
        "Legalization by the origin country's Ministry of Foreign Affairs",
        "Certification by the U.S. Embassy/Consulate in that country",
        "State-side legal review & certified translation upon arrival in the U.S."
      ];
    }
  };

  const apostilleSteps = getApostilleSteps();

  // Financial Services Estimate calculator
  const calculateFinancialPackage = () => {
    let bookkeepingCost = Math.round(monthlyTx * 1.5 + 150);
    let payrollCost = Math.round(employeeCount * 12 + 80);
    let taxPrepEstimate = employeeCount > 10 ? 850 : 450;
    return { bookkeepingCost, payrollCost, taxPrepEstimate };
  };

  const finEstimate = calculateFinancialPackage();

  // Gate specific image map
  const gateImages: Record<number, { en: string; ar: string }> = {
    1: { en: "/assets/images/visas_en.png", ar: "/assets/images/visas_ar.png" },
    2: { en: "/assets/images/translation_en.png", ar: "/assets/images/translation_ar.png" },
    3: { en: "/assets/images/notary_en.png", ar: "/assets/images/notary_ar.png" },
    4: { en: "/assets/images/legal_en.png", ar: "/assets/images/legal_ar.png" },
    5: { en: "/assets/images/financial_en.png", ar: "/assets/images/financial_ar.png" },
    6: { en: "/assets/images/consulting_en.png", ar: "/assets/images/consulting_ar.png" },
  };

  // Gate specific icon map
  const getGateIcon = (id: number) => {
    switch (id) {
      case 1: return Scale;
      case 2: return Globe;
      case 3: return FileCheck;
      case 4: return Landmark;
      case 5: return Coins;
      case 6: return Briefcase;
      default: return Scale;
    }
  };

  const GateIcon = getGateIcon(gateId);

  // Gates info matching translation keys & structure
  const getGateHeaderInfo = () => {
    switch (gateId) {
      case 1:
        return {
          title: t.gate1Title,
          tag: t.gate1Tag,
          desc: t.gate1Desc,
          badgeColor: "bg-[#B8922A]/10 text-[#B8922A] border-[#B8922A]/20"
        };
      case 2:
        return {
          title: t.gate2Title,
          tag: t.gate2Tag,
          desc: t.gate2Desc,
          badgeColor: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
        };
      case 3:
        return {
          title: t.gate3Title,
          tag: t.gate3Tag,
          desc: t.gate3Desc,
          badgeColor: "bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/20"
        };
      case 4:
        return {
          title: t.gate4Title,
          tag: t.gate4Tag,
          desc: t.gate4Desc,
          badgeColor: "bg-[#EC4899]/10 text-[#EC4899] border-[#EC4899]/20"
        };
      case 5:
        return {
          title: t.gate5Title,
          tag: t.gate5Tag,
          desc: t.gate5Desc,
          badgeColor: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
        };
      case 6:
        return {
          title: t.gate6Title,
          tag: t.gate6Tag,
          desc: t.gate6Desc,
          badgeColor: "bg-[#0284C7]/10 text-[#0284C7] border-[#0284C7]/20"
        };
      default:
        return {
          title: "",
          tag: "",
          desc: "",
          badgeColor: ""
        };
    }
  };

  const info = getGateHeaderInfo();
  const seoPage = getServiceByGateId(gateId);

  return (
    <div className="w-full min-h-screen bg-[#1B2C6B] text-[#F5F5F0] pb-24 relative" id={`service_detail_page_${gateId}`}>
      {/* Soft Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#B8922A]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        
        {/* Back Button and Navigation Path */}
        <div className="flex items-center mb-8 gap-2 text-sm text-[#F5F5F0]/70">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 hover:text-[#B8922A] transition-colors cursor-pointer font-semibold bg-transparent border-none focus:outline-none"
            id="back_to_services_btn"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 /* RTL: mirrored */" />
            <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
          </button>
          <span>/</span>
          <span className="text-[#B8922A] font-medium">{info.title}</span>
        </div>

        {/* Hero Section of the Service Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center border-b border-white/10 pb-12 mb-12" id="service_hero_grid">
          
          {/* Hero text */}
          <div className="lg:col-span-8 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${info.badgeColor}`} id="service_gate_tag">
              <GateIcon className="w-4 h-4" />
              <span>{info.tag}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-white leading-tight text-start /* RTL: mirrored */" id="service_page_title">
              {info.title}
            </h1>
            
            <p className="text-lg md:text-xl text-[#F5F5F0]/85 font-sans leading-relaxed max-w-4xl text-start /* RTL: mirrored */" id="service_page_description">
              {info.desc}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-start">
              <button
                onClick={() => onContactSelect(`${info.tag}: ${info.title}`)}
                className="bg-[#B8922A] text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-[#a37f20] hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg flex items-center gap-2"
                id="service_page_cta"
              >
                <span>{isAr ? "طلب استشارة فورية لهذا القسم" : "Book Advisory for this Service"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Icon/Visual Showcase card on the right */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-xs aspect-square rounded-3xl bg-[#101F4C]/80 border border-white/10 overflow-hidden shadow-2xl relative group flex flex-col justify-between">
              {/* Dynamic background image with fallback */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={isAr ? gateImages[gateId]?.ar : gateImages[gateId]?.en} 
                  alt={seoPage?.imageAlt || info.title}
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  referrerPolicy="no-referrer"
                />
                {/* Golden Gradient Overlay to match golden accents */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B8922A]/50 via-transparent to-[#E5C158]/10 pointer-events-none" />
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8922A]/15 rounded-full blur-2xl group-hover:bg-[#B8922A]/20 transition-all z-0" />
              
              {/* Keep the service logo and remove text & core logos (icons) as requested */}
              <div className="p-8 flex flex-col justify-between h-full w-full relative z-10">
                {/* Content cleared per user request to keep only the beautiful service logo and golden gradient */}
              </div>
            </div>
          </div>

        </div>

        {/* SECTION DETAIL - DYNAMIC DEPENDING ON GATE ID */}

        {/* GATE 1: VISAS & IMMIGRATION */}
        {gateId === 1 && (
          <div className="space-y-12" id="gate_1_details">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Box 1: Residency & Green Cards */}
              <div className="bg-[#101F4C]/40 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#B8922A]/30 transition-colors">
                <div className="w-12 h-12 bg-[#B8922A]/15 text-[#B8922A] rounded-xl flex items-center justify-center font-bold">1</div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">{t.gate1ResidencyTitle}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5F5F0]/80 font-sans">
                  {isAr ? [
                    "الهجرة العائلية للم شمل الأسرة والوالدين والأبناء",
                    "الهجرة عبر أصحاب العمل ورعايات الشركات والموظفين",
                    "الهجرة عن طريق الاستثمار (برامج EB-5 للمستثمرين)",
                    "تعديل الوضع والإقامة الدائمة داخل الولايات المتحدة",
                    "تجديد واستبدال البطاقة الخضراء (Green Card) المفقودة أو المنتهية",
                    "الإعفاءات والطلبات الاستثنائية لملفات الهجرة والمواطنة"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : [
                    "Family Immigration for immediate relatives & siblings",
                    "Employment-based Immigration & corporate sponsorships",
                    "Investment-based Immigration (EB-5 specialty programs)",
                    "Adjustment of Status & Permanent Residency within the US",
                    "Renewal & Replacement of lost or expired Green Cards",
                    "Special waivers and humanitarian/hardship petitions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Citizenship */}
              <div className="bg-[#101F4C]/40 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#B8922A]/30 transition-colors">
                <div className="w-12 h-12 bg-[#B8922A]/15 text-[#B8922A] rounded-xl flex items-center justify-center font-bold">2</div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">{t.gate1CitizenshipTitle}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5F5F0]/80 font-sans">
                  {isAr ? [
                    "معاملات التجنيس الكامل (N-400) للمؤهلين",
                    "إثبات الجنسية وطلبات شهادات الجنسية للأبناء والبالغين",
                    "استبدال وتصحيح وثائق الجنسية وجوازات السفر الأمريكية",
                    "خدمات وإجراءات الحصول على جواز السفر الأمريكي وتجديده"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : [
                    "Complete naturalization processing (Form N-400)",
                    "Proof of Citizenship & Certificates of Nationality",
                    "Replacement or correction of lost citizenship documents",
                    "U.S. Passport issuance and priority renewal support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 3: Humanitarian & Exemptions */}
              <div className="bg-[#101F4C]/40 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#B8922A]/30 transition-colors">
                <div className="w-12 h-12 bg-[#B8922A]/15 text-[#B8922A] rounded-xl flex items-center justify-center font-bold">3</div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">{t.gate1HumanitarianTitle}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5F5F0]/80 font-sans">
                  {isAr ? [
                    "طلبات اللجوء والحماية الإنسانية للمضطهدين",
                    "معاملات ضحايا العنف الأسري (VAWA) السرية",
                    "تأشيرات الضحايا وشهود الجرائم (U Visa)",
                    "تأشيرات ضحايا الاتجار بالبشر (T Visa)",
                    "الحماية المؤقتة الاستثنائية (TPS) وتجديداتها",
                    "طلبات الإعفاءات من موانع الدخول والتأشيرة (Waivers)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : [
                    "Asylum & Humanitarian Safe Harbor protections",
                    "Confidential VAWA filings for abuse survivors",
                    "U Visas for victims of eligible crimes and helpers",
                    "T Visas for trafficking survivors",
                    "Temporary Protected Status (TPS) filings & extensions",
                    "Inadmissibility Waivers (Forms I-601, I-601A, etc.)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 4: Educational & Medical */}
              <div className="bg-[#101F4C]/40 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#B8922A]/30 transition-colors">
                <div className="w-12 h-12 bg-[#B8922A]/15 text-[#B8922A] rounded-xl flex items-center justify-center font-bold">4</div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">{t.gate1EducationalTitle}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5F5F0]/80 font-sans">
                  {isAr ? [
                    "تأمين القبولات الجامعية والأكاديمية في الجامعات المعتمدة",
                    "الحصول على قبولات معاهد اللغة والمؤسسات التعليمية التخصصية",
                    "قبولات العلاج وتنسيق المواعيد الطبية الدولية والمستشفيات",
                    "تجهيز دعوات المؤتمرات والمعارض الدولية الرسمية والمهنية",
                    "دعوات الفعاليات الأكاديمية والمهنية والاجتماعية والرياضية",
                    "صياغة خطابات الدعم والمراسلات الأكاديمية والبحثية والعلمية"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : [
                    "Securing university & collegiate academic admissions",
                    "Language school admissions & professional certificate courses",
                    "International medical appointments & clinical treatments coordination",
                    "Invitations for international exhibitions and conventions",
                    "Professional, academic, and business event invites",
                    "Support letters for research, scientific, and professional visits"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 5: Correspondence & Follow-ups */}
              <div className="bg-[#101F4C]/40 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#B8922A]/30 transition-colors">
                <div className="w-12 h-12 bg-[#B8922A]/15 text-[#B8922A] rounded-xl flex items-center justify-center font-bold">5</div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">{t.gate1CorrespondenceTitle}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5F5F0]/80 font-sans">
                  {isAr ? [
                    "مراجعة وفحص المراسلات الواردة من إدارة الهجرة والعمل",
                    "إعداد ومتابعة طلبات الاستعلام عن المعاملات وحالات التأخر",
                    "تجهيز وتقديم طلبات تسريع المعاملة الطارئة (Expedite Requests)",
                    "صياغة ردود قوية على طلبات الإثبات والأدلة الإضافية (RFE)",
                    "تصحيح الأخطاء المطبعية والواردة في المراسلات والقرارات الرسمية",
                    "إعداد طلبات تغيير العناوين وتحديث الملفات الشخصية (AR-11)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : [
                    "Auditing official correspondence from USCIS and DOL",
                    "Drafting status queries and administrative inquiries",
                    "Preparing Expedite Requests based on urgent circumstances",
                    "Structuring response packages to Request for Evidence (RFE)",
                    "Correcting spelling/typographical errors on USCIS papers",
                    "Form AR-11 physical address updates & profile tracking"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 6: Visa Classifications */}
              <div className="bg-[#101F4C]/40 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#B8922A]/30 transition-colors">
                <div className="w-12 h-12 bg-[#B8922A]/15 text-[#B8922A] rounded-xl flex items-center justify-center font-bold">6</div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">{t.gate1VisaTypesTitle}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5F5F0]/80 font-sans">
                  {isAr ? [
                    "تأشيرات الزيارة والسياحة (B1/B2)",
                    "تأشيرات الأعمال والزيارات التجارية",
                    "تأشيرات الدراسة والتدريب والتبادل الثقافي",
                    "تأشيرات العمل المؤقتة",
                    "تأشيرات المستثمرين ورواد الأعمال",
                    "تأشيرات الخطيب/الخطيبة (K-1)",
                    "تأشيرات الزواج والهجرة العائلية"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : [
                    "Visit and Tourism Visas (B1/B2)",
                    "Business & Commercial Visit Visas",
                    "Study, Training & Cultural Exchange Visas",
                    "Temporary Work Visas",
                    "Investor & Entrepreneur Visas",
                    "Fiancé/Fiancée Visas (K-1)",
                    "Marriage & Family Immigration Visas"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#B8922A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Interactive Services Explorer Card (Relocated & Always fully visible) */}
            <div className="max-w-7xl mx-auto w-full mb-8 mt-12" id="stats_services_column">
              <div className="bg-[#F5F5F0] border border-black/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6 text-[#2C2C2C]">
                
                <div className="border-b border-[#2C2C2C]/10 pb-4" ref={cardRef}>
                  <span className="bg-[#1B2C6B]/10 text-[#1B2C6B] border border-[#1B2C6B]/15 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-2 inline-block">
                    {isAr ? "دليل فئات خدمات الهجرة والمواطنة" : "Texas Gateway Multi Services Group Directory"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mt-1 flex flex-wrap justify-start">
                    {titleWords.map((word, i) => (
                      <BlackWordReveal
                        key={`${word}-${i}`}
                        word={word}
                        index={i}
                        total={titleWords.length}
                      />
                    ))}
                  </h3>
                  <p className="text-xs text-[#2C2C2C]/75 mt-1.5">
                    {isAr 
                      ? "تصفح فئاتنا الاستشارية لمشاهدة تفاصيل تصنيفات التأشيرات وإجراءات التقديم الكاملة." 
                      : "Explore our practice classifications to view detailed visa options and filing procedures."}
                  </p>
                </div>

                {/* Service Areas with Responsive Grid Layout (Horizontal & Vertical) and Compact Styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="services_dimming_list">
                  {servicesData.map((service, index) => {
                    const IconComp = service.icon;
                    const isLast = index === servicesData.length - 1;

                    return (
                      <div
                        key={service.id}
                        className={`p-4 sm:p-5 bg-white border border-[#2C2C2C]/10 rounded-xl shadow-sm hover:border-[#B8922A]/30 hover:shadow-md transition-all duration-300 ease-out flex gap-3.5 opacity-100 scale-100 text-start /* RTL: mirrored */ ${isLast ? "md:col-span-2" : ""}`}
                        id={`service_card_${service.id}`}
                      >
                        {/* Icon */}
                        <div className="p-2.5 bg-[#1B2C6B]/10 text-[#1B2C6B] rounded-lg self-start shrink-0">
                          <IconComp className="w-4.5 h-4.5 shrink-0" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1.5">
                          <h4 className="text-sm font-bold text-black tracking-tight flex items-center justify-between">
                            <span>{service.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#B8922A] opacity-60 rtl:rotate-180 /* RTL: mirrored */" />
                          </h4>

                          {/* If single description (NVC, AOS, Naturalization) */}
                          {service.description && (
                            <p className="text-xs text-[#2C2C2C]/80 leading-relaxed font-sans">
                              {service.description}
                            </p>
                          )}

                          {/* If list of item sub-categories (Employment, Family) */}
                          {service.items && (
                            <div className="space-y-2 pt-1.5 border-t border-[#2C2C2C]/5">
                              {service.items.map((sub, itemIdx) => (
                                <div key={itemIdx} className="space-y-0.5 text-xs">
                                  <span className="font-semibold text-black block flex items-center gap-1.5 leading-tight">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8922A]" />
                                    {sub.category}
                                  </span>
                                  <span className="text-[#2C2C2C]/75 block font-mono text-[10.5px] leading-relaxed ps-3 /* RTL: mirrored */ text-start /* RTL: mirrored */">
                                    {sub.details}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Secure Compliance Footer */}
                <div className="flex items-start gap-2 text-xs text-[#2C2C2C]/85 bg-[#B8922A]/10 border border-[#B8922A]/20 px-4 py-3 rounded-xl mt-6 text-start /* RTL: mirrored */">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    {isAr 
                      ? "تطابق جميع أطر العمل المعتمدة لدينا اللوائح المعمول بها لدى إدارة الهجرة الأمريكية (USCIS) ووزارة الخارجية ووزارة العمل." 
                      : "All listed practice frameworks conform exactly to regular USCIS, Department of State (NVC), and Department of Labor regulations."}
                  </span>
                </div>

              </div>
            </div>

            {/* Special Highlight: Immigration Process Steps */}
            <div className="bg-[#101F4C]/80 border border-white/15 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white font-sans">{isAr ? "دورة مراجعة وتدقيق الملفات الاستشارية" : "Case Review & Filing Timeline"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {[
                  {
                    step: "01",
                    title: isAr ? "تحليل الملف الأولي" : "Initial Intake",
                    desc: isAr ? "مراجعة المؤهلات وتدقيق السجل والمستندات بدقة." : "Rigorous evaluation of documents, history and eligibility."
                  },
                  {
                    step: "02",
                    title: isAr ? "صياغة الردود والطلبات" : "Petition Packaging",
                    desc: isAr ? "إعداد حزمة الطلب الرسمية وصياغة خطابات الشرح المهنية." : "Structuring formal packets & comprehensive letters of explanation."
                  },
                  {
                    step: "03",
                    title: isAr ? "المطابقة والتدقيق الحكومي" : "Liaison & Follow-up",
                    desc: isAr ? "تتبع حالة المعاملة لدى USCIS والرد الفوري على طلبات الأدلة الإضافية." : "Active status inquiries, tracking & swift answers to RFEs."
                  },
                  {
                    step: "04",
                    title: isAr ? "المقابلة والقرار النهائي" : "Interview & Decision",
                    desc: isAr ? "تحضير مكثف ومراجعة كاملة لأسئلة المقابلات الشخصية." : "Comprehensive mock preparation and post-approval documentation."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2 relative">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#B8922A]/20 block">{item.step}</span>
                    <h4 className="text-base font-bold text-white font-sans">{item.title}</h4>
                    <p className="text-xs text-[#F5F5F0]/70 font-sans leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GATE 2: TRANSLATION & LANGUAGE SOLUTIONS */}
        {gateId === 2 && (
          <div className="space-y-12" id="gate_2_details">
            
            {/* Features layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Content box */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans">{isAr ? "خدمات الترجمة المعتمدة قانونياً" : "Certified Legal Translations"}</h3>
                <div className="space-y-4">
                  {t.gate2Features.map((feat, idx) => (
                    <div key={idx} className="flex gap-4 bg-[#101F4C]/40 border border-white/10 p-5 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-sans text-sm md:text-base">{feat}</h4>
                        <p className="text-xs text-[#F5F5F0]/75 mt-1 font-sans">
                          {isAr 
                            ? "مترجمون معتمدون يتمتعون بفهم كامل للقوانين والمصطلحات الإدارية المعقدة في الولايات المتحدة." 
                            : "Professional Arabic-English translation conforming with 8 CFR § 103.2(b)(3) requirements for federal filings."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-900/40 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-[#10B981]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{isAr ? "مقبول ومضمون بنسبة 100٪ لدى دائرة الهجرة والجنسية الأمريكية (USCIS) والمحاكم والمؤسسات الأكاديمية." : "100% Guaranteed Acceptance by USCIS, Department of State (NVC), and corporate evaluators."}</span>
                </div>
              </div>

              {/* ESTIMATOR TOOL */}
              <div className="lg:col-span-5">
                <div className="bg-[#101F4C]/80 border border-white/15 rounded-2xl p-6 space-y-6 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Clock className="w-5 h-5 text-[#10B981]" />
                    <h3 className="text-base md:text-lg font-bold text-white font-sans">{isAr ? "مخمن وقت وتكلفة الترجمة" : "Translation Quote Estimator"}</h3>
                  </div>

                  {/* Doc type selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#F5F5F0]/70 uppercase block">{isAr ? "نوع المستند" : "Document Classification"}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "standard", label: isAr ? "شهادة/رسمي" : "Certificates" },
                        { id: "complex", label: isAr ? "قانوني/عقد" : "Legal/Deed" },
                        { id: "academic", label: isAr ? "أكاديمي/بيان" : "Transcripts" }
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setDocType(type.id as any)}
                          className={`py-2 px-1 text-xs rounded-lg border font-semibold transition-all cursor-pointer focus:outline-none ${
                            docType === type.id 
                              ? "bg-[#10B981] border-[#10B981] text-white" 
                              : "bg-white/5 border-white/10 text-[#F5F5F0]/80 hover:bg-white/10"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Word count slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono text-[#F5F5F0]/70">
                      <span>{isAr ? "عدد الكلمات التقديري" : "Estimated Word Count"}</span>
                      <span className="text-white font-bold">{wordCount} {isAr ? "كلمة" : "words"}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="5000" 
                      step="50"
                      value={wordCount}
                      onChange={(e) => setWordCount(Number(e.target.value))}
                      className="w-full accent-[#10B981] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Computed Output */}
                  <div className="p-4 bg-[#1B2C6B] border border-white/10 rounded-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-xs text-[#F5F5F0]/70 font-sans">{isAr ? "الوقت التقديري للتسليم" : "Estimated Turnaround"}</span>
                      <span className="text-sm font-bold text-white font-sans flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#10B981]" />
                        {transEstimate.days} {transEstimate.days === 1 ? (isAr ? "يوم عمل واحد" : "Business Day") : (isAr ? "أيام عمل" : "Business Days")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#F5F5F0]/70 font-sans">{isAr ? "التكلفة التقديرية للخدمة" : "Estimated Cost"}</span>
                      <span className="text-lg font-bold text-[#10B981] font-sans">
                        ${transEstimate.price} - ${Math.round(transEstimate.price * 1.15)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#F5F5F0]/60 font-sans leading-relaxed text-center">
                    {isAr 
                      ? "*التقديرات للأغراض التوجيهية وتخضع لمراجعة الملفات الفيزيائية وصعوبة النص المصدر." 
                      : "*Estimates are advisory and subject to source text density, legibility, and technical specialty review."}
                  </p>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* GATE 3: NOTARY & APOSTILLE / ATTESTATION SERVICES */}
        {gateId === 3 && (
          <div className="space-y-12" id="gate_3_details">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Side: Services lists */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans">{isAr ? "التصديق الدولي والأبوستيل لولاية تكساس والولايات المتحدة" : "International Apostille & Attestation Pathways"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t.gate3Features.map((feat, idx) => (
                    <div key={idx} className="bg-[#101F4C]/40 border border-white/10 p-5 rounded-xl space-y-2">
                      <div className="p-2.5 bg-[#A855F7]/10 border border-[#A855F7]/20 text-[#A855F7] rounded-lg w-fit">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white font-sans text-sm md:text-base">{feat}</h4>
                      <p className="text-xs text-[#F5F5F0]/70 font-sans leading-relaxed">
                        {isAr 
                          ? "إجراءات سريعة لتصديق الوثائق الشخصية والشركات الصادرة من تكساس وباقي الولايات تمهيداً لاستخدامها في الخارج." 
                          : "Guaranteed authentication of state-issued certs and corporate instruments for cross-border transactions."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Interactive Helper Wizard */}
              <div className="lg:col-span-5">
                <div className="bg-[#101F4C]/80 border border-white/15 rounded-2xl p-6 space-y-6 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <HelpCircle className="w-5 h-5 text-[#A855F7]" />
                    <h3 className="text-base md:text-lg font-bold text-white font-sans">{isAr ? "مساعد خطوات الأبوستيل التفاعلي" : "Interactive Apostille Wizard"}</h3>
                  </div>

                  {/* Document Origin */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#F5F5F0]/70 uppercase block">{isAr ? "مكان إصدار المستند" : "Where was the Document Issued?"}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "texas", label: isAr ? "ولاية تكساس" : "Texas State" },
                        { id: "other-us", label: isAr ? "ولاية أمريكية أخرى" : "Other U.S. State" },
                        { id: "foreign", label: isAr ? "دولة خارجية" : "Foreign Nation" }
                      ].map((origin) => (
                        <button
                          key={origin.id}
                          onClick={() => setDocOrigin(origin.id as any)}
                          className={`py-2 px-1 text-xs rounded-lg border font-semibold transition-all cursor-pointer focus:outline-none ${
                            docOrigin === origin.id 
                              ? "bg-[#A855F7] border-[#A855F7] text-white" 
                              : "bg-white/5 border-white/10 text-[#F5F5F0]/80 hover:bg-white/10"
                          }`}
                        >
                          {origin.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Steps output */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-[#F5F5F0]/70 uppercase block">{isAr ? "الخطوات التنفيذية المطلوبة" : "Required Execution Steps"}</span>
                    <div className="space-y-2">
                      {apostilleSteps.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start bg-[#1B2C6B] p-3 rounded-lg border border-white/5 text-xs">
                          <span className="font-bold text-[#A855F7] shrink-0">0{idx + 1}.</span>
                          <span className="text-[#F5F5F0]/85 font-sans leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[10px] text-[#F5F5F0]/60 font-sans leading-relaxed text-center">
                    {isAr 
                      ? "*تقدم مجموعة بوابة تكساس للخدمات المتعددة خدمات لوجستية وميدانية كاملة للمصادقة وتخليص كافة هذه الخطوات نيابة عنكم." 
                      : "*Texas Gateway Multi Services Group provides door-to-door courier and state-house filing logistics to complete all these steps."}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* GATE 4: LEGAL SERVICES GROUP */}
        {gateId === 4 && (
          <div className="space-y-12" id="gate_4_details">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: t.gate4AssistantTitle,
                  desc: t.gate4AssistantDesc,
                  detail: isAr 
                    ? "مساعدة المحامين المرخصين في صياغة ومراجعة مسودات العقود الإيجارية والتجارية وشهادات الإفادة والطلبات النظامية." 
                    : "Drafting corporate organizational minutes, simple leases, and affidavits under direct licensed counsel supervision."
                },
                {
                  title: t.gate4ResearcherTitle,
                  desc: t.gate4ResearcherDesc,
                  detail: isAr 
                    ? "استخدام قواعد البيانات المتقدمة مثل LexisNexis و Westlaw للحصول على السوابق القضائية والمذكرات القانونية التفصيلية." 
                    : "Comprehensive research across state supreme court precedents, federal appellate decisions and federal codes."
                },
                {
                  title: t.gate4MarketerTitle,
                  desc: t.gate4MarketerDesc,
                  detail: isAr 
                    ? "نوفر نقطة اتصال متميزة للجالية العربية للربط بين أفراد الجالية وأبرز المحامين الأمريكيين المتخصصين في قضاياهم المعقدة." 
                    : "Bridging the language gap to link corporate/individual Arab clients with elite, state-bar certified litigators."
                },
                {
                  title: t.gate4EventTitle,
                  desc: t.gate4EventDesc,
                  detail: isAr 
                    ? "تنسيق حملات التوعية المهنية والندوات الثقافية القانونية للمحامين لضمان الالتزام بقوانين نقابة المحامين الأمريكية (ABA)." 
                    : "Full logistics for educational CLE seminars and informational webinars within ABA Model Rules compliance bounds."
                },
                {
                  title: t.gate4PartnerTitle,
                  desc: t.gate4PartnerDesc,
                  detail: isAr 
                    ? "مساعدة الشركات في صياغة اتفاقيات التسوية الودية، والتحكيم التجاري، وحل النزاعات التعاقدية دون اللجوء للمحاكم." 
                    : "Facilitating friendly third-party mediations and drafting binding out-of-court settlement and mutual release forms."
                }
              ].map((sub, idx) => (
                <div key={idx} className="bg-[#101F4C]/40 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#EC4899]/30 transition-colors">
                  <div className="p-3 bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] rounded-xl w-fit">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans">{sub.title}</h3>
                  <p className="text-sm text-[#F5F5F0]/90 font-sans leading-relaxed">{sub.desc}</p>
                  <p className="text-xs text-[#F5F5F0]/65 font-sans leading-relaxed border-t border-white/5 pt-3">{sub.detail}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#101F4C]/80 border border-white/15 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="p-4 bg-[#EC4899]/15 text-[#EC4899] rounded-2xl shrink-0">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white font-sans">{isAr ? "إشعار نظامي هام وبراءة ذمة" : "Important Legal Disclaimer"}</h4>
                <p className="text-xs text-[#F5F5F0]/85 font-sans leading-relaxed">
                  {isAr 
                    ? "مجموعة بوابة تكساس للخدمات المتعددة هي مكتب خدمات استشارية ومساعدة قانونية وإدارية متعددة التخصصات. نحن لسنا شركة محاماة ولا نقدم تمثيلاً قضائياً أو استشارات قانونية مباشرة. يتم تقديم أي دعم قانوني مهني تحت إشراف وتفويض مباشر من محامين مرخصين ومستشارين مستقلين منضومين مع المجموعة." 
                    : "Texas Gateway Multi Services Group is a multi-service professional advisory firm. We are not a licensed law firm and do not provide direct legal advice or courtroom representation to the general public. All paralegal, research, and advisory services are performed in absolute support of, and coordination with, certified independent attorneys and state-licensed counselors."}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* GATE 5: FINANCIAL SERVICES GROUP */}
        {gateId === 5 && (
          <div className="space-y-12" id="gate_5_details">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Side: Services lists */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans">{isAr ? "الحلول المحاسبية والضريبية المعتمدة للمؤسسات" : "SME Financial Management & Bookkeeping Services"}</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: t.gate5TaxTitle,
                      desc: t.gate5TaxDesc,
                      detail: isAr ? "صياغة وتقديم التقارير الضريبية السنوية للشركات والأفراد، والتخطيط الاستراتيجي لتقليل العبء الضريبي المتوافق مع اللوائح الفيدرالية." : "Filing Federal Forms 1120, 1120S, 1065, Schedule C, state franchise filings, and robust compliance with 2026 IRS tax codes."
                    },
                    {
                      title: t.gate5PayrollTitle,
                      desc: t.gate5PayrollDesc,
                      detail: isAr ? "إصدار الرواتب الأسبوعية والشهرية، واقتطاعات الضرائب الفيدرالية والمحلية، وإصدار النماذج W-2 و 1099 للموظفين." : "Processing automated payroll sheets, calculating withholding taxes, running W-2/1099 compilations, and compliance with DOL guidelines."
                    },
                    {
                      title: t.gate5BookkeepingTitle,
                      desc: t.gate5BookkeepingDesc,
                      detail: isAr ? "أرشفة المعاملات المالية، مطابقة الحسابات البنكية، وإعداد الميزانيات العمومية وتقارير الأرباح والخسائر الدورية." : "Continuous double-entry journal logs, monthly bank reconciliation, general ledger upkeep, and formulating ready-to-file profit & loss statements."
                    }
                  ].map((feat, idx) => (
                    <div key={idx} className="flex gap-4 bg-[#101F4C]/40 border border-white/10 p-5 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center shrink-0">
                        <Coins className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-sans text-sm md:text-base">{feat.title}</h4>
                        <p className="text-xs text-[#F5F5F0]/90 font-sans mt-1 leading-relaxed">{feat.desc}</p>
                        <p className="text-[11px] text-[#F5F5F0]/60 font-sans mt-1.5 border-t border-white/5 pt-1.5">{feat.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Quote Calculator */}
              <div className="lg:col-span-5">
                <div className="bg-[#101F4C]/80 border border-white/15 rounded-2xl p-6 space-y-6 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Calculator className="w-5 h-5 text-[#3B82F6]" />
                    <h3 className="text-base md:text-lg font-bold text-white font-sans">{isAr ? "آلة حاسبة تكاليف المحاسبة" : "Accounting Cost Calculator"}</h3>
                  </div>

                  {/* Num Employees input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono text-[#F5F5F0]/70">
                      <span>{isAr ? "عدد موظفي الشركة (W2 / 1099)" : "Number of Employees / Contractors"}</span>
                      <span className="text-white font-bold">{employeeCount}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(Number(e.target.value))}
                      className="w-full accent-[#3B82F6] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Monthly Transactions input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono text-[#F5F5F0]/70">
                      <span>{isAr ? "حجم المعاملات الشهرية بالبنك" : "Estimated Monthly Bank Transactions"}</span>
                      <span className="text-white font-bold">{monthlyTx}</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="1000" 
                      step="10"
                      value={monthlyTx}
                      onChange={(e) => setMonthlyTx(Number(e.target.value))}
                      className="w-full accent-[#3B82F6] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Computed estimates */}
                  <div className="p-4 bg-[#1B2C6B] border border-white/10 rounded-xl space-y-3">
                    <div className="flex justify-between items-center text-xs text-[#F5F5F0]/80">
                      <span className="font-sans">{isAr ? "خدمات مسك الدفاتر (شهري)" : "Monthly Bookkeeping"}</span>
                      <span className="font-mono text-white font-bold">${finEstimate.bookkeepingCost}{isAr ? " / شهر" : "/mo"}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#F5F5F0]/80 border-b border-white/5 pb-2">
                      <span className="font-sans">{isAr ? "خدمة الرواتب (شهري)" : "Monthly Payroll Processing"}</span>
                      <span className="font-mono text-white font-bold">${finEstimate.payrollCost}{isAr ? " / شهر" : "/mo"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs text-[#F5F5F0]/70 font-sans">{isAr ? "تقديم الإقرار السنوي التقديري" : "Year-end Tax Prep (Est.)"}</span>
                      <span className="text-sm font-bold text-[#3B82F6] font-mono">
                        ${finEstimate.taxPrepEstimate} {isAr ? "/ سنة" : "/ yr"}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#F5F5F0]/60 font-sans leading-relaxed text-center">
                    {isAr 
                      ? "*التقديرات توجيهية استرشادية، تقدم خدمات متكاملة مخصصة وعقود سنوية للشركات الصغيرة لتخفيض التكاليف." 
                      : "*Pricing calculations are typical guidelines. We offer specialized combined SME annual bundles for additional savings."}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* GATE 6: MANAGEMENT SERVICES & CONSULTING */}
        {gateId === 6 && (
          <div className="space-y-12" id="gate_6_details">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Side: Services lists */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans">
                  {isAr ? "خدمات وحلول التطوير الإداري والاستشاري للشركات" : "SME Management Advisory & Structural Solutions"}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: isAr ? "الاستشارات الإدارية وتطوير الأعمال" : "Administrative Consulting & Business Growth",
                      desc: isAr 
                        ? "تقديم حلول واستشارات مهنية لدعم نمو الشركات الصغيرة والمتوسطة وتنظيم هيكلها الإداري بما يضمن سير العمل بأعلى كفاءة." 
                        : "Tailored professional consulting to support SME growth, structural organization, and practical administrative models.",
                      detail: isAr 
                        ? "دراسة شاملة للاحتياجات الإدارية، وبناء خطط التنمية العملية والحلول الهيكلية المناسبة للشركات المتنامية." 
                        : "Custom organizational charts, establishing reporting lines, and developing business models adapted to expanding markets."
                    },
                    {
                      title: isAr ? "تنظيم العمليات وتطوير أدلة السياسات" : "Process Engineering & Policy Documentation",
                      desc: isAr 
                        ? "صياغة وتوثيق الأدلة التنظيمية والسياسات الداخلية للشركات التي تضمن انضباط العمل، وتحفظ حقوق الشركة والعاملين فيها." 
                        : "Drafting company policies, operations manuals, employee handbooks, and clear internal operating guidelines.",
                      detail: isAr 
                        ? "إعداد السياسات التنظيمية والعمليات واللوائح الداخلية وإجراءات التشغيل القياسية (SOPs)." 
                        : "Creating standard operating procedures (SOPs), and documenting daily operational workflows to maximize productivity."
                    },
                    {
                      title: isAr ? "خدمات المتابعة الإدارية والدعم المكتبي المتكامل" : "Comprehensive Administrative & Office Support",
                      desc: isAr 
                        ? "تنظيم وحفظ المستندات والسجلات الإدارية الكترونياً، ودعم المكاتب، ومتابعة تنفيذ المهام والتخطيط اليومي الفعّال." 
                        : "Active coordination of file organization, record keeping, daily execution schedules, and business office services.",
                      detail: isAr 
                        ? "أرشفة السجلات الإدارية، وإدارة المستندات الهامة، والمتابعة اليومية للمراسلات والمهام العامة." 
                        : "Secure cataloging, team coordination assistance, calendar management, and professional business support helpers."
                    }
                  ].map((feat, idx) => (
                    <div key={idx} className="flex gap-4 bg-[#101F4C]/40 border border-white/10 p-5 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-[#0284C7]/15 text-[#0284C7] flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-sans text-sm md:text-base">{feat.title}</h4>
                        <p className="text-xs text-[#F5F5F0]/90 font-sans mt-1 leading-relaxed">{feat.desc}</p>
                        <p className="text-[11px] text-[#F5F5F0]/60 font-sans mt-1.5 border-t border-white/5 pt-1.5">{feat.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional list of services requested by the user */}
                <div className="bg-[#101F4C]/20 border border-white/5 rounded-2xl p-6 space-y-4">
                  <h4 className="font-bold text-white font-sans text-base">{isAr ? "الحلول الإضافية المتاحة في البوابة السادسة:" : "Additional Specialized Service Outlets:"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {[
                      isAr ? "تحسين سير العمل وزيادة الإنتاجية" : "Workflow Improvement & Productivity Enhancement",
                      isAr ? "تنظيم الملفات والسجلات والمتابعة الإدارية" : "File Organization & Administrative Record Keeping",
                      isAr ? "دعم التخطيط والتنفيذ اليومي للأعمال" : "Daily Planning & Execution Support",
                      isAr ? "تطوير الأداء المؤسسي المستدام" : "Sustainable Organizational Performance Development",
                      isAr ? "خدمات دعم الأعمال والمكاتب والمشتريات" : "Flexible Office & Business Support Services",
                      isAr ? "حلول تنظيمية عملية للشركات الناشئة" : "Practical Organizational Solutions for Startups"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[#F5F5F0]/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Business Admin Assessment Tool */}
              <div className="lg:col-span-5">
                <div className="bg-[#101F4C]/80 border border-white/15 rounded-2xl p-6 space-y-6 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Calculator className="w-5 h-5 text-[#0284C7]" />
                    <h3 className="text-base md:text-lg font-bold text-white font-sans">
                      {isAr ? "مقيِّم الكفاءة الإدارية للمؤسسات" : "SME Admin Health Evaluator"}
                    </h3>
                  </div>

                  <p className="text-xs text-[#F5F5F0]/80 leading-relaxed font-sans">
                    {isAr 
                      ? "قيّم الوضع التنظيمي الحالي لشركتك لمعرفة نقاط القوة ومواطن التحسين الإداري المطلوبة:" 
                      : "Evaluate your company's current organizational level to discover crucial improvements and action points:"}
                  </p>

                  <div className="space-y-3">
                    {/* Checkbox 1 */}
                    <label className="flex items-start gap-3 p-3 bg-[#1B2C6B]/50 border border-white/5 rounded-xl cursor-pointer hover:bg-[#1B2C6B]/80 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={hasSop} 
                        onChange={(e) => setHasSop(e.target.checked)} 
                        className="mt-0.5 w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] accent-[#0284C7]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-white block">
                          {isAr ? "أدلة تشغيل مكتوبة (SOPs)" : "Written Work Procedures (SOPs)"}
                        </span>
                        <span className="text-[10px] text-[#F5F5F0]/60">
                          {isAr ? "هل لديك أدلة مكتوبة توضح كيفية تنفيذ المهام اليومية بالتفصيل؟" : "Are daily steps documented for employees?"}
                        </span>
                      </div>
                    </label>

                    {/* Checkbox 2 */}
                    <label className="flex items-start gap-3 p-3 bg-[#1B2C6B]/50 border border-white/5 rounded-xl cursor-pointer hover:bg-[#1B2C6B]/80 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={hasOrgChart} 
                        onChange={(e) => setHasOrgChart(e.target.checked)} 
                        className="mt-0.5 w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] accent-[#0284C7]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-white block">
                          {isAr ? "هيكل تنظيمي وتوزيع واضح للأدوار" : "Defined Roles & Org Chart"}
                        </span>
                        <span className="text-[10px] text-[#F5F5F0]/60">
                          {isAr ? "هل يمتلك كل موظف وصفاً وظيفياً محدداً وواضحاً؟" : "Does everyone have clear visual responsibilities?"}
                        </span>
                      </div>
                    </label>

                    {/* Checkbox 3 */}
                    <label className="flex items-start gap-3 p-3 bg-[#1B2C6B]/50 border border-white/5 rounded-xl cursor-pointer hover:bg-[#1B2C6B]/80 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={hasDigitalRecord} 
                        onChange={(e) => setHasDigitalRecord(e.target.checked)} 
                        className="mt-0.5 w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] accent-[#0284C7]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-white block">
                          {isAr ? "أرشفة رقمية منظمة وسحابية" : "Digital Record Archiving"}
                        </span>
                        <span className="text-[10px] text-[#F5F5F0]/60">
                          {isAr ? "هل يتم حفظ السجلات وتصنيفها إلكترونياً بشكل آمن وسهل الوصول؟" : "Are files organized in secure digital storage?"}
                        </span>
                      </div>
                    </label>

                    {/* Checkbox 4 */}
                    <label className="flex items-start gap-3 p-3 bg-[#1B2C6B]/50 border border-white/5 rounded-xl cursor-pointer hover:bg-[#1B2C6B]/80 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={hasDailyPlan} 
                        onChange={(e) => setHasDailyPlan(e.target.checked)} 
                        className="mt-0.5 w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7] accent-[#0284C7]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-white block">
                          {isAr ? "نظام مبرمج للتخطيط اليومي" : "Active Calendar & Daily Plan"}
                        </span>
                        <span className="text-[10px] text-[#F5F5F0]/60">
                          {isAr ? "هل يتم متابعة المهام اليومية والأجندة بشكل دوري وممنهج؟" : "Are goals and operations actively tracked?"}
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Calculated Health Score Panel */}
                  <div className="p-4 bg-[#1B2C6B] border border-white/10 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#F5F5F0]/80 font-sans">
                        {isAr ? "مستوى الكفاءة التنظيمية الحالي" : "Current Organizational Health"}
                      </span>
                      <span className="text-sm font-bold text-white font-mono">{smeHealthScore}%</span>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] transition-all duration-500" 
                        style={{ width: `${smeHealthScore}%` }}
                      />
                    </div>

                    {/* Custom Recommendation based on Score */}
                    <p className="text-[11px] text-[#F5F5F0]/80 leading-relaxed font-sans pt-1">
                      {smeHealthScore === 100 ? (
                        isAr 
                          ? "رائع! شركتك تمتلك تنظيماً إدارياً متكاملاً. يمكننا دعمك بالاستشارات المتقدمة للمحافظة على هذا المستوى وتحسين الأداء التشغيلي بشكل مستدام." 
                          : "Outstanding! Your SME has excellent structures. We can assist with periodic professional audits and continuous scaling strategies."
                      ) : smeHealthScore >= 50 ? (
                        isAr 
                          ? "مستوى جيد، ولكن هناك فجوات تنظيمية. نقترح بدء صياغة اللوائح المتبقية وسد الفجوات للحفاظ على سلاسة نمو أعمالك وموظفيك." 
                          : "Good progress, but some structure gaps exist. We recommend formalizing your incomplete policy areas to safely anchor your team's expansion."
                      ) : (
                        isAr 
                          ? "التنظيم الحالي ضعيف ومجهد للأعمال. باقة التأسيس واللوائح الإدارية للمجموعة تساعدك في إعادة هيكلة شركتك وتحقيق الكفاءة المطلوبة فوراً." 
                          : "Your workflow represents a high strain risk. Our fundamental startup and policy templates will rebuild your efficiency instantly."
                      )}
                    </p>
                  </div>

                  {/* Disclaimer block */}
                  <div className="bg-white/5 border border-white/5 p-3.5 rounded-xl flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-[#F5F5F0]/70 font-sans leading-relaxed">
                      {isAr 
                        ? t.gate6Disclaimer
                        : t.gate6Disclaimer}
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        <ServiceSeoContent gateId={gateId} isAr={isAr} />

      </div>
    </div>
  );
}
