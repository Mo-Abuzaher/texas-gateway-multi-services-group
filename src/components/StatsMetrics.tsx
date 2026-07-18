import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TRANSLATIONS } from "../translations";

interface Props {
  lang: "en" | "ar";
}

function CountUpNumber({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1500; // 1.5 seconds is punchy and smooth
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatsMetrics({ lang }: Props) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === "ar";

  return (
    <section
      className="relative bg-[#F5F5F0] py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 border-t border-black/10 overflow-hidden"
      id="stats_metrics_section"
    >
      {/* Background soft lighting */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#B8922A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-16">
        <div className="space-y-6">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B8922A] block" id="stats_sub">
            {t.statsSub || (isAr ? "نتائج مؤكدة" : "Proven Results")}
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-[#2C2C2C] leading-tight max-w-2xl mx-auto" id="stats_title">
            {isAr ? "أقسام خدمات متكاملة. امتثال تام وتنسيق مثالي." : "Integrated Services. Flawless Alignment."}
          </h2>
          <p className="text-sm md:text-base text-[#2C2C2C]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {isAr 
              ? "تعتمد الشركات الصغرى والمتوسطة، مكاتب المحاماة، والعائلات على الدقة والمنهجية الفائقة لمجموعة بوابة تكساس للخدمات المتعددة لتسيير المعاملات والتأشيرات، والترجمة المعتمدة، وتوثيق الأبوستيل، والدعم القانوني، والخدمات المالية، وتطوير الهياكل التنظيمية والإدارية." 
              : "Small and Medium Business clients, legal professionals, and families rely on Texas Gateway Multi Services Group’s rigorous methods to prepare visas, process certified translations, secure notary apostilles, assist legal projects, manage business finance, and optimize operational management structures."}
          </p>
        </div>

        {/* Quick stats board */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto text-center" id="stats_metrics_numeric_grid">
          {/* Stat 1: 99.4% */}
          <div className="relative text-center space-y-2 px-4">
            <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#B8922A] block">
              <CountUpNumber value={99.4} decimals={1} suffix="%" />
            </span>
            <span className="text-xs uppercase font-mono tracking-wider text-[#2C2C2C]/70 block max-w-[200px] mx-auto">
              {t.statsApprovalIndex}
            </span>
          </div>

          {/* Stat 2: 4.2x */}
          <div className="relative text-center space-y-2 px-4 pt-6 sm:pt-0">
            {/* Desktop vertical divider */}
            <motion.div 
              className="absolute start-0 top-2 bottom-2 w-[2px] bg-[#B8922A] origin-top hidden sm:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            />
            {/* Mobile horizontal divider */}
            <motion.div 
              className="absolute left-1/4 right-1/4 top-0 h-[2px] bg-[#B8922A] origin-left sm:hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            />
            <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#B8922A] block">
              <CountUpNumber value={4.2} decimals={1} suffix="x" />
            </span>
            <span className="text-xs uppercase font-mono tracking-wider text-[#2C2C2C]/70 block max-w-[200px] mx-auto">
              {t.statsCycleSpeedup}
            </span>
          </div>

          {/* Stat 3: 250+ (Moved into 14k+ position) */}
          <div className="relative text-center space-y-2 px-4 pt-6 sm:pt-0">
            {/* Desktop vertical divider */}
            <motion.div 
              className="absolute start-0 top-2 bottom-2 w-[2px] bg-[#B8922A] origin-top hidden sm:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
            {/* Mobile horizontal divider */}
            <motion.div 
              className="absolute left-1/4 right-1/4 top-0 h-[2px] bg-[#B8922A] origin-left sm:hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
            <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#B8922A] block">
              <CountUpNumber value={250} decimals={0} suffix="+" />
            </span>
            <span className="text-xs uppercase font-mono tracking-wider text-[#2C2C2C]/70 block max-w-[200px] mx-auto">
              {t.statsCorporateSponsors}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
