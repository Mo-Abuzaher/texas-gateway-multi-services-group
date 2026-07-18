import { useState } from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  Globe, 
  DollarSign, 
  ArrowRightLeft, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowLeft,
  CreditCard,
  Coins
} from "lucide-react";
import { TRANSLATIONS } from "../translations";

function ZelleLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <title>Zelle</title>
      <path d="M13.559 24h-2.841a.483.483 0 0 1-.483-.483v-2.765H5.638a.667.667 0 0 1-.666-.666v-2.234a.67.67 0 0 1 .142-.412l8.139-10.382h-7.25a.667.667 0 0 1-.667-.667V3.914c0-.367.299-.666.666-.666h4.23V.483c0-.266.217-.483.483-.483h2.841c.266 0 .483.217.483.483v2.765h4.323c.367 0 .666.299.666.666v2.137a.67.67 0 0 1-.141.41l-8.19 10.481h7.665c.367 0 .666.299.666.666v2.477a.667.667 0 0 1-.666.667h-4.32v2.765a.483.483 0 0 1-.483.483Z" />
    </svg>
  );
}

function BankLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="currentColor" 
      className={className}
    >
      <g>
        <path d="M162.969,480.609c-0.688-0.703-1.406-1.313-2.094-1.828c-0.719-0.5-1.75-1.125-3.094-1.813c5.641-3.141,8.469-7.969,8.469-14.5c0-2.875-0.5-5.469-1.5-7.781s-2.406-4.281-4.219-5.906c-1.828-1.625-4.063-2.891-6.688-3.781c-2.625-0.906-5.531-1.344-8.719-1.344h-27.469V512h28.625c3.188,0,6.094-0.469,8.688-1.391s4.781-2.234,6.625-3.938c1.813-1.703,3.203-3.734,4.156-6.141c0.969-2.406,1.453-5.109,1.453-8.125c0-2.422-0.328-4.594-1.016-6.516C165.516,483.969,164.438,482.219,162.969,480.609z M131,455.563h13.063c2.75,0,4.906,0.688,6.484,2.094c1.563,1.406,2.359,3.344,2.359,5.766c0,2.438-0.797,4.359-2.359,5.766c-1.578,1.406-3.734,2.109-6.484,2.109H131V455.563z M151.453,497.844c-1.609,1.5-3.766,2.25-6.516,2.25H131v-16.797h13.938c2.75,0,4.906,0.734,6.516,2.203s2.391,3.531,2.391,6.156S153.063,496.344,151.453,497.844z"/>
        <path d="M207.813,443.656L182.938,512h13.922L201,499.906h24.281L229.313,512h13.906l-24.953-68.344H207.813z M204.734,488.672l8.641-24.859l8.344,24.859H204.734z"/>
        <polygon points="300.25,485.5 273.188,443.656 261.281,443.656 261.281,512 274.625,512 274.625,470.047 301.688,512 313.594,512 313.594,443.656 300.25,443.656"/>
        <polygon points="392.703,443.656 376.469,443.656 352.375,473.406 352.375,443.656 339.031,443.656 339.031,512 352.375,512 352.375,491.453 361.219,480.906 378.781,512 394.344,512 370.047,470.813"/>
        <polygon points="256,0 64,69.344 64,109.344 80,109.344 80,121.344 432,121.344 432,109.344 448,109.344 448,69.344"/>
        <polygon points="432,357.344 80,357.344 80,389.344 64,389.344 64,421.344 448,421.344 448,389.344 432,389.344"/>
        <polygon points="344,325.344 344,341.344 408,341.344 408,325.344 400,325.344 400,153.344 408,153.344 408,137.344 344,137.344 344,153.344 352,153.344 352,325.344"/>
        <polygon points="224,325.344 224,341.344 288,341.344 288,325.344 280,325.344 280,153.344 288,153.344 288,137.344 224,137.344 224,153.344 232,153.344 232,325.344"/>
        <polygon points="104,325.344 104,341.344 168,341.344 168,325.344 160,325.344 160,153.344 168,153.344 168,137.344 104,137.344 104,153.344 112,153.344 112,325.344"/>
      </g>
    </svg>
  );
}

function PaypalLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <title>PayPal</title>
      <path d="M7.016 19.198h-4.2a.562.562 0 0 1-.555-.65L5.093.584A.692.692 0 0 1 5.776 0h7.222c3.417 0 5.904 2.488 5.846 5.5-.006.25-.027.5-.066.747A6.794 6.794 0 0 1 12.071 12H8.743a.69.69 0 0 0-.682.583l-.325 2.056-.013.083-.692 4.39-.015.087zM19.79 6.142c-.01.087-.01.175-.023.261a7.76 7.76 0 0 1-7.695 6.598H9.007l-.283 1.795-.013.083-.692 4.39-.134.843-.014.088H6.86l-.497 3.15a.562.562 0 0 0 .555.65h3.612c.34 0 .63-.249.683-.585l.952-6.031a.692.692 0 0 1 .683-.584h2.126a6.793 6.793 0 0 0 6.707-5.752c.306-1.95-.466-3.744-1.89-4.906z"/>
    </svg>
  );
}

function WesternUnionLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <title>Western Union</title>
      <path d="M15.799 5.188h5.916L24 9.155l-4.643 8.043c-1.246 2.153-3.28 2.153-4.526 0L7.893 5.188h5.919l4.273 7.39a1.127 1.127 0 0 0 1.981.002l-4.267-7.392ZM0 5.188h5.921l6.237 10.802-.697 1.204c-1.246 2.153-3.285 2.153-4.531 0L0 5.188Z" />
    </svg>
  );
}

interface Props {
  lang: "en" | "ar";
  onBack: () => void;
}

export default function PaymentMethods({ lang, onBack }: Props) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const localMethods = [
    {
      id: "zelle",
      name: t.paymentsZelleName,
      desc: t.paymentsZelleDesc,
      icon: ZelleLogo,
      color: "from-purple-500/20 to-indigo-500/20",
      accent: "text-purple-400 border-purple-500/30",
      details: [
        { label: isAr ? "البريد الإلكتروني للـ Zelle" : "Zelle Email Address", value: "abuzaherkhaled@gmail.com" },
        { label: isAr ? "رقم الهاتف للـ Zelle" : "Zelle Registered Phone", value: "+1 (832) 407-2608" },
        { label: isAr ? "اسم الحساب" : "Account Name", value: "Khaled M. Abu Zaher" }
      ]
    },
    {
      id: "bank",
      name: t.paymentsBankName,
      desc: t.paymentsBankDesc,
      icon: BankLogo,
      color: "from-amber-500/20 to-orange-500/20",
      accent: "text-amber-400 border-amber-500/30",
      details: [
        { label: isAr ? "اسم البنك" : "Bank Name", value: "Bank of America" },
        { label: isAr ? "رقم التوجيه (ACH)" : "Routing Number (ACH)", value: "111000025" },
        { label: isAr ? "رقم التوجيه (Wire)" : "Routing Number (Wire)", value: "026009593" },
        { label: isAr ? "رقم الحساب" : "Account Number", value: "488099906672" },
        { label: isAr ? "اسم الحساب" : "Account Name", value: "Khaled M. Abu Zaher" }
      ]
    }
  ];

  const intlMethods = [
    {
      id: "wu",
      name: t.paymentsWuName,
      desc: t.paymentsWuDesc,
      icon: WesternUnionLogo,
      color: "from-yellow-500/20 to-amber-500/20",
      accent: "text-yellow-400 border-yellow-500/30",
      details: [
        { label: isAr ? "الاسم الكامل للمستلم" : "Receiver Full Name", value: "Khaled M. Abu Zaher" },
        { label: isAr ? "المدينة / ولاية" : "City / State", value: "Pearland, Texas" },
        { label: isAr ? "البلد" : "Country", value: "United States of America" },
        { label: isAr ? "ملاحظة هامة" : "Important Note", value: isAr ? "يرجى توجيه الحوالة بالدولار الأمريكي" : "Please direct remittance in US Dollars (USD)" }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-12 text-[#F5F5F0]"
      id="payment_methods_page"
    >
      {/* Back Button and Navigation Path */}
      <div className="flex items-center mb-8 gap-2 text-sm text-[#F5F5F0]/70">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#F5F5F0]/70 hover:text-[#B8922A] transition-colors cursor-pointer font-semibold bg-transparent border-none focus:outline-none p-0"
          id="payment_back_btn"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
        </button>
        <span>/</span>
        <span className="text-[#B8922A] font-medium">{isAr ? "طرق الدفع" : "Payment Methods"}</span>
      </div>

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-16" id="payment_header">
        <span className="text-[#B8922A] text-xs font-bold font-mono tracking-widest uppercase block mb-3">
          {t.paymentsSub}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold text-white tracking-tight mb-6">
          {t.paymentsTitle}
        </h1>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans">
          {t.paymentsDesc}
        </p>
      </div>

      {/* Grid containing Local & International Payment Methods */}
      <div className="space-y-16">
        
        {/* Section 1: Local / National Payments */}
        <section className="space-y-8" id="local_payments_section">
          <div className={`border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 ${isAr ? "text-right" : "text-left"}`}>
            <div>
              <h2 className="text-2xl font-semibold font-sans text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                {t.paymentsLocalTitle}
              </h2>
              <p className="text-sm text-white/70 mt-1 font-sans">{t.paymentsLocalDesc}</p>
            </div>
            <span className="text-xs font-mono bg-white/5 border border-white/10 rounded px-2.5 py-1 text-[#B8922A] w-fit">
              {isAr ? "تحويلات محلية سريعة" : "Domestic Transfers"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div 
                  key={method.id}
                  className="bg-black/30 border border-white/10 hover:border-[#B8922A]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Method Icon and Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center border border-white/10`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white/80 uppercase">
                        {method.id}
                      </span>
                    </div>

                    {/* Method Text */}
                    <h3 className="text-lg font-bold text-white mb-2 font-sans">{method.name}</h3>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans mb-6">{method.desc}</p>
                  </div>

                  {/* Copyable Details */}
                  <div className="space-y-3 pt-4 border-t border-white/5 font-mono text-xs">
                    {method.details.map((detail, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5 p-2 bg-white/5 rounded-lg group/item transition-colors hover:bg-white/10">
                        <span className="text-[10px] text-white/50">{detail.label}</span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white/95 font-medium select-all break-all" dir="ltr">{detail.value}</span>
                          {!detail.value.includes("Please") && (
                            <button
                              onClick={() => handleCopy(detail.value, `${method.id}-${idx}`)}
                              className="text-white/60 hover:text-[#B8922A] transition-colors p-1 cursor-pointer bg-transparent border-none focus:outline-none"
                              title="Copy details"
                            >
                              {copiedText === `${method.id}-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: International Payments */}
        <section className="space-y-8" id="international_payments_section">
          <div className={`border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 ${isAr ? "text-right" : "text-left"}`}>
            <div>
              <h2 className="text-2xl font-semibold font-sans text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                {t.paymentsIntlTitle}
              </h2>
              <p className="text-sm text-white/70 mt-1 font-sans">{t.paymentsIntlDesc}</p>
            </div>
            <span className="text-xs font-mono bg-white/5 border border-white/10 rounded px-2.5 py-1 text-[#B8922A] w-fit">
              {isAr ? "تحويلات دولية عابرة للحدود" : "Cross-Border Remittances"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {intlMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div 
                  key={method.id}
                  className="bg-black/30 border border-white/10 hover:border-[#B8922A]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Method Icon and Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center border border-white/10`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white/80 uppercase">
                        {method.id}
                      </span>
                    </div>

                    {/* Method Text */}
                    <h3 className="text-lg font-bold text-white mb-2 font-sans">{method.name}</h3>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans mb-6">{method.desc}</p>
                  </div>

                  {/* Copyable Details */}
                  <div className="space-y-3 pt-4 border-t border-white/5 font-mono text-xs">
                    {method.details.map((detail, idx) => {
                      const isWarning = detail.label === "Important Note" || detail.label === "ملاحظة هامة";
                      return (
                        <div 
                          key={idx} 
                          className={`flex flex-col gap-1.5 p-2 rounded-lg transition-colors ${
                            isWarning 
                              ? "bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15" 
                              : "bg-white/5 hover:bg-white/10 group/item"
                          }`}
                        >
                          <span className={`text-[10px] ${isWarning ? "text-amber-400 font-bold" : "text-white/50"}`}>{detail.label}</span>
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-medium break-all ${isWarning ? "text-amber-300" : "text-white/95 select-all"}`} dir={isWarning && lang === "ar" ? "rtl" : "ltr"}>{detail.value}</span>
                            {!isWarning && (
                              <button
                                onClick={() => handleCopy(detail.value, `${method.id}-${idx}`)}
                                className="text-white/60 hover:text-[#B8922A] transition-colors p-1 cursor-pointer bg-transparent border-none focus:outline-none"
                                title="Copy details"
                              >
                                {copiedText === `${method.id}-${idx}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Verification & Secure payment advisory callout */}
            <div className="bg-[#B8922A]/10 border border-[#B8922A]/20 rounded-2xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#B8922A]/20 flex items-center justify-center text-[#B8922A]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">{isAr ? "ضمانات الدفع والامتثال" : "Secure Payment & Compliance"}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  {isAr 
                    ? "تلتزم مجموعة بوابة تكساس بأعلى معايير الحماية والأمان المالي. جميع الحوالات والمعاملات المالية يتم تدقيقها ومطابقتها مع الفواتير الرسمية المصنفة لتأكيد السلامة الضريبية والقانونية."
                    : "Texas Gateway Multi Services Group complies with all standard financial regulations and commercial guidelines. Every payment is cross-referenced with your official invoices to ensure absolute compliance and proper accounting recording."
                  }
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="text-[10px] font-mono font-bold text-[#B8922A] uppercase tracking-widest mb-1.5">{isAr ? "تحقق فوري من الحوالة" : "Instant Verification"}</div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {isAr 
                    ? "يتم مراجعة الدفعات وتحديث حالتها في صندوق الوارد الإداري الخاص بالعميل خلال فترة تتراوح بين ساعة إلى ساعتين كحد أقصى."
                    : "We verify payments and issue official receipts in under 1-2 hours upon sending the receipt to our advisory consultants."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Memo & Guidelines Callout */}
        <section className="bg-gradient-to-r from-blue-900/30 to-black/30 border border-white/10 rounded-2xl p-6 sm:p-8" id="memo_callout">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-[#B8922A] shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-sans">
                {isAr ? "تعليمات إتمام عملية الدفع" : "Instructions for Payment Confirmation"}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {t.paymentsInstruction}
              </p>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
