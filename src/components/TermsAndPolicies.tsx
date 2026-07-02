import { Lock, RefreshCw, ShieldCheck, Handshake, Scale, Gavel, FileText, Phone, Mail, ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
  onBack: () => void;
}

export default function TermsAndPolicies({ lang, onBack }: Props) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";

  const policies = [
    {
      id: 1,
      title: t.termsPrivacyLabel,
      text: t.termsPrivacyText,
      icon: Lock,
      color: "from-blue-500/10 to-blue-600/5 hover:border-blue-500/30",
      iconColor: "text-blue-400 bg-blue-500/10",
    },
    {
      id: 2,
      title: t.termsRefundLabel,
      text: t.termsRefundText,
      icon: RefreshCw,
      color: "from-amber-500/10 to-amber-600/5 hover:border-amber-500/30",
      iconColor: "text-amber-400 bg-amber-500/10",
    },
    {
      id: 3,
      title: t.termsConfidentialityLabel,
      text: t.termsConfidentialityText,
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-emerald-600/5 hover:border-emerald-500/30",
      iconColor: "text-emerald-400 bg-emerald-500/10",
    },
    {
      id: 4,
      title: t.termsServiceLabel,
      text: t.termsServiceText,
      icon: Handshake,
      color: "from-purple-500/10 to-purple-600/5 hover:border-purple-500/30",
      iconColor: "text-purple-400 bg-purple-500/10",
    },
    {
      id: 5,
      title: t.termsLiabilityLabel,
      text: t.termsLiabilityText,
      icon: Scale,
      color: "from-sky-500/10 to-sky-600/5 hover:border-sky-500/30",
      iconColor: "text-sky-400 bg-sky-500/10",
    },
    {
      id: 6,
      title: t.termsNoAdviceLabel,
      text: t.termsNoAdviceText,
      icon: Gavel,
      color: "from-rose-500/10 to-rose-600/5 hover:border-rose-500/30",
      iconColor: "text-rose-400 bg-rose-500/10",
    },
  ];

  return (
    <div className="w-full py-24 bg-[#1B2C6B] min-h-screen relative" id="terms_policies_page">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,146,42,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-sm font-semibold text-[#B8922A] hover:text-[#a37f20] transition-colors mb-8 cursor-pointer bg-transparent border-none p-0 focus:outline-none ${isAr ? "flex-row-reverse" : ""}`}
          id="terms_back_btn"
        >
          <ArrowLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
          <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
        </button>

        {/* Header Header Brand */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 rounded-full border border-[#B8922A]/30 bg-[#B8922A]/5 mb-4">
            <ShieldAlert className="w-8 h-8 text-[#B8922A]" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white mb-3 uppercase bg-gradient-to-r from-white via-[#F5F5F0] to-[#B8922A] bg-clip-text text-transparent">
            {t.termsTitle}
          </h1>

          <div className="flex justify-center items-center gap-3 text-[#B8922A] mb-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#B8922A]"></span>
            <div className="flex gap-1.5 text-xs">
              <span className="text-[#B8922A]">★</span>
              <span className="text-[#B8922A]">★</span>
              <span className="text-[#B8922A]">★</span>
            </div>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#B8922A]"></span>
          </div>

          <p className="text-sm font-semibold tracking-wider text-[#B8922A] font-mono uppercase mb-4">
            {t.termsSub}
          </p>

          <p className="max-w-2xl mx-auto text-white/70 text-sm leading-relaxed">
            {t.termsIntro}
          </p>
        </div>

        {/* 2x3 Grid of Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" id="terms_grid">
          {policies.map((policy) => {
            const IconComponent = policy.icon;
            return (
              <div
                key={policy.id}
                className={`p-6 rounded-xl border border-white/10 bg-gradient-to-b ${policy.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#B8922A]/5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-sans font-bold text-white tracking-tight">
                      {policy.title}
                    </h3>
                    <div className={`p-2 rounded-lg ${policy.iconColor}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Decorative stars under title */}
                  <div className="flex gap-1 mb-4">
                    <span className="text-[10px] text-[#B8922A]">★</span>
                    <span className="text-[10px] text-[#B8922A]">★</span>
                    <span className="text-[10px] text-[#B8922A]">★</span>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {policy.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Electronic Notice Block */}
        <div className="p-6 rounded-xl border border-[#B8922A]/30 bg-[#B8922A]/5 mb-16 relative overflow-hidden" id="electronic_notice_block">
          {/* Subtle logo bg */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8922A]/2 rounded-full blur-3xl -z-10" />
          
          <div className={`flex flex-col sm:flex-row gap-5 items-center ${isAr ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
            <div className="p-3 bg-[#B8922A]/10 rounded-lg shrink-0">
              <FileText className="w-8 h-8 text-[#B8922A]" />
            </div>
            <div className={`text-center sm:text-start ${isAr ? "sm:text-end" : "sm:text-start"}`}>
              <h4 className="text-sm font-mono font-bold tracking-wider text-[#B8922A] uppercase mb-1.5">
                {isAr ? "✦ إشعار الوثيقة الإلكترونية ✦" : "✦ ELECTRONIC DOCUMENT NOTICE ✦"}
              </h4>
              <p className="text-white/85 text-xs leading-relaxed max-w-4xl">
                {t.termsElectronicNoticeText}
              </p>
            </div>
          </div>
        </div>

        {/* Footer info blocks as shown in the picture */}
        <div className="border-t border-[#B8922A]/20 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-start">
            
            {/* Phone */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B8922A]" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-white/50 uppercase">
                  {isAr ? "الهاتف" : "PHONE"}
                </span>
              </div>
              <a href="tel:+18324072608" className="text-[#B8922A] hover:underline font-semibold font-mono text-sm" dir="ltr">
                +1 (832) 407-2608
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B8922A]" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-white/50 uppercase">
                  {isAr ? "البريد الإلكتروني" : "EMAIL"}
                </span>
              </div>
              <a href="mailto:abuzaherkhaled@gmail.com" className="text-white/90 hover:text-[#B8922A] font-semibold text-sm transition-colors">
                abuzaherkhaled@gmail.com
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
