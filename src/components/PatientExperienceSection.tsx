import { Sofa, Heart, Cpu, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useMotionReduced } from "@/lib/motionReduced";

const features = [
  {
    icon: Sofa,
    title: "Comfortable Environment",
    description: "A calming, modern space designed to make every visit feel relaxed and stress-free.",
  },
  {
    icon: Heart,
    title: "Friendly Team",
    description: "Our team is warm, approachable, and always ready to answer your questions with a smile.",
  },
  {
    icon: Cpu,
    title: "Modern Equipment",
    description: "We use the latest dental technology to ensure precise, efficient, and comfortable treatments.",
  },
  {
    icon: UserCheck,
    title: "Personalized Care",
    description: "Every treatment plan is tailored to your needs, goals, and comfort level.",
  },
];

const PatientExperienceSection = () => {
  const { instant, reduceMotion } = useMotionReduced();
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Lumina Experience
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            We believe great dental care starts with how you feel the moment you walk in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={instant ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduceMotion ? { duration: 0 } : { delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientExperienceSection;
