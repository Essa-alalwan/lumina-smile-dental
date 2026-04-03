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
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BookingSection />
      <ServicesSection />
      <AuthoritySection />
      <TestimonialsSection />
      <PatientExperienceSection />
      <LogisticsSection />
      <FinalCTASection />
      <Footer />
      <StickyBooking />
    </div>
  );
};

export default Index;
