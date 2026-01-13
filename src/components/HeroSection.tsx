import { motion } from "framer-motion";
import heroStadium from "@/assets/hero-stadium.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroStadium}
          alt="Maracanã Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-primary/30 rotate-45 animate-float" />
      <div className="absolute bottom-40 left-10 w-20 h-20 border border-primary/20 rotate-12" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display italic text-6xl md:text-8xl lg:text-9xl text-foreground mb-4 text-glow">
            TORÇA COM
          </h1>
          <h1 className="font-display italic text-7xl md:text-9xl lg:text-[12rem] text-outline mb-8 leading-none">
            GARRA
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-foreground/90 max-w-xl mx-auto mb-10"
        >
          Sua paixão pode te levar direto ao{" "}
          <span className="text-primary font-semibold">camarote do Maracanã</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#inscricao"
            className="gradient-purple px-10 py-4 rounded-full font-display text-xl tracking-widest text-foreground hover:scale-105 transition-transform box-glow-strong animate-pulse-glow"
          >
            QUERO PARTICIPAR
          </a>
          <a
            href="#sobre"
            className="px-10 py-4 rounded-full font-display text-xl tracking-widest text-foreground border-2 border-primary hover:bg-primary/10 transition-colors"
          >
            SAIBA MAIS
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
