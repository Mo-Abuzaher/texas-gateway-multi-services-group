import React, { useState } from "react";
import { Scale, Mail, ShieldAlert, ArrowRight, ShieldCheck, Instagram, Facebook, Linkedin } from "lucide-react";
import InquiryInbox from "./InquiryInbox";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
  preselectedSector?: string;
  onNavigateToTerms?: () => void;
}

export default function FooterCta({ lang, preselectedSector, onNavigateToTerms }: Props) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";

  // Consultation form states
  const [formData, setFormData] = useState({
    fullName: "",
    firmEmail: "",
    serviceSector: "US Visas & Immigration",
    notes: "",
  });

  const [errors, setErrors] = useState<{ fullName?: string; firmEmail?: string; notes?: string }>({});

  React.useEffect(() => {
    if (preselectedSector) {
      setFormData((prev) => ({ ...prev, serviceSector: preselectedSector }));
    }
  }, [preselectedSector]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; firmEmail?: string; notes?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isAr ? "يرجى كتابة الاسم الكامل." : "Please specify your Full Name.";
    }
    
    if (!formData.firmEmail.trim()) {
      newErrors.firmEmail = isAr ? "يرجى كتابة البريد الإلكتروني للعمل." : "Please specify your Firm/Company Email.";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.firmEmail.trim())) {
        newErrors.firmEmail = isAr 
          ? "يرجى إدخال بريد إلكتروني كامل وصالح." 
          : "Please enter a complete and valid email address.";
      }
    }

    if (formData.serviceSector === "Other" && !formData.notes.trim()) {
      newErrors.notes = isAr 
        ? "يرجى كتابة كيف يمكننا مساعدتك." 
        : "Please specify how we can help you.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submit failed");
      }

      const result = await response.json();
      setIsSubmitted(true);
    } catch (err) {
      console.error("Transmission failed:", err);
      alert(isAr ? "حدث خطأ أثناء إرسال طلبكم. يرجى المحاولة لاحقاً." : "Consultation submit encountered an issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="relative bg-[#1B2C6B] pt-24 pb-12 px-8 md:px-28 border-t border-white/15 overflow-hidden"
      id="footer_section"
    >
      {/* Background visual bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-white/10 to-transparent blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10" id="contact">
        {/* Main CTA Section Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/15 ${isAr ? "text-right" : "text-left"}`}>
          
          {/* Left Column Information - span 6 */}
          <div className="lg:col-span-12 xl:col-span-6 space-y-8 flex flex-col justify-center">
            <div>
              <span className={`text-[11px] font-mono tracking-[0.2em] text-[#B8922A] uppercase block mb-3 ${isAr ? "text-right" : "text-left"}`}>
                {t.contactSub}
              </span>
              <h2 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-white mb-4 leading-tight">
                {t.contactTitle}
              </h2>
              <p className="text-base text-[#F5F5F0]/85 font-sans leading-relaxed">
                {t.contactDesc}
              </p>
            </div>

            <div className="space-y-4">
              <div className={`flex items-start gap-3 ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
                <ShieldCheck className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-white block">{t.contactWageReview}</span>
                  <span className="text-xs text-[#F5F5F0]/70">{t.contactWageDesc}</span>
                </div>
              </div>

              <div className={`flex items-start gap-3 ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
                <div className="w-5 h-5 bg-white/15 rounded border border-white/25 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[10px] font-mono font-bold text-white">24</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">{t.contactTurnaround}</span>
                  <span className="text-xs text-[#F5F5F0]/70">{t.contactTurnaroundDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Consultation form - span 6 */}
          <div className="lg:col-span-12 xl:col-span-6" id="footer_form_container">
            <div className="bg-[#F5F5F0] border border-black/10 p-8 rounded-2xl md:rounded-3xl shadow-2xl relative text-start /* RTL: mirrored */">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#2C2C2C]/50 block mb-3 pb-3 border-b border-black/5 text-start /* RTL: mirrored */">
                {t.contactFormHeader}
              </span>

              {isSubmitted ? (
                <div className="text-center py-12 space-y-4" id="form_success_card">
                  <div className="w-16 h-16 bg-[#1B2C6B]/5 border border-[#1B2C6B]/15 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xl">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] tracking-tight">{t.contactFormSuccessTitle}</h3>
                  <p className="text-xs text-[#2C2C2C]/85 max-w-sm mx-auto leading-relaxed">
                    {t.contactFormSuccessDesc}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: "", firmEmail: "", serviceSector: "US Visas & Immigration", notes: "" });
                    }}
                    className="text-xs text-[#B8922A] hover:text-[#a37f20] underline font-mono select-none mt-4 cursor-pointer bg-transparent border-none focus:outline-none"
                  >
                    {t.contactFormReset}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5" id="consultation_form">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-[#2C2C2C]/60 block text-start /* RTL: mirrored */">
                      {t.contactLabelName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? "مثال: أحمد علي" : "e.g. Ahmed Ali"}
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      className="w-full bg-white border border-[#2C2C2C]/25 rounded-lg px-4 py-2.5 text-sm text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:outline-[#B8922A] font-sans text-start /* RTL: mirrored */"
                    />
                    {errors.fullName && (
                      <p className="text-rose-600 text-xs font-semibold mt-1 flex items-center gap-1 text-start">
                        <span>⚠️</span> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-[#2C2C2C]/60 block text-start /* RTL: mirrored */">
                      {t.contactLabelEmail}
                    </label>
                    <input
                      type="email"
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title={isAr ? "مثال: name@comp.com" : "e.g. name@comp.com"}
                      placeholder="e.g. ahmed.ali@example.com"
                      value={formData.firmEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, firmEmail: e.target.value });
                        if (errors.firmEmail) setErrors((prev) => ({ ...prev, firmEmail: undefined }));
                      }}
                      className="w-full bg-white border border-[#2C2C2C]/25 rounded-lg px-4 py-2.5 text-sm text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:outline-[#B8922A] font-sans text-start /* RTL: mirrored */"
                    />
                    {errors.firmEmail && (
                      <p className="text-rose-600 text-xs font-semibold mt-1 flex items-center gap-1 text-start">
                        <span>⚠️</span> {errors.firmEmail}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-[#2C2C2C]/60 block text-start /* RTL: mirrored */">
                      {t.contactLabelSector}
                    </label>
                     <select
                      value={formData.serviceSector}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceSector: e.target.value });
                        // If selecting something other than 'Other', clear notes errors
                        if (e.target.value !== "Other" && errors.notes) {
                          setErrors((prev) => ({ ...prev, notes: undefined }));
                        }
                      }}
                      className="w-full bg-white border border-[#2C2C2C]/25 rounded-lg px-4 py-2.5 text-sm text-[#2C2C2C] focus:outline-[#B8922A] font-sans text-start /* RTL: mirrored */"
                      id="contact_sector_select"
                    >
                      {preselectedSector && (
                        <option className="bg-white" value={preselectedSector}>
                          {preselectedSector}
                        </option>
                      )}
                      <option className="bg-white" value="Visas & Immigration Services">
                        {isAr ? "خدمات التأشيرات والهجرة" : "Visas & Immigration Services"}
                      </option>
                      <option className="bg-white" value="Translation & Language Solutions">
                        {isAr ? "الترجمة والحلول اللغوية" : "Translation & Language Solutions"}
                      </option>
                      <option className="bg-white" value="Notary & Apostille / Attestation Services">
                        {isAr ? "خدمات التوثيق والأبوستيل" : "Notary & Apostille / Attestation Services"}
                      </option>
                      <option className="bg-white" value="Legal Services">
                        {isAr ? "الخدمات القانونية" : "Legal Services"}
                      </option>
                      <option className="bg-white" value="Financial Services">
                        {isAr ? "الخدمات المالية" : "Financial Services"}
                      </option>
                      <option className="bg-white" value="Other">
                        {isAr ? "أخرى / غير ذلك" : "Other"}
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-[#2C2C2C]/60 block text-start /* RTL: mirrored */">
                      {formData.serviceSector === "Other"
                        ? (isAr ? "كيف يمكننا مساعدتك؟ (مطلوب)" : "How Can We Help You? (Required)")
                        : t.contactLabelHelp}
                    </label>
                    <textarea
                      rows={3}
                      required={formData.serviceSector === "Other"}
                      placeholder={isAr ? "مثال: أحتاج المساعدة في تسيير تأشيرة كفاءات عمل أو متابعة لم شمل الأسرة..." : "e.g. I need assistance with an H-1B worker petition or family-based green card processing..."}
                      value={formData.notes}
                      onChange={(e) => {
                        setFormData({ ...formData, notes: e.target.value });
                        if (errors.notes) setErrors((prev) => ({ ...prev, notes: undefined }));
                      }}
                      className="w-full bg-white border border-[#2C2C2C]/25 rounded-lg px-4 py-2.5 text-sm text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:outline-[#B8922A] font-sans resize-none text-start /* RTL: mirrored */"
                    />
                    {errors.notes && (
                      <p className="text-rose-600 text-xs font-semibold mt-1 flex items-center gap-1 text-start">
                        <span>⚠️</span> {errors.notes}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#B8922A] text-white font-semibold text-sm py-3.5 rounded-lg select-none cursor-pointer hover:bg-[#a37f20] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>{loading ? (isAr ? "جاري الإرسال..." : "Submitting Inquiry...") : t.contactFormSubmit}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 /* RTL: mirrored */" />
                  </button>
                </form>
              )}

              <div className={`mt-6 pt-4 border-t border-black/5 flex justify-between items-center text-[10px] ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <span className="font-mono text-[#2C2C2C]/40 flex items-center gap-1">
                  🔒 SSL Secured Gateway
                </span>
                <button
                  type="button"
                  onClick={() => setIsInboxOpen(true)}
                  className="font-mono font-bold text-[#1B2C6B] hover:text-[#B8922A] flex items-center gap-1 transition-colors select-none cursor-pointer bg-transparent border-none focus:outline-none"
                >
                  📁 {t.contactAdminInbox}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Copyright Matrix */}
        <div className={`pt-12 flex flex-col md:flex-row justify-between items-center gap-6 ${isAr ? "flex-row-reverse" : "flex-row"}`} id="footer_brand_row">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {isAr ? "مجموعة بوابة تكساس للخدمات المتعددة" : "TEXAS GATEWAY MULTI SERVICES GROUP"}
              </span>
              <span className="text-[10px] font-mono text-[#F5F5F0]/75 bg-white/10 border border-white/20 px-2 py-0.5 rounded">
                EST. 2026
              </span>
            </div>

            {/* Social Icons Container */}
            <div className="social-container flex justify-center md:justify-start">
              <ul className="social-icons flex items-center gap-2.5 m-0 p-0 list-none">
                <li className="relative">
                  <a
                    href="https://www.instagram.com/khaled.m.abuzaher/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-[36px] h-[36px] select-none cursor-pointer rounded-full"
                    title="Instagram"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E5C158] to-[#B8922A] transition-all duration-[265ms] ease-out group-hover:scale-0 group-hover:ease-in" />
                    <Instagram className="w-4 h-4 text-white relative z-10 transition-all duration-[265ms] ease-out group-hover:scale-[1.15] group-hover:text-[#B8922A] group-hover:ease-in" />
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="https://www.facebook.com/profile.php?id=61562957950735"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-[36px] h-[36px] select-none cursor-pointer rounded-full"
                    title="Facebook"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E5C158] to-[#B8922A] transition-all duration-[265ms] ease-out group-hover:scale-0 group-hover:ease-in" />
                    <Facebook className="w-4 h-4 text-white relative z-10 transition-all duration-[265ms] ease-out group-hover:scale-[1.15] group-hover:text-[#B8922A] group-hover:ease-in" />
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="https://www.linkedin.com/in/khaledabuzaher/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-[36px] h-[36px] select-none cursor-pointer rounded-full"
                    title="LinkedIn"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E5C158] to-[#B8922A] transition-all duration-[265ms] ease-out group-hover:scale-0 group-hover:ease-in" />
                    <Linkedin className="w-4 h-4 text-white relative z-10 transition-all duration-[265ms] ease-out group-hover:scale-[1.15] group-hover:text-[#B8922A] group-hover:ease-in" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick legal list */}
          <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#F5F5F0]/70 ${isAr ? "flex-row-reverse" : "flex-row"}`} id="footer_legal_links">
            <a href="https://flag.dol.gov/programs/prevailingwages" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8922A] transition-colors">DOL Prevailing Wages</a>
            <a href="https://www.dol.gov/agencies/oalj/contacts/BALCA" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8922A] transition-colors">BALCA Appeals Support</a>
            <a href="https://www.uscis.gov/policy-manual" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8922A] transition-colors">USCIS Policy Guidelines</a>
            <button 
              type="button" 
              onClick={onNavigateToTerms}
              className="hover:text-[#B8922A] transition-colors font-mono bg-transparent border-none cursor-pointer focus:outline-none text-xs text-[#F5F5F0]/70 select-none"
            >
              Privacy & Policies
            </button>
          </div>

          <span className="text-[11px] font-mono text-[#F5F5F0]/65 text-center">
            {isAr ? "© 2026 مجموعة بوابة تكساس للخدمات المتعددة. جميع الحقوق محفوظة." : "© 2026 Texas Gateway Multi Services Group. All rights reserved."}
          </span>
        </div>
      </div>

      <InquiryInbox isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
    </footer>
  );
}
