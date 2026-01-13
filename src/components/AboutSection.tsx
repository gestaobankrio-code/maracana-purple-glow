import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import camaroteImg from "@/assets/camarote.jpg";
import ticketCard from "@/assets/ticket-card.png";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: "📺", title: "Vista Privilegiada", desc: "A melhor visão do gramado" },
    { icon: "⭐", title: "Experiência VIP", desc: "Tratamento exclusivo do início ao fim" },
  ];

  return (
    <section id="sobre" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-primary">
      {/* Dotted pattern background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />
      
      {/* Background Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* GARRA text watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.span
          className="font-display text-[20rem] md:text-[30rem] text-white/5 select-none whitespace-nowrap"
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          GARRA GARRA GARRA
        </motion.span>
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            O CAMAROTE
          </motion.h2>
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl text-background"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ WebkitTextStroke: "2px white" }}
          >
            INVESTSMART
          </motion.h2>
          <motion.p
            className="mt-6 text-white text-2xl font-display tracking-widest"
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
              className="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur-xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <img
              src={camaroteImg}
              alt="Camarote InvestSmart"
              className="relative rounded-2xl w-full shadow-2xl"
            />
          </motion.div>

          {/* Features & Ticket */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Ticket Card Image */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="flex justify-center"
            >
              <img
                src={ticketCard}
                alt="Ingresso Torcida InvestSmart"
                className="w-64 md:w-80 drop-shadow-2xl"
              />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-colors group cursor-pointer"
                >
                  <motion.span
                    className="text-4xl mb-4 block"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {feature.icon}
                  </motion.span>
                  <h3 className="font-display text-xl text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
