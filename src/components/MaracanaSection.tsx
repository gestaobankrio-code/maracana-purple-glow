import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import maracanaStadium from "@/assets/maracana-stadium.avif";
import playersCelebrating from "@/assets/players-celebrating.jpg";
const MaracanaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Image with Purple Effect */}
      <div className="absolute inset-0">
        <img
          src={maracanaStadium}
          alt="Maracanã"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/30 to-background" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
              O Templo do Futebol
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6 tracking-tight leading-tight">
              O maior palco do futebol brasileiro
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p className="text-lg">
                Cenário dos mais importantes <span className="text-primary font-semibold">clássicos do futebol brasileiro</span>, 
                o Maracanã já recebeu também momentos históricos do futebol internacional.
              </p>
              <p className="text-lg">
                Fatos monumentais, como o <span className="text-foreground font-semibold">milésimo gol do Rei Pelé</span>, 
                em 1969, aconteceram nos gramados do templo do futebol brasileiro.
              </p>
              <p className="text-lg">
                Agora você pode viver essa experiência de um <span className="text-primary font-semibold">camarote exclusivo</span>, 
                com toda a estrutura e conforto que você merece.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">1950</p>
                <p className="text-xs text-foreground/60 mt-1">Inauguração</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">78k</p>
                <p className="text-xs text-foreground/60 mt-1">Capacidade</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">∞</p>
                <p className="text-xs text-foreground/60 mt-1">Emoções</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <img
                src={playersCelebrating}
                alt="Torcida no Maracanã"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              {/* Purple gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/20" />
              
              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-primary/30">
                  <p className="text-sm text-foreground/80">
                    <span className="text-primary font-semibold">Sua chance</span> de fazer parte dessa história
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/15 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MaracanaSection;
