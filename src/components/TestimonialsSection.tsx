import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useMotionReduced } from "@/lib/motionReduced";

const testimonials = [
  {
    quote: "I've always been anxious about dental visits, but the team at Lumina made me feel completely at ease. The procedure was painless, and I couldn't believe how comfortable I felt throughout.",
    name: "Amira K.",
    treatment: "Root Canal Treatment",
  },
  {
    quote: "My veneers look absolutely incredible. Dr. Al-Mansouri took the time to understand exactly what I wanted, and the result exceeded all my expectations. I can't stop smiling!",
    name: "James R.",
    treatment: "Porcelain Veneers",
  },
  {
    quote: "I had a dental emergency on a Saturday morning and they fit me in within the hour. Professional, fast, and genuinely caring. I couldn't ask for better care.",
    name: "Layla M.",
    treatment: "Emergency Care",
  },
  {
    quote: "From reception to the chair, every person on the team is warm and welcoming. They explain everything clearly and never rush you. It truly feels like a premium experience.",
    name: "David P.",
    treatment: "Routine Checkup",
  },
];

const TestimonialsSection = () => {
  const { instant, reduceMotion } = useMotionReduced();

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What Our Patients Say
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Real stories from real patients.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={instant ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduceMotion ? { duration: 0 } : { delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed flex-1">
                "{t.quote}"
              </p>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.treatment}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
