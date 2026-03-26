import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/Cta";
import AdsGiftSection from "@/components/final/AdsGiftS";
import LabSection from "@/components/final/Lab";

import RepairJourney from "@/components/final/RepairJourney";
import TestimonialsSection from "@/components/final/Testimonials";
import AdvantageSection from "@/components/final/why";

import Footer from "@/components/Footer";
import HeroSection from "@/components/landing2/Hero";
import PricingSection from "@/components/landing2/PricingSection";
import RepairServices from "@/components/landing2/Services";
import AutoScrollServices from "@/components/Modeile";
import AutoImageScroll from "@/components/Modeile";
import MobileScrollServices from "@/components/Modeile";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* <HeroSection /> */}

      {/* <HeroSection />

      <AboutSection />
      <RepairServices /> */}
      {/* <ServiceSection /> */}
      {/* <PricingSection />
      <WorkProcess />
      <CTASection />
      <TestimonialSection /> */}

      {/* finall */}
      <HeroSection />
      <RepairServices />
      {/* <AutoImageScroll /> */}
      {/* <div className="w-full h-screen flex justify-center items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-[30%] min-w-auto h-auto object-contain"
        >
          <source src="/iphone ads.mp4" type="video/mp4" />
        </video>
      </div> */}

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
