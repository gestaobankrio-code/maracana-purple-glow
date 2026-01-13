import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import torcidaShield from "@/assets/torcida-shield.png";

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
      className="py-24 md:py-32 bg-primary relative overflow-hidden"
    >
      {/* Dotted pattern background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />

      {/* GARRA text watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.span
          className="font-display text-[15rem] md:text-[25rem] text-white/5 select-none whitespace-nowrap"
          animate={{ x: ["10%", "-10%", "10%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          GARRA GARRA GARRA
        </motion.span>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Shield Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex justify-center"
          >
            <motion.img
              src={torcidaShield}
              alt="Torcida InvestSmart"
              className="w-full max-w-lg drop-shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Steps */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left mb-12"
            >
              <motion.h2
                className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                COMO
              </motion.h2>
              <motion.h2
                className="font-display text-5xl md:text-7xl lg:text-8xl text-background"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ WebkitTextStroke: "2px white" }}
              >
                PARTICIPAR
              </motion.h2>
            </motion.div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Number */}
                  <motion.div
                    className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <span className="font-display text-2xl md:text-3xl text-primary">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="pt-2"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-lg">{step.description}</p>
                  </motion.div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="absolute left-8 md:left-10 top-16 md:top-20 w-0.5 h-12 bg-gradient-to-b from-white/50 to-transparent"
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
              className="text-center lg:text-left mt-12"
            >
              <motion.a
                href="#inscricao"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white px-12 py-5 rounded-full font-display text-xl md:text-2xl tracking-widest text-primary shadow-xl hover:shadow-2xl transition-shadow"
              >
                INSCREVA-SE AGORA
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToParticipate;
