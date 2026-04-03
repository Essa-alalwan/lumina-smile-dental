import { Users, Award, ThumbsUp, Monitor, ScanLine, Syringe, Eye } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "500+", label: "Patients Treated" },
  { icon: Award, value: "12+", label: "Years Experience" },
  { icon: ThumbsUp, value: "98%", label: "Satisfaction Rate" },
  { icon: Monitor, value: "Advanced", label: "Digital Imaging" },
];

const tech = [
  { icon: ScanLine, label: "Digital X-Rays" },
  { icon: Syringe, label: "Painless Injection System" },
  { icon: Eye, label: "3D Smile Preview" },
];

const AuthoritySection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-surface">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Lumina Dental
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Trusted expertise, modern technology, and a patient-first approach.
          </p>
        </div>

        {/* Doctor profile + Clinic photo */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl border border-border p-8 shadow-sm"
          >
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-primary">SA</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Dr. Sarah Al-Mansouri, DDS
                </h3>
                <p className="text-sm text-primary font-medium mt-1">
                  Lead Dentist · Cosmetic Specialist
                </p>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  Dr. Sarah Al-Mansouri brings over 12 years of experience in
                  restorative and cosmetic dentistry, with advanced training in
                  smile design and aesthetic treatments.
                </p>
                <p className="mt-2 text-xs text-muted-foreground italic">
                  Private consultation available
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&auto=format&fit=crop"
              alt="Modern dental clinic interior"
              className="w-full h-full object-cover min-h-[250px]"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 text-center shadow-sm"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Technology */}
        <div className="text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            Advanced Technology
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {tech.map((t) => (
              <div key={t.label} className="flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-4 shadow-sm">
                <t.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
