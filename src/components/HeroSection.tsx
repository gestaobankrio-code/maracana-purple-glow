import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import maracanaNight from "@/assets/maracana-night.png";
import { CheckCircle, Ticket, Users, Star } from "lucide-react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const supportElements = [
    { icon: Ticket, text: "300 ingressos no total" },
    { icon: Users, text: "150 pares para você concorrer" },
    { icon: Star, text: "Experiência premium em camarote" },
    { icon: CheckCircle, text: "Para quem se inscrever e abrir conta" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <motion.img
          src={maracanaNight}
          alt="Maracanã Stadium at Night"
          className="w-full h-[120%] object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
        />
        {/* Subtle overlay for text visibility with 70% transparency */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </motion.div>

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/60 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
          }}
          animate={{
            y: -50,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        />
      ))}

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 text-center pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Headline */}
          <motion.h1
            className="text-xl md:text-3xl lg:text-4xl text-white mb-8 tracking-tight drop-shadow-lg font-bold uppercase text-center"
            style={{ fontFamily: "Arial, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            O Maracanã pode ser seu próximo destino
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-[#EBFF70] font-bold mb-10 tracking-wide"
            style={{ 
              fontFamily: "Arial, sans-serif",
              textShadow: "0 0 20px rgba(235, 255, 112, 0.5), 0 4px 15px rgba(0, 0, 0, 0.4)"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Camarote exclusivo InvestSmart
          </motion.p>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md font-normal"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          Abra sua conta na XP, por meio da InvestSmart, e concorra a ingressos para curtir jogos no Maracanã!
        </motion.p>
        {/* Support Elements - Eye-catching animated cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12"
        >
          {supportElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2 + index * 0.1,
                ease: "easeOut"
              }}
              className="relative bg-black/60 backdrop-blur-lg border-2 border-primary/50 rounded-2xl p-6 md:p-8 cursor-default overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:border-primary hover:shadow-[0_20px_40px_-10px_hsl(258_96%_70%_/_0.5)]"
            >
              {/* Subtle glow on hover - CSS only */}
              <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              
              {/* Icon */}
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                <element.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-4 drop-shadow-[0_0_8px_hsl(258_96%_70%_/_0.5)] group-hover:drop-shadow-[0_0_16px_hsl(258_96%_70%_/_0.8)] transition-all duration-300" />
              </div>
              
              <p className="relative z-10 text-sm md:text-base text-white font-medium">{element.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.a
            href="#inscricao"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px hsl(258 96% 70% / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: [
                "0 10px 30px -10px hsl(258 96% 70% / 0.3)",
                "0 15px 35px -10px hsl(258 96% 70% / 0.5)",
                "0 10px 30px -10px hsl(258 96% 70% / 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-primary hover:bg-primary/90 px-10 py-4 rounded-xl font-semibold text-base md:text-lg text-primary-foreground transition-colors"
          >
            Quero concorrer aos ingressos
          </motion.a>
          <motion.p 
            className="text-xs text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Abertura de conta gratuita na XP via InvestSmart
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2"
        >
          <motion.div
            className="w-1.5 h-3 bg-primary/60 rounded-full"
            animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
