import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA_EN: FAQItem[] = [
  {
    question: "Is Texas Gateway Multi Services Group registered with DOL and USCIS databases?",
    answer:
      "Yes. Texas Gateway Multi Services Group maintains direct alignment with relevant public databases, including Department of Labor prevailing wage schedules and USCIS petition processing status feeds. All data reflects real-time official guidelines and processing times.",
  },
  {
    question: "What documents are eligible for your certified translation and apostille services?",
    answer:
      "We translate and apostille all official documents, including civil certificates (birth, marriage, divorce), legal judgments, academic degrees, transcripts, powers of attorney, and corporate bylaws. All translations include signed and notarized accuracy affidavits accepted by USCIS, academic evaluators, and federal agencies.",
  },
  {
    question: "Can your group provide direct legal representation in court?",
    answer:
      "No. Texas Gateway Multi Services Group is a multi-service professional advisory firm. We are not a licensed law firm and do not provide direct legal advice or courtroom representation to the general public. All paralegal, research, and advisory services are performed in absolute support of, and coordination with, certified independent attorneys and state-licensed counselors.",
  },
  {
    question: "What bookkeeping and tax support services do you offer for small businesses?",
    answer:
      "Under Gate 5, we provide part-time bookkeeping, ledger reconciliation, payroll administration conforming to DOL wage regulations, and state and federal tax preparation (IRS Schedule C, Form 1120S, and Form 1065) designed specifically for small businesses, freelancers, and S-Corporations.",
  },
  {
    question: "How does Texas Gateway Multi Services Group secure sensitive personal, corporate, and payroll records?",
    answer:
      "We treat client privacy with high-grade security. All client records, passport credentials, corporate books, tax certificates, and wage documents are protected by premium AES-256 encryption at rest and secure transit protocols, fully complying with enterprise SOC2 safety standards.",
  },
];

const FAQ_DATA_AR: FAQItem[] = [
  {
    question: "هل مجموعة بوابة تكساس للخدمات المتعددة متصلة بقواعد بيانات وزارة العمل وإدارة الهجرة؟",
    answer:
      "نعم، تعمل مجموعة بوابة تكساس للخدمات المتعددة بالتوافق الكامل والمطابقة المباشرة مع قواعد البيانات الحكومية ذات الصلة، بما في ذلك جداول الأجور السائدة الصادرة عن وزارة العمل (DOL) وبوابات متابعة القضايا لخدمات الهجرة والمواطنة (USCIS).",
  },
  {
    question: "ما هي المستندات المؤهلة لخدمات الترجمة المعتمدة وتوثيق الأبوستيل؟",
    answer:
      "نقدم خدمات الترجمة والتصديق لجميع الوثائق الرسمية، بما في ذلك شهادات الأحوال المدنية (الميلاد، الزواج، الطلاق)، الأحكام القضائية، الشهادات والسجلات الأكاديمية، والوكالات الشرعية وعقود تأسيس الشركات. تشمل جميع أعمال الترجمة شهادة مطابقة مشفوعة بالقسم مقبولة لدى إدارة الهجرة والخارجية الأمريكية.",
  },
  {
    question: "هل تقدم المجموعة تمثيلاً قانونياً مباشراً أمام المحاكم؟",
    answer:
      "لا، مجموعة بوابة تكساس للخدمات المتعددة هي مكتب خدمات إدارية واستشارية مساندة. نحن لسنا شركة محاماة ولا نقدم تمثيلاً قضائياً أو استشارات قانونية مباشرة. يتم تقديم جميع خدمات المساعدة القانونية والبحوث بالتنسيق والتعاون الكامل مع محامين مستقلين مرخصين ومستشارين معتمدين.",
  },
  {
    question: "ما هي خدمات الدعم المالي والضريبي التي تقدمونها للشركات الصغيرة؟",
    answer:
      "من خلال البوابة الخامسة، نوفر مسك الدفاتر المحاسبية، ومطابقة القيود المالية، وإعداد كشوف المرتبات المتوافقة مع قوانين العمل، وتجهيز الإقرارات الضريبية السنوية والربع سنوية (النماذج الفيدرالية لشركات LLC وS-Corp والعمل الفردي) لتوفير رعاية مالية آمنة وموثوقة.",
  },
  {
    question: "كيف تحمي مجموعة بوابة تكساس للخدمات المتعددة الوثائق الحساسة والبيانات المالية؟",
    answer:
      "نولي خصوصية وأمن بياناتكم أهمية قصوى. يتم تشفير جميع السجلات الضريبية، الأجور، والوثائق الشخصية وجوازات السفر باستخدام خوارزميات التشفير الفائقة AES-256 أثناء النقل والحفظ بما يطابق أرقى معايير الأمان العالمية SOC2.",
  },
];

interface AccordionItemProps {
  key?: string;
  item: FAQItem;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
  isAr: boolean;
}

function AccordionItem({ item, isOpen, toggleOpen, index, isAr }: AccordionItemProps) {
  return (
    <div
      className="border-b border-black/10 py-5"
      id={`faq_accordion_item_${index}`}
    >
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between py-2 font-sans text-base md:text-lg font-medium text-[#2C2C2C] hover:text-[#B8922A] transition-colors select-none cursor-pointer group text-start /* RTL: mirrored */"
      >
        <span className="pr-4 pl-4 tracking-tight">{item.question}</span>
        <span className="p-1 px-1.5 rounded-lg border border-[#B8922A]/30 bg-[#B8922A]/10 text-[#B8922A] transition-colors group-hover:bg-[#B8922A] group-hover:text-white">
          {isOpen ? <Minus className="w-4 h-4 text-inherit" /> : <Plus className="w-4 h-4 text-inherit" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#2C2C2C]/75 leading-relaxed font-sans mt-3 ps-4 pe-8 /* RTL: mirrored */">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq({ lang }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";
  const faqData = isAr ? FAQ_DATA_AR : FAQ_DATA_EN;

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-[#F5F5F0] py-24 md:py-32 px-8 md:px-28 border-t border-black/10"
      id="faq_section"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-start /* RTL: mirrored */">
          
          {/* Left Column Description - span 4 */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-4">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B8922A] block" id="faq_sub">
              {t.faqSub}
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-[#2C2C2C] leading-tight" id="faq_title">
              {t.faqTitle}
            </h2>
            <p className="text-xs md:text-sm text-[#2C2C2C]/75 leading-relaxed font-sans">
              {t.faqDesc}
            </p>
            <div className="pt-4">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#B8922A] border border-[#B8922A]/20 hover:bg-[#a37f20] px-4 py-2 rounded-lg transition-all cursor-pointer focus:outline-none"
              >
                <span>{t.faqButton}</span>
              </button>
            </div>
          </div>

          {/* Right Column Accordions - span 8 */}
          <div className="lg:col-span-8 flex flex-col justify-center" id="faq_accordions_wrapper">
            {faqData.map((item, i) => (
              <AccordionItem
                key={item.question}
                index={i}
                item={item}
                isOpen={openIndex === i}
                toggleOpen={() => setOpenIndex(openIndex === i ? null : i)}
                isAr={isAr}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
