import { motion } from "framer-motion";
import { Award, Users, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotionReduced } from "@/lib/motionReduced";

const trustBadges = [
  { icon: Award, label: "12+ Years" },
  { icon: Users, label: "500+ Patients" },
  { icon: Star, label: "Google 4.9★" },
  { icon: ShieldCheck, label: "Sterilization Certified" },
];

const HeroSection = () => {
  const { instant, reduceMotion } = useMotionReduced();
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80&auto=format&fit=crop"
          alt="Modern dental care"
          className="w-full h-full object-cover"
          loading="eager"
          // @ts-ignore - fetchpriority is supported in modern browsers but might not be in all TS types
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/50 to-navy-dark/80" />
      </div>

      {/* Content */}
      <div className="relative container text-center px-4">
        <motion.div
          initial={instant ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: "easeOut" }
          }
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance">
            Confident Smiles Start with{" "}
            <span className="text-primary">Exceptional Care</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto text-balance">
            General dentistry, cosmetic treatments, and emergency care —
            delivered with precision in a calm, modern setting.
          </p>

          <p className="mt-3 text-sm text-white/60 tracking-wide uppercase">
            Comfortable, modern, and always patient-first
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-lg px-8 text-base min-h-[48px]">
              <a href="#booking">Book Appointment</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg px-8 text-base min-h-[48px] border-white/50 bg-transparent text-white shadow-sm hover:bg-white/15 hover:text-white"
            >
              <a href="#services">View Our Services</a>
            </Button>
          </div>

          {/* Trust strip */}
          <motion.ul
            initial={instant ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }
            }
            className="mt-10 hidden sm:flex flex-wrap items-center justify-center gap-2.5"
            aria-label="Trust indicators"
          >
            {trustBadges.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/90"
              >
                <b.icon className="w-4 h-4 text-primary" aria-hidden />
                <span className="font-medium">{b.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
