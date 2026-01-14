import { motion } from "framer-motion";
import maracanaStadium from "@/assets/maracana-stadium.avif";
import { CheckCircle, Ticket, Users, Star } from "lucide-react";

const HeroSection = () => {
  const supportElements = [
    { icon: Ticket, text: "300 ingressos no total" },
    { icon: Users, text: "150 pares em vários sorteios" },
    { icon: Star, text: "Experiência premium em camarote" },
    { icon: CheckCircle, text: "Para quem se inscrever e abrir conta" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 25, ease: "linear" }}
      >
        <img
          src={maracanaStadium}
          alt="Maracanã Stadium"
          className="w-full h-full object-cover"
        />
        {/* Purple overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-primary/20 to-background" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-2 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            O Maracanã pode ser
          </motion.h1>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl text-primary font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            seu próximo destino
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 font-medium mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Camarote exclusivo InvestSmart
          </motion.p>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Abra sua conta na XP, por meio da InvestSmart, e concorra a ingressos para curtir jogos no Maracanã em um{" "}
          <span className="text-primary font-semibold">camarote exclusivo</span>.
        </motion.p>

        {/* Support Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mb-12"
        >
          {supportElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.08 }}
              className="bg-background/60 backdrop-blur-md border border-primary/20 rounded-xl p-4"
            >
              <element.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs md:text-sm text-foreground/80">{element.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.a
            href="#inscricao"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-primary/90 px-10 py-4 rounded-xl font-semibold text-base md:text-lg text-primary-foreground transition-all shadow-lg shadow-primary/25"
          >
            Quero concorrer aos ingressos
          </motion.a>
          <p className="text-xs text-foreground/50">
            Abertura de conta gratuita na XP via InvestSmart
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-foreground/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            className="w-1 h-2 bg-foreground/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
