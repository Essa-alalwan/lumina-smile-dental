import { Phone, CalendarCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CONTACT_TEL_HREF, WHATSAPP_HREF } from "@/lib/siteContact";

const StickyBooking = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (visible) {
      document.body.classList.add("has-sticky-bar");
    } else {
      document.body.classList.remove("has-sticky-bar");
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("has-sticky-bar");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Desktop: floating buttons stack */}
      <div className="hidden md:flex fixed bottom-8 end-8 z-40 flex-col items-end gap-3">
        <Button asChild size="lg" className="rounded-full shadow-lg px-6 min-h-[52px] text-base gap-2">
          <a href="#booking">
            <CalendarCheck className="w-5 h-5" />
            Book Appointment
          </a>
        </Button>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex items-center gap-2 rounded-full shadow-lg px-5 py-3 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5b] transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      {/* Mobile: sticky bottom bar with WhatsApp + phone */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center gap-2">
        <Button asChild className="flex-1 rounded-lg min-h-[44px]">
          <a href="#booking">Book Appointment</a>
        </Button>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-lg text-white bg-[#25D366] hover:bg-[#1ebe5b] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href={CONTACT_TEL_HREF}
          className="flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card text-primary"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </>
  );
};

export default StickyBooking;
