import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const TESTIMONIAL_TEXT_EN = 
  "We founded Texas Gateway Multi Services Group on a simple commitment: to demystify complex immigration pathways, deliver certified translations, execute prompt notary apostilles, support legal practitioners, manage small business bookkeeping, and ensure every client experiences absolute security and dedicated professional guidance.";

const TESTIMONIAL_TEXT_AR = 
  "لقد أسسنا مجموعة بوابة تكساس للخدمات المتعددة بناءً على التزام بسيط: تبسيط مسارات الهجرة المعقدة، وتقديم خدمات الترجمة المعتمدة، وإنجاز تصديقات الأبوستيل السريعة، ومساندة الممارسين القانونيين، وإدارة دفاتر حسابات الشركات الصغيرة، وضمان حصول كل عميل على أمان مطلق وتوجيه مهني مخصص.";

interface WordRevealProps {
  word: string;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  lang: "en" | "ar";
  key?: string;
}

function WordReveal({ word, index, total, scrollProgress, lang }: WordRevealProps) {
  // Each word maps to a sequential range [i/total, (i+1)/total]
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);
  const color = useTransform(scrollProgress, [start, end], [
    "rgba(245, 245, 240, 0.45)",
    "#F5F5F0"
  ]);

  return (
    <motion.span
      style={{ opacity, color }}
      className={`inline-block select-none ${lang === "ar" ? "ml-[0.3em]" : "mr-[0.3em]"}`}
    >
      {word}
    </motion.span>
  );
}

interface TestimonialProps {
  lang?: "en" | "ar";
}

export default function Testimonial({ lang = "en" }: TestimonialProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking on the container
  // target: containerRef, offset: ["start end", "end center"]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const testimonialText = lang === "ar" ? TESTIMONIAL_TEXT_AR : TESTIMONIAL_TEXT_EN;
  const words = testimonialText.split(" ");

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-[#1B2C6B] flex flex-col justify-center py-24 md:py-32 px-8 md:px-28 text-start /* RTL: mirrored */"
      id="testimonial_section"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-start w-full" id="testimonial_content">
        {/* Transparent quote mark image from assets */}
        <img
          src="/src/assets/images/quote_symbol_transparent.png"
          alt="Quote mark"
          className="w-20 h-14 object-contain select-none opacity-85 -ms-6 /* RTL: mirrored */ mb-4"
          referrerPolicy="no-referrer"
          id="testimonial_quote_icon"
        />

        {/* Testimonial text with word reveal */}
        <motion.div 
          key={lang}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-medium leading-[1.2] flex flex-wrap text-white tracking-tight w-full mb-24" 
          id="testimonial_text_wrapper"
        >
          {words.map((word, i) => {
            const isLast = i === words.length - 1;
            if (isLast) {
              return (
                <span className="relative inline-block" key={`${word}-${i}`}>
                  <WordReveal
                    word={word}
                    index={i}
                    total={words.length}
                    scrollProgress={scrollYProgress}
                    lang={lang}
                  />
                  <img
                    src="/src/assets/images/quote_symbol_transparent.png"
                    alt="Closing quote"
                    className="absolute top-full -end-6 /* RTL: mirrored */ w-20 h-14 object-contain select-none rotate-180 opacity-85 mt-4"
                    referrerPolicy="no-referrer"
                    id="testimonial_closing_quote"
                  />
                </span>
              );
            }
            return (
              <WordReveal
                key={`${word}-${i}`}
                word={word}
                index={i}
                total={words.length}
                scrollProgress={scrollYProgress}
                lang={lang}
              />
            );
          })}
        </motion.div>

        {/* Author row */}
        <div className="flex items-center gap-4" id="testimonial_author_row">
          <img
            src="/src/assets/images/khaled abuzaher.jpg"
            alt="Khaled Abuzaher avatar"
            className="w-14 h-14 rounded-full border-[3px] border-[#B8922A] object-cover shadow-lg"
            referrerPolicy="no-referrer"
            id="testimonial_author_avatar"
          />
          <div className="flex flex-col" id="testimonial_author_info">
            <span className="text-base font-semibold leading-7 text-[#F5F5F0]" id="testimonial_author_name">
              {lang === "ar" ? "د. خالد محمد أبو زاهر" : "Dr. Khaled M. Abu Zaher"}
            </span>
            <span className="text-sm font-normal leading-5 text-[#9ca3af]" id="testimonial_author_role">
              {lang === "ar" ? "المؤسس والمدير المباشر" : "Founder & CEO"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
