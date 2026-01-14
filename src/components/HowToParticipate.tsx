import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Wallet, Trophy, Gift, CheckCircle, Building } from "lucide-react";

const HowToParticipate = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      description: "Processo digital, simples e sem custo com o suporte da InvestSmart",
      icon: Wallet,
    },
    {
      number: "03",
      title: "Participe dos sorteios",
      description: "A InvestSmart realizará vários sorteios ao longo da campanha, sempre com 1 par de ingressos por sorteio",
      icon: Trophy,
    },
  ];

  const clarityPoints = [
    { icon: Gift, text: "Serão distribuídos 300 ingressos no total" },
    { icon: Trophy, text: "Os prêmios são entregues por meio de vários sorteios" },
    { icon: Building, text: "A conta é aberta na XP com assessoria da InvestSmart" },
  ];

  return (
    <section
      id="como-participar"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden bg-card"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2">
            Como participar
          </h2>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary">
            dos sorteios
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 text-center relative z-10 h-full">
                {/* Step Number */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-full gradient-purple flex items-center justify-center box-glow"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="w-8 h-8 text-foreground" />
                </motion.div>
                
                <span className="text-primary font-display text-sm tracking-widest mb-2 block">
                  PASSO {step.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clarity Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8">
            <h4 className="font-display text-xl text-primary text-center mb-6">
              Entenda a campanha
            </h4>
            <div className="space-y-4">
              {clarityPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground">{point.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToParticipate;
