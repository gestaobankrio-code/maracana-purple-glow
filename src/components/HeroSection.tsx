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
    { icon: Users, text: "150 pares em vários sorteios" },
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
        {/* Subtle overlay for text visibility while keeping image vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
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
            className="text-5xl md:text-6xl lg:text-7xl mb-2 tracking-tight bg-gradient-to-r from-white via-[#EBFF70] to-white bg-clip-text text-transparent"
            style={{ 
              fontFamily: "'Roundkey', sans-serif", 
              fontStyle: "italic",
              backgroundSize: "200% 100%"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              y: { duration: 0.8, delay: 0.3 },
              backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" }
            }}
          >
            O Maracanã pode ser
          </motion.h1>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight bg-gradient-to-r from-[#EBFF70] via-white to-[#EBFF70] bg-clip-text text-transparent"
            style={{ 
              fontFamily: "'Roundkey', sans-serif", 
              fontStyle: "italic",
              backgroundSize: "200% 100%"
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.5 },
              y: { duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 },
              scale: { duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 },
              backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" }
            }}
          >
            seu próximo destino
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl text-[#EBFF70] font-bold mb-10 tracking-wide"
            style={{ 
              fontFamily: "'Roundkey', sans-serif",
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
          className="text-base md:text-lg text-white max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md"
          style={{ fontFamily: "'Roundkey', sans-serif", fontStyle: "italic" }}
        >
          Abra sua conta na XP, por meio da InvestSmart, e concorra a ingressos para curtir jogos no Maracanã em um{" "}
          <motion.span 
            className="text-white font-semibold"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            camarote exclusivo
          </motion.span>.
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
              initial={{ opacity: 0, y: 50, scale: 0.5, rotateY: -30 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 1.2 + index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -10,
                boxShadow: "0 20px 40px -10px hsl(258 96% 70% / 0.5)"
              }}
              className="relative bg-black/60 backdrop-blur-lg border-2 border-primary/50 rounded-2xl p-6 md:p-8 cursor-default overflow-hidden group"
            >
              {/* Glowing border animation */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary/80"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              />
              
              {/* Background pulse effect */}
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-xl"
                animate={{ 
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              />
              
              {/* Icon with bounce and glow */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: index * 0.4,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  animate={{
                    filter: [
                      "drop-shadow(0 0 8px hsl(258 96% 70% / 0.5))",
                      "drop-shadow(0 0 20px hsl(258 96% 70% / 0.9))",
                      "drop-shadow(0 0 8px hsl(258 96% 70% / 0.5))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <element.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-4" />
                </motion.div>
              </motion.div>
              
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
