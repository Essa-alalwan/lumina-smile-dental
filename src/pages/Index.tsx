import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BookingSection from "@/components/BookingSection";
import ServicesSection from "@/components/ServicesSection";
import AuthoritySection from "@/components/AuthoritySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PatientExperienceSection from "@/components/PatientExperienceSection";
import LogisticsSection from "@/components/LogisticsSection";
import FinalCTASection from "@/components/FinalCTASection";
import StickyBooking from "@/components/StickyBooking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div id="top" className="min-h-screen">
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>
      <header>
        <Navbar />
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none scroll-mt-20 md:scroll-mt-24 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        <HeroSection />
        <BookingSection />
        <ServicesSection />
        <AuthoritySection />
        <TestimonialsSection />
        <PatientExperienceSection />
        <LogisticsSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyBooking />
    </div>
  );
};

export default Index;
