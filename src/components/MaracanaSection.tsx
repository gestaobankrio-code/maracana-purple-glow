import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import maracanaStadium from "@/assets/maracana-stadium.avif";
import playersCelebrating from "@/assets/players-celebrating.jpg";

const MaracanaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Image with Parallax and Purple Effect */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={maracanaStadium}
          alt="Maracanã"
          className="w-full h-[130%] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/30 to-background" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              O Templo do Futebol
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              O maior palco do futebol brasileiro
            </motion.h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Cenário dos mais importantes <span className="text-primary font-semibold">clássicos do futebol brasileiro</span>, 
                o Maracanã já recebeu também momentos históricos do futebol internacional.
              </motion.p>
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Fatos monumentais, como o <span className="text-foreground font-semibold">milésimo gol do Rei Pelé</span>, 
                em 1969, aconteceram nos gramados do templo do futebol brasileiro.
              </motion.p>
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Agora você pode viver essa experiência de um <span className="text-primary font-semibold">camarote exclusivo</span>, 
                com toda a estrutura e conforto que você merece.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { value: "1950", label: "Inauguração" },
                { value: "78k", label: "Capacidade" },
                { value: "∞", label: "Emoções" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.p 
                    className="text-3xl md:text-4xl font-bold text-primary"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-foreground/60 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.img
                src={playersCelebrating}
                alt="Jogadores celebrando"
                className="w-full h-[400px] md:h-[500px] object-cover"
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2 }}
              />
              {/* Purple gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/20" />
              
              {/* Badge */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-primary/30">
                  <p className="text-sm text-foreground/80">
                    <motion.span 
                      className="text-primary font-semibold"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Sua chance
                    </motion.span> de fazer parte dessa história
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/15 rounded-full blur-2xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MaracanaSection;
