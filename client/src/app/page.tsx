import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/Cta";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import HowItWorksAlternating from "@/components/HowItWork";
import HowItWorks from "@/components/HowItWork";
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/Services";
import WorkProcess from "@/components/WorkProcess";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <AboutSection />
      <ServiceSection />
      <WorkProcess />
      <CTASection />

      <Footer />
    </>
  );
}
