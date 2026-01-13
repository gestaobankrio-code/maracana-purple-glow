import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
      className="py-24 md:py-32 bg-gradient-to-b from-background via-card to-background relative"
    >
      {/* Shield decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
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
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display italic text-4xl md:text-6xl lg:text-7xl text-primary mb-2">
            COMO
          </h2>
          <h2 className="font-display italic text-5xl md:text-7xl lg:text-8xl text-foreground">
            PARTICIPAR
          </h2>
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
              <div className="flex-shrink-0 w-20 h-20 rounded-full gradient-purple flex items-center justify-center box-glow">
                <span className="font-display text-3xl text-foreground">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="pt-2">
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent" />
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
          <a
            href="#inscricao"
            className="inline-block gradient-purple px-12 py-5 rounded-full font-display text-2xl tracking-widest text-foreground hover:scale-105 transition-transform box-glow-strong"
          >
            INSCREVA-SE AGORA
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToParticipate;
