import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span
            className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Lumina<span className="text-primary">Dental</span>
          </span>
        </a>

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
          <a href="tel:+XXX-XXXX-XXXX" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>
            <Phone className="w-4 h-4" />
            +XXX-XXXX-XXXX
          </a>
          <Button asChild size="sm" className="rounded-lg px-6">
            <a href="#booking">Book Appointment</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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
        <div className="md:hidden bg-card border-t border-border shadow-lg animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground font-medium py-2 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-lg">
              <a href="#booking" onClick={() => setMobileOpen(false)}>
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
