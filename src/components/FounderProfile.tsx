import { motion } from "motion/react";
import { Award, Mail, Phone, Linkedin, ShieldCheck, Star, ArrowLeft } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
  onBack?: () => void;
}

export default function FounderProfile({ lang, onBack }: Props) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";

  const credentials = [
    { title: t.founderExpert, desc: isAr ? "تحليل وتدقيق الشؤون الإجرائية والأنظمة والامتثال الكامل" : "Procedural analysis, regulations audit, and comprehensive compliance management" },
    { title: t.founderConsultant, desc: isAr ? "استشارات وحلول متكاملة للتأشيرات، الجنسية والإقامة الدائمة" : "Comprehensive solutions for visas, green cards, and citizenship pathways" },
    { title: t.founderResearcher, desc: isAr ? "دعم صياغة المذكرات القانونية ومراجعة السوابق القضائية والنصوص الفيدرالية" : "Legal briefing support, federal statute research, and citation review" },
    { title: t.founderManager, desc: isAr ? "التوجيه التنظيمي المباشر للبوابات الخدمية الخمسة للمجموعة" : "Direct supervisory guidance for the five multi-service Gates of the Group" }
  ];

  return (
    <section
      className="relative min-h-screen bg-[#F5F5F0] py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 border-t border-black/10 overflow-hidden"
      id="founder_profile_section"
    >
      {/* Background Soft Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8922A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Back Button and Navigation Path */}
        {onBack && (
          <div className="flex items-center mb-12 gap-2 text-sm text-[#2C2C2C]/70">
            <button 
              onClick={onBack}
              className="flex items-center gap-1.5 text-[#2C2C2C]/70 hover:text-[#B8922A] transition-colors cursor-pointer font-semibold bg-transparent border-none focus:outline-none"
              id="back_to_home_btn"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180 /* RTL: mirrored */" />
              <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
            </button>
            <span>/</span>
            <span className="text-[#B8922A] font-medium">{isAr ? "من نحن" : "About Us"}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B8922A] mb-3 block">
            {t.founderTitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-[#2C2C2C]">
            {t.founderSub}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#B8922A] text-[#B8922A]" />
            <Star className="w-3.5 h-3.5 fill-[#B8922A] text-[#B8922A]" />
            <Star className="w-3.5 h-3.5 fill-[#B8922A] text-[#B8922A]" />
          </div>
        </div>

        {/* Profile Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Portrait / Card - span 5 */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm rounded-3xl p-[3px] bg-gradient-to-b from-[#B8922A] via-[#B8922A]/20 to-transparent shadow-2xl overflow-hidden group"
            >
              {/* Gold light sweeps on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-[#B8922A]/5 to-transparent pointer-events-none rounded-3xl" />

              <div className="bg-white rounded-[21px] p-6 text-center space-y-6 relative overflow-hidden">
                {/* Photo frame with double gold circle */}
                <div className="relative w-48 h-48 mx-auto rounded-full p-[4px] bg-gradient-to-b from-[#B8922A] to-[#B8922A]/30 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#F5F5F0] relative">
                     <img
                       src="/assets/images/khaled abuzaher.jpg"
                       alt="Dr. Khaled M. Abu Zaher"
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       referrerPolicy="no-referrer"
                       onError={(e) => {
                         // Fallback placeholder in case photo is missing
                         (e.target as HTMLElement).style.display = "none";
                       }}
                     />
                    {/* Fallback avatar text */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white text-[#B8922A] font-sans font-bold text-4xl">
                      KAZ
                    </div>
                  </div>
                </div>

                {/* Name & Badge */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-[#2C2C2C] font-sans">
                    {isAr ? "د. خالد محمد أبو زاهر" : "Dr. Khaled M. Abu Zaher"}
                  </h3>
                  <span className="inline-block bg-[#B8922A]/10 border border-[#B8922A]/30 text-[#B8922A] rounded-full px-3 py-1 text-xs font-mono font-semibold tracking-wider">
                    {isAr ? "رئيس المجموعة ومؤسسها" : "Founder & CEO"}
                  </span>
                </div>

                {/* Direct Contact Icons Card */}
                <div className="border-t border-black/10 pt-6 space-y-3.5 text-start /* RTL: mirrored */ font-sans">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#B8922A]/10 flex items-center justify-center text-[#B8922A]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#2C2C2C]/50 block font-mono">{t.founderDirectLine}</span>
                      <a href="tel:+18324072608" className="text-sm font-semibold text-[#2C2C2C] hover:text-[#B8922A] transition-colors font-mono inline-block" dir="ltr">
                        +1 (832) 407-2608
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#B8922A]/10 flex items-center justify-center text-[#B8922A]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#2C2C2C]/50 block font-mono">{t.founderEmail}</span>
                      <a href="mailto:abuzaherkhaled@gmail.com" className="text-sm font-semibold text-[#2C2C2C] hover:text-[#B8922A] transition-colors font-mono">
                        abuzaherkhaled@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#B8922A]/10 flex items-center justify-center text-[#B8922A]">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#2C2C2C]/50 block font-mono">{t.founderLinkedin}</span>
                      <a href="https://www.linkedin.com/in/khaledabuzaher/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#2C2C2C] hover:text-[#B8922A] transition-colors break-all">
                        linkedin.com/in/khaledabuzaher
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Column 2: Details & Professional Qualifications - span 7 */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-[#B8922A]">
                {isAr ? "الرؤية والقيادة" : "Leadership & Vision"}
              </span>
              <p className="text-base sm:text-lg text-[#2C2C2C]/80 leading-relaxed font-sans font-normal">
                {t.founderBio}
              </p>
            </div>

            {/* List of 4 specialized credentials with timeline styled bars */}
            <div className="space-y-4">
              {credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-black/5 rounded-2xl flex gap-4 transition-all duration-300 hover:shadow-md hover:border-[#B8922A]/30"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#B8922A]/10 border border-[#B8922A]/20 flex items-center justify-center text-[#B8922A] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#2C2C2C] font-sans tracking-tight">
                      {cred.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#2C2C2C]/70 font-sans leading-relaxed">
                      {cred.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shield signature note */}
            <div className="bg-[#B8922A]/10 border border-[#B8922A]/20 px-4 py-3 rounded-xl flex items-center gap-2.5 text-xs text-[#2C2C2C]/85 max-w-xl">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
              <span>
                {isAr 
                  ? "نلتزم بتقديم أعلى مستويات الدعم والامتثال لجميع القضايا المهنية والشخصية." 
                  : "We are committed to delivering the highest level of administrative support and compliance for all professional and personal files."}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
