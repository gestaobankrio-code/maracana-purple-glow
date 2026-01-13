import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import camaroteImg from "@/assets/camarote.jpg";
import flamengoFans from "@/assets/flamengo-fans.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: "📺", title: "Vista Privilegiada", desc: "A melhor visão do gramado" },
    { icon: "⭐", title: "Experiência VIP", desc: "Tratamento exclusivo do início ao fim" },
    { icon: "🎉", title: "Momento Único", desc: "Viva a emoção do Maracanã" },
    { icon: "🏆", title: "Prêmio Exclusivo", desc: "Sorteio para clientes especiais" },
  ];

  return (
    <section id="sobre" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Image - Flamengo Fans */}
      <div className="absolute inset-0">
        <img
          src={flamengoFans}
          alt="Torcida do Flamengo"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-background/95" />
      </div>

      {/* Background Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />


      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="font-display italic text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 drop-shadow-lg"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            O CAMAROTE
          </motion.h2>
          <motion.h2
            className="font-display italic text-5xl md:text-7xl lg:text-8xl text-primary font-bold drop-shadow-lg"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            INVESTSMART
          </motion.h2>
          <motion.p
            className="mt-6 text-primary text-2xl font-display tracking-widest"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            TE ESPERA!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <img
              src={camaroteImg}
              alt="Camarote InvestSmart"
              className="relative rounded-2xl w-full box-glow"
            />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-colors group cursor-pointer"
              >
                <motion.span
                  className="text-4xl mb-4 block"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {feature.icon}
                </motion.span>
                <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
