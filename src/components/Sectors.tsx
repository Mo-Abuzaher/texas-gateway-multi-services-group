import { useState, Fragment } from "react";
import { 
  Scale, 
  Globe, 
  FileCheck, 
  Landmark, 
  Coins, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Star,
  Layers,
  Heart,
  PlusCircle,
  HelpCircle,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
  onSelectGatePage?: (gateId: number) => void;
}

function DrawerTitleWordReveal({ word, index }: { word: string; index: number; key?: string }) {
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
      className="me-[0.25em] /* RTL: mirrored */ inline-block select-none font-sans"
    >
      {word}
    </motion.span>
  );
}

export default function Sectors({ lang, onSelectGatePage }: Props) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";
  
  // State for currently expanded Gate details (null, or 1 to 5)
  const [activeGate, setActiveGate] = useState<number | null>(null);

  // State for currently hovered Gate card to apply dimming/blurring on siblings
  const [hoveredGateId, setHoveredGateId] = useState<number | null>(null);

  const gatesData = [
    {
      id: 1,
      tag: t.gate1Tag,
      title: t.gate1Title,
      desc: t.gate1Desc,
      icon: Scale,
      color: "#962A2A",
      checklist: isAr ? [
        "تأشيرات العمل وكفالات الشركات الأمريكية",
        "بطاقات الإقامة الخضراء للم شمل الأسرة",
        "طلبات اللجوء والحماية الإنسانية الاستثنائية"
      ] : [
        "US Visas & Work Sponsorships",
        "Marriage Green Cards & Family Reunification",
        "Asylum & Humanitarian Safe Harbor Protection"
      ],
      subsections: [
        {
          title: t.gate1VisaTypesTitle,
          items: isAr ? [
            "تأشيرات الزيارة والسياحة (B1/B2)",
            "تأشيرات الأعمال والزيارات التجارية",
            "تأشيرات الدراسة والتدريب والتبادل الثقافي",
            "تأشيرات العمل المؤقتة",
            "تأشيرات المستثمرين ورواد الأعمال",
            "تأشيرات الخطيب/الخطيبة (K-1)",
            "تأشيرات الزواج والهجرة العائلية",
            "برنامج الهجرة العشوائية (DV Lottery)"
          ] : [
            "Visit and Tourism Visas (B1/B2)",
            "Business & Commercial Visit Visas",
            "Study, Training & Cultural Exchange Visas",
            "Temporary Work Visas",
            "Investor & Entrepreneur Visas",
            "Fiancé/Fiancée Visas (K-1)",
            "Marriage & Family Immigration Visas",
            "Diversity Visa (DV) Lottery Program"
          ]
        },
        {
          title: t.gate1ResidencyTitle,
          items: isAr ? [
            "الهجرة العائلية للم شمل الأسرة والوالدين والأبناء",
            "الهجرة عبر أصحاب العمل ورعايات الشركات والموظفين",
            "الهجرة عن طريق الاستثمار (برامج EB-5 للمستثمرين)",
            "تعديل الوضع والإقامة الدائمة داخل الولايات المتحدة",
            "تجديد واستبدال البطاقة الخضراء (Green Card) المفقودة أو المنتهية",
            "الإعفاءات والطلبات الاستثنائية لملفات الهجرة والمواطنة"
          ] : [
            "Family Immigration for immediate relatives & siblings",
            "Employment-based Immigration & corporate sponsorships",
            "Investment-based Immigration (EB-5 specialty programs)",
            "Adjustment of Status & Permanent Residency within the US",
            "Renewal & Replacement of lost or expired Green Cards",
            "Special waivers and humanitarian/hardship petitions"
          ]
        },
        {
          title: t.gate1CitizenshipTitle,
          items: isAr ? [
            "معاملات التجنيس الكامل (N-400) للمؤهلين",
            "إثبات الجنسية وطلبات شهادات الجنسية للأبناء والبالغين",
            "استبدال وتصحيح وثائق الجنسية وجوازات السفر الأمريكية",
            "خدمات وإجراءات الحصول على جواز السفر الأمريكي وتجديده"
          ] : [
            "Complete naturalization processing (Form N-400)",
            "Proof of Citizenship & Certificates of Nationality",
            "Replacement or correction of lost citizenship documents",
            "U.S. Passport issuance and priority renewal support"
          ]
        },
        {
          title: t.gate1HumanitarianTitle,
          items: isAr ? [
            "طلبات اللجوء والحماية الإنسانية للمضطهدين",
            "معاملات ضحايا العنف الأسري (VAWA) السرية",
            "تأشيرات الضحايا وشهود الجرائم (U Visa)",
            "تأشيرات ضحايا الاتجار بالبشر (T Visa)",
            "الحماية المؤقتة الاستثنائية (TPS) وتجديداتها",
            "طلبات الإعفاءات من موانع الدخول والتأشيرة (Waivers)",
            "الإعفاء من رسوم الهجرة المالية للمستحقين ذوي الدخل المحدود",
            "الإعفاء من امتحان الجنسية واللغة الإنجليزية لأسباب طبية معتمدة"
          ] : [
            "Asylum & Humanitarian Safe Harbor protections",
            "Confidential VAWA filings for abuse survivors",
            "U Visas for victims of eligible crimes and helpers",
            "T Visas for trafficking survivors",
            "Temporary Protected Status (TPS) filings & extensions",
            "Inadmissibility Waivers (Forms I-601, I-601A, etc.)",
            "USCIS fee waivers for low-income and qualified applicants",
            "Citizenship exam/English waivers for medical/physical reasons"
          ]
        },
        {
          title: t.gate1EducationalTitle,
          items: isAr ? [
            "تأمين القبولات الجامعية والأكاديمية في الجامعات المعتمدة",
            "الحصول على قبولات معاهد اللغة والمؤسسات التعليمية التخصصية",
            "قبولات العلاج وتنسيق المواعيد الطبية الدولية والمستشفيات",
            "تجهيز دعوات المؤتمرات والمعارض الدولية الرسمية والمهنية",
            "دعوات الفعاليات الأكاديمية والمهنية والاجتماعية والرياضية",
            "صياغة خطابات الدعم والمراسلات الأكاديمية والبحثية والعلمية"
          ] : [
            "Securing university & collegiate academic admissions",
            "Language school admissions & professional certificate courses",
            "International medical appointments & clinical treatments coordination",
            "Invitations for international exhibitions and conventions",
            "Professional, academic, and business event invites",
            "Support letters for research, scientific, and professional visits"
          ]
        },
        {
          title: t.gate1CorrespondenceTitle,
          items: isAr ? [
            "مراجعة وفحص المراسلات الواردة من إدارة الهجرة والعمل",
            "إعداد ومتابعة طلبات الاستعلام عن المعاملات وحالات التأخر",
            "تجهيز وتقديم طلبات تسريع المعاملة الطارئة (Expedite Requests)",
            "صياغة ردود قوية على طلبات الإثبات والأدلة الإضافية (RFE)",
            "تصحيح الأخطاء المطبعية والواردة في المراسلات والقرارات الرسمية",
            "إعداد طلبات تغيير العناوين وتحديث الملفات الشخصية (AR-11)",
            "صياغة مذكرات التفسير والدعم القانوني (Letters of Explanation)",
            "متابعة إشعارات المقابلات الشخصية والتحضير الدقيق للمتقدمين",
            "مراقبة الوثائق الرسمية والتدقيق الشامل لخطابات القبول والرفض",
            "متابعة المعاملات عبر المنصات والبوابات الحكومية الرسمية",
            "إعداد تقارير دورية وحصرية لمقدمي القضايا لتحديث سير المعاملة",
            "استقبال وفرز وإرسال المراسلات الورقية والإلكترونية",
            "تخطيط وتنسيق المواعيد والتواريخ الهامة واللقاءات الرسمية",
            "أرشفة وترتيب الملفات الخاصة بالقضايا بالغة الأهمية والحساسية"
          ] : [
            "Auditing official correspondence from USCIS and DOL",
            "Drafting status queries and administrative inquiries",
            "Preparing Expedite Requests based on urgent circumstances",
            "Structuring response packages to Request for Evidence (RFE)",
            "Correcting spelling/typographical errors on USCIS papers",
            "Form AR-11 physical address updates & profile tracking",
            "Formulating comprehensive Letters of Explanation",
            "Interview notifications tracking & rigorous preparation",
            "Auditing incoming documents, approval sheets & checklists",
            "Case progress monitoring on federal online platforms",
            "Formulating periodic status progress logs for clients",
            "Managing incoming and outgoing official paperwork",
            "Scheduling target review timelines & client consultations",
            "Dedicated and secure folder organization for sensitive records"
          ]
        }
      ]
    },
    {
      id: 2,
      tag: t.gate2Tag,
      title: t.gate2Title,
      desc: t.gate2Desc,
      icon: Globe,
      color: "#0D9488",
      checklist: t.gate2Features,
      features: t.gate2Features
    },
    {
      id: 3,
      tag: t.gate3Tag,
      title: t.gate3Title,
      desc: t.gate3Desc,
      icon: FileCheck,
      color: "#D97706",
      checklist: t.gate3Features,
      features: t.gate3Features
    },
    {
      id: 4,
      tag: t.gate4Tag,
      title: t.gate4Title,
      desc: t.gate4Desc,
      icon: Landmark,
      color: "#4F46E5",
      checklist: isAr ? [
        "دعم ومساعدة المحامين وتجهيز ملفات القضايا",
        "البحث القانوني وتدقيق المراجع في قواعد البيانات",
        "تنظيم الندوات والتسويق المتوافق لمكاتب المحاماة"
      ] : [
        "Attorney Assistant & Trial Prep Support",
        "Database Legal Research & Case Citation",
        "Seminars & Compliant Law Firm Marketing"
      ],
      subsections: [
        {
          title: t.gate4AssistantTitle,
          items: [t.gate4AssistantDesc]
        },
        {
          title: t.gate4ResearcherTitle,
          items: [t.gate4ResearcherDesc]
        },
        {
          title: t.gate4MarketerTitle,
          items: [t.gate4MarketerDesc]
        },
        {
          title: t.gate4EventTitle,
          items: [t.gate4EventDesc]
        },
        {
          title: t.gate4PartnerTitle,
          items: [t.gate4PartnerDesc]
        }
      ]
    },
    {
      id: 5,
      tag: t.gate5Tag,
      title: t.gate5Title,
      desc: t.gate5Desc,
      icon: Coins,
      color: "#DB2777",
      checklist: isAr ? [
        "إعداد الإقرارات الضريبية للشركات والأفراد",
        "معاملات الرواتب والأجور المتوافقة مع وزارة العمل",
        "إمساك الدفاتر المحاسبية والتقارير المالية الدورية"
      ] : [
        "State & Federal Corporate Tax Preparation",
        "Wages & Payroll Processing with DOL Compliance",
        "Continuous Part-Time Small Business Bookkeeping"
      ],
      subsections: [
        {
          title: t.gate5TaxTitle,
          items: [t.gate5TaxDesc]
        },
        {
          title: t.gate5PayrollTitle,
          items: [t.gate5PayrollDesc]
        },
        {
          title: t.gate5BookkeepingTitle,
          items: [t.gate5BookkeepingDesc]
        }
      ]
    }
  ];

  const summaries: Record<number, { en: string[]; ar: string[] }> = {
    1: {
      en: [
        "Comprehensive support for Green Cards, family reunification, and Adjustments of Status (I-485).",
        "Expert naturalization processing, citizenship certificates, and U.S. passport filing support.",
        "Confidential filings for humanitarian programs including Asylum, VAWA, and TPS applications.",
        "Proactive administrative audits of USCIS correspondence and swift response drafting."
      ],
      ar: [
        "دعم شامل لمعاملات الإقامة الدائمة (الغرين كارد)، لم شمل الأسرة، وتعديل الوضع القانوني.",
        "إجراءات تجنيس متكاملة، الحصول على شهادات الجنسية، وتقديم طلبات جواز السفر الأمريكي.",
        "تسيير طلبات الحماية الإنسانية واللجوء وحالات العنف الأسري والوضع المحمي المؤقت بسرية تامة.",
        "المتابعة والرد الفوري على خطابات واستفسارات إدارة الهجرة والعمل الأمريكية وإعداد المذكرات."
      ]
    },
    2: {
      en: [
        "Certified legal translation strictly conforming with 8 CFR § 103.2(b)(3) requirements.",
        "Highly precise translation of civil certificates, legal judgments, deeds, and academic transcripts.",
        "Guaranteed 100% acceptance by USCIS, Department of State, and academic/corporate evaluators."
      ],
      ar: [
        "ترجمة قانونية معتمدة ومطابقة بالكامل لمتطلبات المادة 8 من قانون اللوائح الفيدرالية الأمريكي.",
        "ترجمة عالية الدقة للوثائق الرسمية، الأحكام القضائية، شهادات الوفاة والزواج، والمستندات الأكاديمية.",
        "قبول مضمون بنسبة 100٪ لدى دائرة الهجرة والجنسية، المحاكم الأمريكية، والجهات الرسمية والأكاديمية."
      ]
    },
    3: {
      en: [
        "Registered Texas Notary Public services for legal declarations and administrative contracts.",
        "Expedited state-level and federal Apostille legalizations for international cross-border recognition.",
        "Consular attestation and multi-layer embassy filings for global corporate agreements."
      ],
      ar: [
        "توثيق رسمي من كاتب العدل بولاية تكساس (نوتر) للمعاملات والإقرارات الإدارية والتعاقدية.",
        "تصديق الأبوستيل (Apostille) السريع على مستوى الولاية والمستوى الفيدرالي للاعتراف الدولي بالوثائق.",
        "التصديق القنصلي والدبلوماسي الكامل وتنسيق المعاملات مع السفارات والبعثات الدبلوماسية."
      ]
    },
    4: {
      en: [
        "Professional paralegal assistant services for drafting standard contracts, leases, and trial filings.",
        "In-depth legal research across state supreme court precedents, statutes, and federal regulations.",
        "Legal marketing and referral operations designed within strict ABA Model Rules compliance.",
        "Amicable out-of-court arbitration and mediation facilitation for commercial disputes."
      ],
      ar: [
        "خدمات المساعد القانوني للمحامين المرخصين في صياغة مسودات العقود وتجهيز باقات القضايا.",
        "البحث القانوني المعمق والتحقق من السوابق القضائية الفيدرالية والمحلية وقرارات المحاكم.",
        "حملات تسويق قانونية معتمدة ومتوافقة بالكامل مع نموذج نقابة المحامين الأمريكية (ABA).",
        "تسهيل خدمات التحكيم والوساطة الودية وتجهيز اتفاقيات التسوية التجارية دون اللجوء للمحاكم."
      ]
    },
    5: {
      en: [
        "Corporate and individual federal/state tax filing preparation in line with latest IRS rules.",
        "Comprehensive SME payroll processing, withholding calculations, and DOL compliance support.",
        "Double-entry bookkeeping, continuous transaction audits, monthly reconciliation, and P&L reports."
      ],
      ar: [
        "إعداد وتدقيق الإقرارات الضريبية السنوية للشركات والأفراد تماشياً مع أحدث لوائح الـ IRS.",
        "معالجة كاملة لدفاتر الرواتب والأجور واقتطاع الضرائب وتوفير الامتثال التام لقوانين وزارة العمل.",
        "خدمات إمساك الدفاتر المحاسبية ومطابقة الحسابات البنكية الدورية وصياغة التقارير المالية والربحية."
      ]
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-[#F5F5F0] py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 flex flex-col justify-center border-t border-black/10 overflow-x-hidden"
      id="sectors_section"
    >
      {/* Background soft glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#B8922A]/5 via-transparent to-transparent opacity-20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B8922A] block" id="sectors_sub">
              {t.gatesSub}
            </span>
            <h2
              className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-[#2C2C2C] leading-tight"
              id="sectors_title"
            >
              {t.gatesTitle}
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-base text-[#2C2C2C]/75 font-sans leading-relaxed" id="sectors_description">
              {t.gatesDesc}
            </p>
          </div>
        </div>

        {/* 5 Gates Horizontal / Grid Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8 mb-12" id="sectors_gates_selectors">
          {gatesData.map((gate) => {
            const isSelected = activeGate === gate.id;
            const IconComp = gate.icon;
            const isDimmed = hoveredGateId !== null && hoveredGateId !== gate.id;

            return (
              <Fragment key={gate.id}>
                <motion.button
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  onClick={() => setActiveGate(isSelected ? null : gate.id)}
                  onMouseEnter={() => setHoveredGateId(gate.id)}
                  onMouseLeave={() => setHoveredGateId(null)}
                  whileHover={{ y: -6 }}
                  className={`text-start /* RTL: mirrored */ p-6 rounded-2xl border transition-all duration-300 relative cursor-pointer focus:outline-none flex flex-col justify-between h-full group bg-white text-[#2C2C2C] shadow-md hover:shadow-xl ${
                    isDimmed ? "opacity-35 scale-[0.985] blur-[0.3px]" : "opacity-100 scale-100"
                  } ${
                    isSelected 
                      ? "border-[#B8922A] ring-2 ring-[#B8922A]/20" 
                      : "border-black/5 hover:border-[#B8922A]/40"
                  }`}
                  id={`gate_btn_${gate.id}`}
                >
                  <div className="flex-1 flex flex-col justify-between w-full h-full">
                    <div>
                      {/* Badge */}
                      <div className="flex justify-start mb-4">
                        <span 
                          className="text-[10px] font-mono tracking-wider uppercase font-extrabold px-3 py-1.5 rounded-full border"
                          style={{
                            color: gate.color,
                            borderColor: `${gate.color}30`,
                            backgroundColor: `${gate.color}08`,
                          }}
                        >
                          {gate.tag}
                        </span>
                      </div>

                      {/* Icon container */}
                      <div 
                        className="p-3 rounded-xl border w-fit mb-4"
                        style={{
                          color: gate.color,
                          borderColor: `${gate.color}25`,
                          backgroundColor: `${gate.color}08`,
                        }}
                      >
                        <IconComp className="w-5 h-5 shrink-0" />
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold font-sans tracking-tight leading-snug text-[#2C2C2C] group-hover:text-[#B8922A] transition-colors mb-2 text-start /* RTL: mirrored */">
                        {gate.title}
                      </h3>
                    </div>

                    {/* Bottom Divider & CTA */}
                    <div className="pt-4 border-t border-black/10 mt-6 w-full flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-[#2C2C2C]/80 uppercase group-hover:text-[#B8922A] transition-colors">
                        {isSelected 
                          ? (isAr ? "انقر للإغلاق" : "CLICK TO COLLAPSE") 
                          : (isAr ? "انقر للتوسيع" : "CLICK TO EXPAND")}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 text-[#2C2C2C]/80 group-hover:text-[#B8922A] transition-transform duration-300 shrink-0 ${
                          isSelected ? "rotate-180 text-[#B8922A]" : "group-hover:translate-y-0.5"
                        }`} 
                      />
                    </div>
                  </div>
                </motion.button>

                {/* Detailed Drawer for Active Gate - Rendered Inline in the Grid */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key={`gate_drawer_container_${gate.id}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        opacity: { duration: 0.25 }
                      }}
                      className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5 bg-white text-[#2C2C2C] border border-[#B8922A]/30 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden mt-4 mb-4 will-change-[transform,opacity]"
                      id={`gate_drawer_container_${gate.id}`}
                    >
                      {/* Internal decorative star background with GPU layer promotion */}
                      <div className="absolute top-4 right-4 opacity-5 pointer-events-none will-change-transform">
                        <Star className="w-40 h-40 fill-[#B8922A]" />
                      </div>

                      <motion.div
                        layout="position"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="space-y-8 relative z-10"
                      >
                        {/* Drawer Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2C2C2C]/10">
                          <div className="flex items-center gap-4">
                            <div className="p-4 bg-[#1B2C6B] text-white rounded-2xl">
                              <IconComp className="w-7 h-7" />
                            </div>
                            <div>
                              <span className="text-xs uppercase font-mono text-[#B8922A] tracking-widest block font-bold">
                                {gate.tag}
                              </span>
                              <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight mt-0.5 flex flex-wrap justify-start">
                                {gate.title.split(" ").map((word, i) => (
                                  <DrawerTitleWordReveal 
                                    key={`${word}-${i}`} 
                                    word={word} 
                                    index={i} 
                                  />
                                ))}
                              </h3>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 self-start md:self-auto">
                            {onSelectGatePage && (
                              <button
                                onClick={() => onSelectGatePage(gate.id)}
                                className="bg-[#B8922A] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#a37f20] transition-colors flex items-center gap-2 shadow-lg focus:outline-none cursor-pointer"
                              >
                                <span>{isAr ? "الصفحة المخصصة" : "View Full Page"}</span>
                                <ChevronRight className="w-4 h-4 rtl:rotate-180 /* RTL: mirrored */" />
                              </button>
                            )}
                            <button
                              onClick={scrollToContact}
                              className="bg-[#1B2C6B] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#1B2C6B]/90 transition-colors flex items-center gap-2 shadow-lg focus:outline-none cursor-pointer"
                            >
                              <span>{t.heroCta}</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Description Paragraph */}
                        <p className="text-base leading-relaxed text-[#2C2C2C]/95 font-sans max-w-4xl text-start">
                          {gate.desc}
                        </p>

                        {/* Summarized Important Points List */}
                        <div className="space-y-4 pt-4">
                          <h4 className="text-base font-bold text-black uppercase tracking-wider font-mono text-start">
                            {isAr ? "أبرز نقاط الخدمة والحلول الأساسية" : "Core Service Highlights & Summary"}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(summaries[gate.id]?.[lang] || []).map((point, pIdx) => (
                              <div 
                                key={pIdx} 
                                className="bg-white border border-[#2C2C2C]/5 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-3"
                              >
                                <div className="w-7 h-7 rounded-full bg-[#B8922A]/10 flex items-center justify-center text-[#B8922A] shrink-0 mt-0.5">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-[#2C2C2C] leading-relaxed font-sans text-start">
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Star decorative checklist seal */}
                        <div className="flex items-center gap-2 text-xs text-[#2C2C2C]/85 bg-[#B8922A]/15 border border-[#B8922A]/25 px-4 py-3 rounded-xl max-w-2xl text-start">
                          <ShieldCheck className="w-4.5 h-4.5 text-emerald-700 shrink-0" />
                          <span>
                            {isAr 
                              ? "تخضع جميع الخدمات المقدمة ضمن هذا القسم لأعلى مستويات الرقابة المهنية والتدقيق المستمر." 
                              : "All operations within this specialized Gate follow rigorous state and federal regulatory audit procedures."}
                          </span>
                        </div>

                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
