import { useState } from "react";
import { MapPin, Clock, CreditCard, Mail, Phone, Copy, Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useMotionReduced } from "@/lib/motionReduced";
import { CONTACT, CONTACT_MAILTO_HREF, CONTACT_TEL_HREF, CONTACT_MAPS_URL } from "@/lib/siteContact";
import { Button } from "@/components/ui/button";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "9:00 AM – 3:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const durations = [
  { service: "Cleaning", duration: "45 min" },
  { service: "Consultation", duration: "30 min" },
  { service: "Cosmetic Consult", duration: "60 min" },
  { service: "Emergency", duration: "As needed" },
];

const steps = [
  { step: "1", label: "Book", desc: "Choose your time online" },
  { step: "2", label: "Confirm", desc: "We confirm via email" },
  { step: "3", label: "Visit", desc: "Arrive and relax" },
];

const LogisticsSection = () => {
  const { instant, reduceMotion } = useMotionReduced();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTACT.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Maps Embed URL using the free search-based iframe
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    CONTACT.fullAddress
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Visit Us
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Our clinic is centrally located and easy to find.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {/* Interactive Map */}
          <motion.div
            initial={instant ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduceMotion ? { duration: 0 } : undefined}
            className="rounded-xl overflow-hidden border border-border shadow-sm bg-muted min-h-[350px] relative group"
          >
            <iframe
              title="Clinic Location"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.2) contrast(1.1) opacity(0.85)" }}
              src={mapEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            {/* View on Maps Overlay/Button */}
            <div className="absolute bottom-4 right-4 z-10">
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="shadow-md bg-card/90 backdrop-blur hover:bg-card"
              >
                <a
                  href={CONTACT_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Full View
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Hours + Contact */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Working Hours</h3>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-foreground">{h.day}</span>
                    <span className={`font-medium ${h.time === "Closed" ? "text-muted-foreground" : "text-primary"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="font-semibold text-foreground mb-4">Contact & Location</h3>
              <div className="space-y-4">
                {/* Address block with Copy */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{CONTACT.cityRegion}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {CONTACT.fullAddress}
                    </p>
                    <button
                      onClick={copyAddress}
                      className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Address
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-3 border-t border-border/50">
                  <a href={CONTACT_TEL_HREF} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    {CONTACT.phoneDisplay}
                  </a>
                  <a href={CONTACT_MAILTO_HREF} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Duration guide */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-14 max-w-2xl mx-auto">
          <h3 className="font-semibold text-foreground mb-4 text-center">Appointment Duration Guide</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {durations.map((d) => (
              <div key={d.service} className="text-center">
                <div className="text-lg font-bold text-primary">{d.duration}</div>
                <div className="text-xs text-muted-foreground mt-1">{d.service}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-step flow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-14">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-center gap-4">
              <motion.div
                initial={instant ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={reduceMotion ? { duration: 0 } : { delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                  {s.step}
                </div>
                <p className="font-semibold text-foreground mt-2">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden sm:block w-12 h-px bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Payment note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-xl px-6 py-4 shadow-sm">
            <CreditCard className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              We work with most major insurance providers. Payment plans available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsSection;
