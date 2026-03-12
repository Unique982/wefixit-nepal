import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/HowItWork";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </>
  );
}
