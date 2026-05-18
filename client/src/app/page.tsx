import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/Cta";
import AdsGiftSection from "@/components/ui/AdsGiftS";
import LabSection from "@/components/ui/Lab";

import RepairJourney from "@/components/ui/RepairJourney";
import TestimonialsSection from "@/components/ui/Testimonials";
import AdvantageSection from "@/components/ui/why";

import Footer from "@/components/Footer";
import HeroSection from "@/components/ui/Hero";
import PricingSection from "@/components/ui/PricingSection";
import RepairServices from "@/components/ui/Services";

import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <RepairServices />
      <AdvantageSection />
      <PricingSection />
      <RepairJourney />
      <LabSection />
      <TestimonialsSection />
      <CTASection />
      <AdsGiftSection />

      <Footer />
    </>
  );
}
