import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Wallet, Trophy, Gift, Building, PenLine, Ticket } from "lucide-react";
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
          className="text-center mb-12"
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
            e concorrer
          </motion.p>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="text-left space-y-4">
            <p className="text-lg text-foreground/80 leading-relaxed">
              A <span className="text-primary font-semibold">InvestSmart</span> acredita que educação financeira transforma vidas, realiza sonhos e cria experiências inesquecíveis.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Para celebrar a parceria com o Maracanã, criamos um <span className="text-primary font-semibold">Concurso Cultural</span> exclusivo da Torcida InvestSmart, onde você pode concorrer a experiências especiais no templo do futebol.
            </p>
          </div>
        </motion.div>

        {/* Participation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <p className="text-xl md:text-2xl text-primary font-bold text-center mb-8">
            Para participar, é só:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, type: "spring", stiffness: 100 }}
            >
              <a 
                href="#inscricao"
                className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 text-center relative z-10 h-full block cursor-pointer group transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_hsl(258_96%_70%_/_0.3)]"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/15 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <PenLine className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary text-xs font-semibold tracking-widest mb-3 block uppercase">
                  Passo 01
                </span>
                <h3 className="text-lg md:text-xl text-foreground font-bold mb-3">
                  Crie sua frase criativa
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Sobre o tema: <span className="text-primary/80 italic">"A importância da educação financeira na vida das pessoas"</span>
                </p>
              </a>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9, type: "spring", stiffness: 100 }}
            >
              <a 
                href="#inscricao"
                className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 text-center relative z-10 h-full block cursor-pointer group transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_hsl(258_96%_70%_/_0.3)]"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/15 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary text-xs font-semibold tracking-widest mb-3 block uppercase">
                  Passo 02
                </span>
                <h3 className="text-lg md:text-xl text-foreground font-bold mb-3">
                  Abra sua conta na InvestSmart
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Processo digital, simples e sem custo
                </p>
              </a>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.1, type: "spring", stiffness: 100 }}
            >
              <a 
                href="#inscricao"
                className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 text-center relative z-10 h-full block cursor-pointer group transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_hsl(258_96%_70%_/_0.3)]"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/15 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Ticket className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary text-xs font-semibold tracking-widest mb-3 block uppercase">
                  Passo 03
                </span>
                <h3 className="text-lg md:text-xl text-foreground font-bold mb-3">
                  Concorra aos ingressos
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Várias chances ao longo da campanha
                </p>
              </a>
            </motion.div>
          </div>
        </motion.div>

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
