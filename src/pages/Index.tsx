import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CountdownSection from "@/components/CountdownSection";
import HowToParticipate from "@/components/HowToParticipate";
import FAQSection from "@/components/FAQSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <CountdownSection />
      <HowToParticipate />
      <FAQSection />
      <FormSection />
      <Footer />
    </main>
  );
};

export default Index;
