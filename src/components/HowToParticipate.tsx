import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Wallet, Trophy, Gift, CheckCircle, Building } from "lucide-react";
import maracanaStadium from "@/assets/maracana-stadium.avif";
import ticketTorcida from "@/assets/ticket-torcida.png";

const HowToParticipate = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const steps = [
    {
      number: "01",
      title: "Inscreva-se na campanha",
      description: "Preencha seus dados no formulário abaixo",
      icon: UserPlus,
    },
    {
      number: "02",
      title: "Abra sua conta na XP",
      description: "Processo digital, simples e sem custo com suporte da InvestSmart",
      icon: Wallet,
    },
    {
      number: "03",
      title: "Concorra aos ingressos",
      description: "Várias chances ao longo da campanha, sempre com 1 par de ingressos",
      icon: Trophy,
    },
  ];

  const clarityPoints = [
    { icon: Gift, text: "Serão distribuídos 300 ingressos no total" },
    { icon: Trophy, text: "Os prêmios são entregues por meio de várias seleções" },
    { icon: Building, text: "A conta é aberta na XP com assessoria da InvestSmart" },
  ];

  return (
    <section
      id="como-participar"
      ref={ref}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Background Image with Parallax and Purple Effect */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={maracanaStadium}
          alt="Maracanã"
          className="w-full h-[130%] object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/15 to-background" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </motion.div>
      
      {/* Animated top border */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2 }}
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
            className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-2 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Como participar
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-primary font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            e concorra
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.3 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-12 left-[55%] w-[90%] h-px bg-gradient-to-r from-primary/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                />
              )}
              
              <a 
                href="#inscricao"
                className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 text-center relative z-10 h-full block cursor-pointer group transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_hsl(258_96%_70%_/_0.3)]"
              >
                {/* Step Icon */}
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/15 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                
                <span className="text-primary text-xs font-semibold tracking-widest mb-3 block uppercase">
                  Passo {step.number}
                </span>
                <h3 className="text-lg md:text-xl text-foreground font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Clarity Box */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9, type: "spring" }}
          className="max-w-2xl mx-auto"
        >
          <motion.div 
            className="bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-2xl p-8"
            whileHover={{ borderColor: "hsl(258 96% 70% / 0.5)" }}
          >
            <motion.h4 
              className="text-base font-bold text-foreground text-center mb-6 uppercase tracking-wide"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              Entenda a campanha
            </motion.h4>
            <div className="space-y-4">
              {clarityPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.15 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4"
                >
                  <motion.div 
                    className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <point.icon className="w-4 h-4 text-primary" />
                  </motion.div>
                  <p className="text-foreground/80 text-sm">{point.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToParticipate;
