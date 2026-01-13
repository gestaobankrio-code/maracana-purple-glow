import { motion } from "framer-motion";
import heroStadium from "@/assets/hero-stadium.jpg";
import Countdown from "./Countdown";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <img
          src={heroStadium}
          alt="Maracanã Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </motion.div>

      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
            opacity: 0.5,
          }}
          animate={{
            y: -20,
            opacity: [0.5, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 border-2 border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-20 h-20 border border-primary/20"
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-4 h-4 bg-primary/30 rounded-full"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-6 h-6 bg-primary/20 rounded-full"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="font-display italic text-6xl md:text-8xl lg:text-9xl text-foreground mb-4 text-glow"
            animate={{ textShadow: ["0 0 30px hsl(258 96% 70% / 0.5)", "0 0 60px hsl(258 96% 70% / 0.8)", "0 0 30px hsl(258 96% 70% / 0.5)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            TORÇA COM
          </motion.h1>
          <motion.h1
            className="font-display italic text-7xl md:text-9xl lg:text-[12rem] text-outline mb-8 leading-none"
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={{ letterSpacing: "0.05em", opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            GARRA
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-foreground/90 max-w-xl mx-auto mb-10"
        >
          Sua paixão pode te levar direto ao{" "}
          <motion.span
            className="text-primary font-semibold"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            camarote do Maracanã
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#inscricao"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gradient-purple px-10 py-4 rounded-full font-display text-xl tracking-widest text-foreground box-glow-strong animate-pulse-glow"
          >
            QUERO PARTICIPAR
          </motion.a>
          <motion.a
            href="#sobre"
            whileHover={{ scale: 1.05, borderColor: "hsl(258 96% 70%)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full font-display text-xl tracking-widest text-foreground border-2 border-primary hover:bg-primary/10 transition-colors"
          >
            SAIBA MAIS
          </motion.a>
        </motion.div>

        {/* Countdown Timer */}
        <Countdown />
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
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
