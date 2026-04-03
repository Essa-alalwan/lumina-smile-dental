import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Your Best Smile Starts Here
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            General care, cosmetic treatments, and emergency appointments — all in one place.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-lg px-10 text-base min-h-[52px]">
            <a href="#booking">Book Your Appointment</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
