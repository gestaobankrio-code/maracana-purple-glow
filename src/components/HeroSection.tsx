import { motion } from "framer-motion";
import heroStadium from "@/assets/hero-stadium.jpg";
import { CheckCircle, Ticket, Users, Star } from "lucide-react";

const HeroSection = () => {
  const supportElements = [
    { icon: Ticket, text: "300 ingressos no total" },
    { icon: Users, text: "150 pares distribuídos em vários sorteios" },
    { icon: Star, text: "Experiência premium em camarote" },
    { icon: CheckCircle, text: "Participação para quem se inscrever e abrir conta" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </motion.div>

      {/* Animated Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline */}
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-2 text-glow"
            animate={{ textShadow: ["0 0 30px hsl(258 96% 70% / 0.5)", "0 0 60px hsl(258 96% 70% / 0.8)", "0 0 30px hsl(258 96% 70% / 0.5)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            O Maracanã pode ser
          </motion.h1>
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl text-primary mb-4"
            initial={{ letterSpacing: "0.3em", opacity: 0 }}
            animate={{ letterSpacing: "0.02em", opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            seu próximo destino
          </motion.h1>
          <motion.p
            className="font-display text-2xl md:text-3xl text-foreground/90 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Camarote exclusivo InvestSmart
          </motion.p>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Abra sua conta na XP, por meio da InvestSmart, e concorra a ingressos para curtir jogos no Maracanã em um{" "}
          <span className="text-primary font-semibold">camarote exclusivo</span>.
        </motion.p>

        {/* Support Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10"
        >
          {supportElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center"
            >
              <element.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground/90">{element.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.a
            href="#inscricao"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gradient-purple px-10 py-4 rounded-full font-display text-lg md:text-xl tracking-wider text-foreground box-glow-strong animate-pulse-glow"
          >
            Quero concorrer aos ingressos
          </motion.a>
          <p className="text-sm text-muted-foreground">
            Abertura de conta gratuita na XP via InvestSmart
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
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
