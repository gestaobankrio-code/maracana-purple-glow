import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MaracanaSection from "@/components/MaracanaSection";
import HowToParticipate from "@/components/HowToParticipate";
import AboutSection from "@/components/AboutSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";
import SocialProofPopup from "@/components/SocialProofPopup";
import FloatingTicketButton from "@/components/FloatingTicketButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <MaracanaSection />
      <HowToParticipate />
      <AboutSection />
      <FormSection />
      <Footer />
      <SocialProofPopup />
      <FloatingTicketButton />
    </main>
  );
};

export default Index;
