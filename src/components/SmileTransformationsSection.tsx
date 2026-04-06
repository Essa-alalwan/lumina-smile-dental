import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
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
  },
  {
    label: "Professional Whitening",
    note: "6 shades brighter in a single session",
    emotion: "Smile without holding back",
    before: beforeWhitening,
    after: afterWhitening,
  },
  {
    label: "Smile Design",
    note: "Full digital smile makeover plan",
    emotion: "Love the way you look again",
    before: beforeSmileDesign,
    after: afterSmileDesign,
  },
];

interface SliderCardProps {
  before: string;
  after: string;
  label: string;
  note: string;
  emotion: string;
}

const SliderCard = ({ before, after, label, note, emotion }: SliderCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="rounded-xl border-2 border-accent/30 overflow-hidden shadow-sm bg-card">
      <div
        ref={containerRef}
        className="relative aspect-[3/2] cursor-col-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label={`Before and after comparison for ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
        }}
      >
        {/* Before image (full) */}
        <img
          src={before}
          alt={`Before ${label}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* After image (clipped) */}
        <img
          src={after}
          alt={`After ${label}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          draggable={false}
        />
        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg z-10"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-accent">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
              <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {/* Labels */}
        <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded">Before</span>
        <span className="absolute bottom-3 right-3 text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded">After</span>
      </div>
      <div className="p-4 text-center space-y-3">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{note}</p>
        <p className="text-sm italic text-accent font-medium">"{emotion}"</p>
        <Button
          size="sm"
          className="w-full"
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get This Result
        </Button>
      </div>
    </div>
  );
};

const SmileTransformationsSection = () => {
  const { instant, reduceMotion } = useMotionReduced();

  return (
    <section id="transformations" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Smile Transformations
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            See what's possible — drag the slider to compare.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {transformations.map((t, i) => (
            <motion.div
              key={t.label}
              initial={instant ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduceMotion ? { duration: 0 } : { delay: i * 0.12 }}
            >
              <SliderCard {...t} />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Illustrative placeholder images — actual patient results may vary.
        </p>
      </div>
    </section>
  );
};

export default SmileTransformationsSection;
