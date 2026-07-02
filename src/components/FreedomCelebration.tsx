import { motion } from "motion/react";
import { Award, Star } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
}

export default function FreedomCelebration({ lang }: Props) {
  const t = TRANSLATIONS[lang];

  return (
    <section
      className="relative bg-gradient-to-br from-[#101F4C] via-[#1B2C6B] to-[#0A1333] py-20 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 border-t border-[#B8922A]/30 overflow-hidden"
      id="freedom_celebration"
    >
      {/* Background stars / fireworks simulated sparkles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-red-400 rounded-full animate-ping" style={{ animationDuration: "5s" }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute top-3/4 right-1/3 w-2.5 h-2.5 bg-white rounded-full animate-ping" style={{ animationDuration: "6s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="border-[3px] border-double border-[#B8922A] p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-md shadow-2xl relative">
          
          {/* Gold Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 text-[#B8922A] opacity-60 flex gap-1">
            <Star className="w-4 h-4 fill-[#B8922A]" />
            <Star className="w-2.5 h-2.5 fill-[#B8922A]" />
          </div>
          <div className="absolute top-4 right-4 text-[#B8922A] opacity-60 flex gap-1 flex-row-reverse">
            <Star className="w-4 h-4 fill-[#B8922A]" />
            <Star className="w-2.5 h-2.5 fill-[#B8922A]" />
          </div>
          <div className="absolute bottom-4 left-4 text-[#B8922A] opacity-60 flex gap-1 items-end">
            <Star className="w-4 h-4 fill-[#B8922A]" />
            <Star className="w-2.5 h-2.5 fill-[#B8922A]" />
          </div>
          <div className="absolute bottom-4 right-4 text-[#B8922A] opacity-60 flex gap-1 items-end flex-row-reverse">
            <Star className="w-4 h-4 fill-[#B8922A]" />
            <Star className="w-2.5 h-2.5 fill-[#B8922A]" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Visual Medallion Column */}
            <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-fit">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#B8922A] border-dashed flex items-center justify-center p-2 bg-gradient-to-tr from-[#6B1A1A] to-[#B8922A] relative shadow-2xl"
              >
                <div className="w-full h-full rounded-full bg-[#1B2C6B] flex flex-col items-center justify-center text-center p-3 relative">
                  <span className="text-[10px] font-mono tracking-widest text-[#B8922A] font-bold">AMERICA</span>
                  <span className="text-3xl md:text-4xl font-mono font-black text-white">250</span>
                  <span className="text-[9px] font-semibold text-white/80">1776 - 2026</span>
                </div>
              </motion.div>
              <div className="mt-4 flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#B8922A] text-[#B8922A]" />
                <Star className="w-4.5 h-4.5 fill-[#B8922A] text-[#B8922A]" />
                <Star className="w-5 h-5 fill-[#B8922A] text-[#B8922A]" />
                <Star className="w-4.5 h-4.5 fill-[#B8922A] text-[#B8922A]" />
                <Star className="w-3 h-3 fill-[#B8922A] text-[#B8922A]" />
              </div>
            </div>

            {/* Explanatory Texts Column */}
            <div className="flex-1 text-center lg:text-start space-y-6">
              <div>
                <span className="bg-[#6B1A1A] text-white border border-[#B8922A]/40 rounded-full px-4 py-1 text-xs font-mono uppercase tracking-wider mb-3 inline-block">
                  {t.freedomTitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-sans font-semibold tracking-tight text-white mt-1">
                  {t.freedomSub}
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-base text-[#F5F5F0]/90 leading-relaxed font-sans max-w-3xl">
                  {t.freedomText}
                </p>
                <p className="text-sm text-[#B8922A] font-sans font-medium italic">
                  {t.freedomCongrats}
                </p>
              </div>

              {/* Patriotic Color Stripes decoration */}
              <div className="flex items-center gap-1.5 justify-center lg:justify-start pt-2">
                <span className="w-12 h-1 bg-red-600 rounded-full" />
                <span className="w-12 h-1 bg-white rounded-full" />
                <span className="w-12 h-1 bg-blue-600 rounded-full" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
