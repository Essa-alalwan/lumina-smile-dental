import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hand } from "lucide-react";
import { useMotionReduced } from "@/lib/motionReduced";
import { Button } from "@/components/ui/button";

import beforeVeneers from "@/assets/before-veneers.jpg";
import afterVeneers from "@/assets/after-veneers.jpg";
import beforeWhitening from "@/assets/before-whitening.jpg";
import afterWhitening from "@/assets/after-whitening.jpg";
import beforeSmileDesign from "@/assets/before-smile-design.jpg";
import afterSmileDesign from "@/assets/after-smile-design.jpg";

const transformations = [
  {
    label: "Porcelain Veneers",
    note: "8 veneers, completed in 2 visits",
    emotion: "Regain confidence in your smile",
    before: beforeVeneers,
    after: afterVeneers,
    beforeAlt: "Before — discolored, uneven upper teeth with visible gaps",
    afterAlt: "After porcelain veneers — natural, aligned, brighter smile",
    hint: "Tap to see what we started with",
  },
  {
    label: "Professional Whitening",
    note: "6 shades brighter in a single session",
    emotion: "Smile without holding back",
    before: beforeWhitening,
    after: afterWhitening,
    beforeAlt: "Before whitening — yellowed, stained teeth from coffee and time",
    afterAlt: "After whitening — visibly brighter, healthier-looking teeth",
    hint: "Tap to reveal the before",
  },
  {
    label: "Smile Design",
    note: "Full digital smile makeover plan",
    emotion: "Love the way you look again",
    before: beforeSmileDesign,
    after: afterSmileDesign,
    beforeAlt: "Before smile design — worn, uneven, slightly crowded teeth",
    afterAlt: "After smile design — clean, balanced, confident smile",
    hint: "Tap to see the transformation",
  },
];

interface TransformCardProps {
  before: string;
  after: string;
  label: string;
  note: string;
  emotion: string;
  hint: string;
  beforeAlt: string;
  afterAlt: string;
  index: number;
  reduceMotion: boolean;
}

const TransformCard = ({
  before,
  after,
  label,
  note,
  emotion,
  hint,
  beforeAlt,
  afterAlt,
  index,
  reduceMotion,
}: TransformCardProps) => {
  // Show "after" by default — best foot forward
  const [showBefore, setShowBefore] = useState(false);
  const [showTapHint, setShowTapHint] = useState(index === 0);

  useEffect(() => {
    if (!showTapHint) return;
    const t = setTimeout(() => setShowTapHint(false), 4000);
    return () => clearTimeout(t);
  }, [showTapHint]);

  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  const handleToggle = () => {
    setShowBefore((v) => !v);
    setShowTapHint(false);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.12 }}
      className="rounded-xl border-2 border-accent/30 overflow-hidden shadow-sm bg-card flex flex-col"
    >
      {/* Subtle hint above image */}
      <div className="flex items-center justify-center gap-1.5 py-2 px-4 bg-accent/5 border-b border-accent/10">
        <span className="text-[11px] text-accent/70 font-medium tracking-wide">
          {showBefore ? "👆 Tap to see the result" : hint}
        </span>
      </div>

      {/* Image area — tap to toggle */}
      <div
        className="relative aspect-[3/2] overflow-hidden cursor-pointer group"
        onClick={handleToggle}
      >
        <AnimatePresence mode="wait">
          {showBefore ? (
            <motion.img
              key="before"
              src={before}
              alt={beforeAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              draggable={false}
            />
          ) : (
            <motion.img
              key="after"
              src={after}
              alt={afterAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              draggable={false}
            />
          )}
        </AnimatePresence>

        {/* Label badge */}
        <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/55 px-2 py-1 rounded z-10">
          {showBefore ? "Before" : "After"}
        </span>

        {/* Animated tap-to-compare hint (first card only, auto-dismisses) */}
        <AnimatePresence>
          {showTapHint ? (
            <motion.div
              key="tap-hint"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-3 flex justify-center pointer-events-none z-20"
            >
              <span
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/85 text-background text-xs font-semibold shadow-lg ${
                  reduceMotion ? "" : "animate-pulse"
                }`}
              >
                <Hand className="w-3.5 h-3.5" aria-hidden />
                Tap to compare
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Hover/tap ripple hint overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 group-active:bg-black/15 transition-colors duration-200 z-10" />
      </div>

      {/* Card body */}
      <div className="p-4 text-center space-y-3 flex flex-col flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{note}</p>
        <p className="text-sm italic text-accent font-medium">"{emotion}"</p>

        {/* Toggle button */}
        <button
          onClick={handleToggle}
          className="text-xs text-accent underline underline-offset-2 hover:text-accent/70 transition-colors"
        >
          {showBefore ? "← See the result" : "See where we started →"}
        </button>

        {/* Primary CTA — glowing */}
        <div className="pt-1">
          <Button
            size="sm"
            className="w-full relative shadow-[0_0_14px_2px_hsl(var(--accent)/0.35)] hover:shadow-[0_0_22px_4px_hsl(var(--accent)/0.5)] transition-shadow duration-300"
            onClick={scrollToBooking}
          >
            Get This Result Now →
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const SmileTransformationsSection = () => {
  const { reduceMotion } = useMotionReduced();

  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="transformations" className="relative py-20 md:py-28 bg-muted/30 before:content-[''] before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-gradient-to-b before:from-transparent before:to-muted/30 before:pointer-events-none">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Smile Transformations
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Real results from our patients — tap any photo to reveal the before.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {transformations.map((t, i) => (
            <TransformCard
              key={t.label}
              {...t}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Bottom section-level CTA */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Ready to write your own transformation story?
          </p>
          <Button
            size="lg"
            className="px-10 shadow-[0_0_18px_3px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_28px_6px_hsl(var(--accent)/0.55)] transition-shadow duration-300"
            onClick={scrollToBooking}
          >
            Book Your Free Consultation →
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Illustrative placeholder images — actual patient results may vary.
        </p>
      </div>
    </section>
  );
};

export default SmileTransformationsSection;
