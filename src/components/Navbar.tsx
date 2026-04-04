import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, CONTACT_TEL_HREF } from "@/lib/siteContact";

const MOBILE_NAV_PANEL_ID = "mobile-nav-panel";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const panel = panelRef.current;
    const trigger = menuButtonRef.current;
    if (!panel || !trigger) return;

    const selector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const panelEls = Array.from(
      panel.querySelectorAll<HTMLElement>(selector)
    );
    const focusables = [...panelEls, trigger];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile();
        queueMicrotask(() => menuButtonRef.current?.focus());
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 motion-reduce:transition-none ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: prefersReducedMotion === true ? "auto" : "smooth",
            })
          }
        >
          <span
            className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Lumina<span className="text-primary">Dental</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href={CONTACT_TEL_HREF} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>
            <Phone className="w-4 h-4" />
            {CONTACT.phoneDisplay}
          </a>
          <Button asChild size="sm" className="rounded-lg px-6">
            <a href="#booking">Book Appointment</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls={MOBILE_NAV_PANEL_ID}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={panelRef}
          id={MOBILE_NAV_PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="md:hidden bg-card border-t border-border shadow-lg animate-fade-in"
        >
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-foreground font-medium py-2 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT_TEL_HREF}
              onClick={closeMobile}
              className="flex items-center gap-2 text-foreground font-medium py-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phoneDisplay}
            </a>
            <Button asChild className="mt-2 rounded-lg">
              <a href="#booking" onClick={closeMobile}>
                Book Appointment
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
