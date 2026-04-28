import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useMotionReduced } from "@/lib/motionReduced";

const faqs = [
  {
    q: "How much do treatments cost and do you accept insurance?",
    a: "Pricing varies by treatment. We provide a clear, written quote during your consultation — no hidden fees. We accept most major Bahrain health insurance providers and offer flexible payment plans.",
  },
  {
    q: "What languages does your team speak?",
    a: "Our clinical team speaks Arabic and English fluently, and our reception can also assist in Hindi and Tagalog.",
  },
  {
    q: "Is parking available at Seef?",
    a: "Yes — complimentary covered parking is available directly at our Seef District location. The clinic is also a short walk from Seef Mall.",
  },
  {
    q: "What should I expect at my first visit?",
    a: "Your first visit includes a comprehensive oral exam, digital X-rays if needed, and a one-on-one discussion of your goals. Most first visits take 45–60 minutes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, BenefitPay, all major credit and debit cards, and bank transfer. Installment plans are available for larger treatments.",
  },
  {
    q: "Do you handle dental emergencies?",
    a: "Yes. We reserve daily emergency slots and can usually see urgent cases the same day. Call us directly for after-hours guidance.",
  },
];

const FAQSection = () => {
  const { instant, reduceMotion } = useMotionReduced();

  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know before your first visit.
          </p>
        </div>

        <motion.div
          initial={instant ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="bg-card rounded-xl border border-border shadow-sm divide-y divide-border">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="px-5 border-0">
                <AccordionTrigger className="text-start text-base font-semibold text-foreground hover:text-primary py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
