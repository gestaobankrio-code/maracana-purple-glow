import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Users, DollarSign, MapPin, Shield, HeadphonesIcon, BadgeCheck, Briefcase } from "lucide-react";
import logoInvestsmart from "@/assets/logo-investsmart.png";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "29", suffix: "bilhões", prefix: "Mais de R$", desc: "sob custódia", icon: DollarSign },
    { value: "100", suffix: "", prefix: "Mais de", desc: "escritórios no Brasil", icon: Building2 },
    { value: "200", suffix: "mil", prefix: "Mais de", desc: "clientes atendidos", icon: Users },
    { value: "2.000", suffix: "", prefix: "Mais de", desc: "colaboradores e assessores", icon: Briefcase },
  ];

  const seals = [
    { icon: BadgeCheck, text: "Conta aberta na XP" },
    { icon: HeadphonesIcon, text: "Assessoria InvestSmart dedicada" },
    { icon: MapPin, text: "Presença nacional" },
    { icon: Shield, text: "Atendimento especializado" },
  ];

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-2">
            Você não está entrando
          </h2>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            em qualquer lugar
          </h2>
          <p className="font-display text-2xl md:text-3xl text-primary">
            Está entrando em um dos maiores escritórios da XP no Brasil
          </p>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <img src={logoInvestsmart} alt="InvestSmart" className="h-16 md:h-20" />
        </motion.div>

        {/* First Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-lg md:text-xl text-foreground/90 text-center leading-relaxed">
            A InvestSmart é um dos maiores escritórios credenciados da XP, com presença em todo o Brasil e milhares de pessoas atendidas diariamente. Aqui, <span className="text-primary font-semibold">escala, estrutura e relacionamento</span> caminham juntos para oferecer segurança, acesso e experiências que poucos conseguem viver.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-2xl p-6 text-center box-glow"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="text-xs text-muted-foreground mb-1">{stat.prefix}</p>
              <motion.p
                className="font-display text-4xl md:text-5xl text-primary"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-foreground font-medium">{stat.suffix}</p>
              <p className="text-xs text-muted-foreground mt-2">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Reinforcement Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-lg text-foreground/80 text-center leading-relaxed">
            Essa estrutura permite unir a solidez da XP com uma assessoria próxima, humana e estratégica. <span className="text-primary font-semibold">Abrir sua conta pela InvestSmart</span> é escolher credibilidade, acompanhamento especializado e acesso a experiências exclusivas dentro e fora do mercado financeiro.
          </p>
        </motion.div>

        {/* Trust Seals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {seals.map((seal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center"
            >
              <seal.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground font-medium">{seal.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
