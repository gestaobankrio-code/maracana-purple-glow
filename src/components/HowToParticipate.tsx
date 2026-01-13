import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import heroStadium from "@/assets/hero-stadium.jpg";

const HowToParticipate = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      title: "Abra sua conta",
      description: "Cadastre-se na InvestSmart XP de forma rápida e gratuita",
    },
    {
      number: "02",
      title: "Preencha o formulário",
      description: "Complete seus dados no formulário de inscrição abaixo",
    },
    {
      number: "03",
      title: "Cruze os dedos",
      description: "Aguarde o sorteio e torça para ser o próximo sortudo!",
    },
  ];

  return (
    <section
      id="como-participar"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Stadium Background */}
      <div className="absolute inset-0">
        <img
          src={heroStadium}
          alt="Stadium Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>
      {/* Shield decoration */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <svg
          width="600"
          height="700"
          viewBox="0 0 100 120"
          className="text-primary"
        >
          <path
            d="M50 0 L100 20 L100 60 Q100 100 50 120 Q0 100 0 60 L0 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Animated lines */}
      <motion.div
        className="absolute top-20 left-0 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-1/4 h-0.5 bg-gradient-to-l from-transparent via-primary/20 to-transparent"
        animate={{ x: ["100%", "-400%"] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="font-display italic text-4xl md:text-6xl lg:text-7xl text-primary mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            COMO
          </motion.h2>
          <motion.h2
            className="font-display italic text-5xl md:text-7xl lg:text-8xl text-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            PARTICIPAR
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex items-start gap-6 mb-12 last:mb-0"
            >
              {/* Number */}
              <motion.div
                className="flex-shrink-0 w-20 h-20 rounded-full gradient-purple flex items-center justify-center box-glow"
                whileHover={{ scale: 1.1, rotate: 10 }}
                animate={{ boxShadow: ["0 0 20px hsl(258 96% 70% / 0.5)", "0 0 40px hsl(258 96% 70% / 0.8)", "0 0 20px hsl(258 96% 70% / 0.5)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-display text-3xl text-foreground">
                  {step.number}
                </span>
              </motion.div>

              {/* Content */}
              <motion.div
                className="pt-2"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </motion.div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  style={{ originY: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#inscricao"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block gradient-purple px-12 py-5 rounded-full font-display text-2xl tracking-widest text-foreground box-glow-strong"
          >
            INSCREVA-SE AGORA
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToParticipate;
