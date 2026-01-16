import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Users, DollarSign, MapPin, Shield, HeadphonesIcon, BadgeCheck, Briefcase } from "lucide-react";
import neutralFans from "@/assets/fans-neutral-clean.jpg";

// Animated Counter Component - SLOWER animation
const AnimatedCounter = ({ 
  value, 
  duration = 4, // Increased from 2 to 4 seconds
  isInView 
}: { 
  value: string; 
  duration?: number;
  isInView: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseFloat(value.replace(/[.,]/g, ''));

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Smoother easing for slower feel
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(easeOutExpo * numericValue);
      
      setDisplayValue(currentValue.toLocaleString('pt-BR'));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, duration, value]);

  return <span>{displayValue}</span>;
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const stats = [
    { value: "29", suffix: "bilhões", prefix: "Mais de R$", desc: "sob custódia", icon: DollarSign },
    { value: "100", suffix: "", prefix: "Mais de", desc: "escritórios no Brasil", icon: Building2 },
    { value: "200", suffix: "mil", prefix: "Mais de", desc: "clientes atendidos", icon: Users },
    { value: "2.000", suffix: "", prefix: "Mais de", desc: "colaboradores e assessores", icon: Briefcase },
  ];

  const seals = [
    { icon: BadgeCheck, text: "Conta aberta na XP" },
    { icon: HeadphonesIcon, text: "Assessoria dedicada" },
    { icon: MapPin, text: "Presença nacional" },
    { icon: Shield, text: "Atendimento especializado" },
  ];

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Background Image with Parallax and Purple Effect */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={neutralFans}
          alt="Torcida"
          className="w-full h-[130%] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/20 to-background" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </motion.div>
      
      {/* Animated borders */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-3 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Você não está entrando em qualquer lugar
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-primary font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Está entrando em um dos maiores escritórios da XP no Brasil
          </motion.p>
        </motion.div>

        {/* First Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <p className="text-lg text-foreground/80 text-center leading-relaxed">
            A InvestSmart é um dos maiores escritórios credenciados da XP, com presença em todo o Brasil e milhares de pessoas atendidas diariamente. Aqui, <span className="text-primary font-semibold">escala, estrutura e relacionamento</span> caminham juntos para oferecer segurança, acesso e experiências que poucos conseguem viver.
          </p>
        </motion.div>

        {/* Stats Grid - SLOWER animations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.6 + index * 0.2,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8 text-center hover:border-primary/40 transition-colors cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: index * 0.5 }}
              >
                <stat.icon className="w-6 h-6 text-primary/60 mx-auto mb-4" />
              </motion.div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{stat.prefix}</p>
              <motion.p 
                className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold tracking-tight"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2, type: "spring" }}
              >
                <AnimatedCounter 
                  value={stat.value} 
                  isInView={isInView} 
                  duration={4 + index * 0.5} // Even slower: 4-5.5 seconds per counter
                />
              </motion.p>
              <motion.p 
                className="text-sm text-primary font-semibold mt-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 + index * 0.2 }}
              >
                {stat.suffix}
              </motion.p>
              <motion.p 
                className="text-xs text-muted-foreground mt-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 + index * 0.2 }}
              >
                {stat.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Reinforcement Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <p className="text-lg text-foreground/70 text-center leading-relaxed">
            Essa estrutura permite unir a solidez da XP com uma assessoria próxima, humana e estratégica. <span className="text-foreground font-medium">Abrir sua conta pela InvestSmart</span> é escolher credibilidade, acompanhamento especializado e acesso a experiências exclusivas.
          </p>
        </motion.div>

        {/* Trust Seals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto"
        >
          {seals.map((seal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 2 + index * 0.1,
                type: "spring",
                stiffness: 150
              }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <seal.icon className="w-4 h-4 text-primary" />
              </motion.div>
              <p className="text-sm text-foreground/90">{seal.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
