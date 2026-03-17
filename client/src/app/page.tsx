import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/Cta";
import AdsGiftSection from "@/components/final/AdsGiftS";
import LabSection from "@/components/final/Lab";
import Pricing from "@/components/final/Pricing";
import RepairJourney from "@/components/final/RepairJourney";
import Services from "@/components/final/Services";
import TestimonialsSection from "@/components/final/Testimonials";
import AdvantageSection from "@/components/final/why";

import Footer from "@/components/Footer";
// import HeroSection from "@/components/Hero";
import HowItWorksAlternating from "@/components/HowItWork";
import HowItWorks from "@/components/HowItWork";
import HeroSection from "@/components/landing2/Hero";
import PricingSection from "@/components/landing2/PricingSection";
import RepairServices from "@/components/landing2/Services";
import TestimonialSection from "@/components/landing2/Testimonials";
import Navbar from "@/components/Navbar";
// import ServiceSection from "@/components/Services";
import WorkProcess from "@/components/WorkProcess";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* <HeroSection />

      <AboutSection />
      <RepairServices /> */}
      {/* <ServiceSection /> */}
      {/* <PricingSection />
      <WorkProcess />
      <CTASection />
      <TestimonialSection /> */}

      {/* finall */}
      <Services />
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
