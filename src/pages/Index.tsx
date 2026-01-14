import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowToParticipate from "@/components/HowToParticipate";
import AboutSection from "@/components/AboutSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowToParticipate />
      <AboutSection />
      <FormSection />
      <Footer />
    </main>
  );
};

export default Index;
