import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowToParticipate from "@/components/HowToParticipate";
import FAQSection from "@/components/FAQSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";
import FloatingPlayers from "@/components/FloatingPlayers";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <FloatingPlayers />
      <Header />
      <HeroSection />
      <AboutSection />
      <HowToParticipate />
      <FAQSection />
      <FormSection />
      <Footer />
    </main>
  );
};

export default Index;
