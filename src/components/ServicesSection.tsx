import {
  Sparkles, Smile, ShieldCheck, Scan, Sun, Palette, Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMotionReduced } from "@/lib/motionReduced";

interface ServiceCard {
  icon: React.ElementType;
  name: string;
  description: string;
  gold?: boolean;
}

const generalServices: ServiceCard[] = [
  { icon: Sparkles, name: "Routine Cleaning", description: "Preventive care to keep your smile healthy" },
  { icon: ShieldCheck, name: "Fillings", description: "Comfortable, tooth-colored restorations" },
  { icon: Scan, name: "Checkups & X-Rays", description: "Thorough exams with modern imaging" },
];

const cosmeticServices: ServiceCard[] = [
  { icon: Smile, name: "Porcelain Veneers", description: "Transform your smile with precision-crafted veneers", gold: true },
  { icon: Sun, name: "Teeth Whitening", description: "Professional results, safely delivered", gold: true },
  { icon: Palette, name: "Smile Design", description: "A fully personalized aesthetic treatment plan", gold: true },
];

const emergencyServices: ServiceCard[] = [
  { icon: Zap, name: "Urgent Dental Care", description: "Same-day appointments for pain, trauma, or urgent needs" },
];

const ServiceCardComponent = ({ service, index }: { service: ServiceCard; index: number }) => {
  const { instant, reduceMotion } = useMotionReduced();
  return (
  <motion.div
    initial={instant ? false : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={
      reduceMotion
        ? { duration: 0 }
        : { delay: index * 0.08, duration: 0.5 }
    }
    className={`group bg-card rounded-xl border p-6 shadow-sm hover:shadow-md transition-all motion-reduce:transition-none ${
      service.gold
        ? "border-gold/40 hover:border-gold"
        : "border-border hover:border-primary/30"
    }`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
      service.gold ? "bg-gold-light text-accent" : "bg-primary/10 text-primary"
    }`}>
      <service.icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
      {service.description}
    </p>
    <a
      href="#booking"
      className={`inline-block mt-4 text-sm font-medium transition-colors ${
        service.gold ? "text-accent hover:text-accent/80" : "text-primary hover:text-primary/80"
      }`}
    >
      Book this service →
    </a>
  </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Comprehensive care for every stage of your dental journey.
          </p>
        </div>

        {/* General Care */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 ps-1">
            General Care
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {generalServices.map((s, i) => (
              <ServiceCardComponent key={s.name} service={s} index={i} />
            ))}
          </div>
        </div>

        {/* Cosmetic Treatments */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-6 ps-1">
            Cosmetic Treatments
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cosmeticServices.map((s, i) => (
              <ServiceCardComponent key={s.name} service={s} index={i} />
            ))}
          </div>
        </div>

        {/* Emergency Care */}
        <div>
          <h3 className="text-sm font-semibold text-destructive uppercase tracking-wider mb-6 ps-1">
            Emergency Care
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {emergencyServices.map((s, i) => (
              <ServiceCardComponent key={s.name} service={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
