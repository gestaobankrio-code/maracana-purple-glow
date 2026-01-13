import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import playerShield from "@/assets/player-shield.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Set the countdown end date (30 days from now for demo)
  const [endDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const timeUnits = [
    { label: "DIAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/20" />
      
      {/* Dotted pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle, hsl(258 96% 70% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Player Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex justify-center"
          >
            <motion.img
              src={playerShield}
              alt="Jogador com escudo"
              className="w-full max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Countdown Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left mb-10"
            >
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-2">
                TEMPO RESTANTE PARA
              </h2>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary">
                O SORTEIO
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex justify-center lg:justify-start gap-3 md:gap-4">
                {timeUnits.map((unit, index) => (
                  <motion.div
                    key={unit.label}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.4 + index * 0.1,
                    }}
                    className="relative"
                  >
                    <div className="bg-primary/20 backdrop-blur-md border border-primary/30 rounded-xl p-3 md:p-5 min-w-[70px] md:min-w-[100px] group hover:scale-105 transition-transform hover:bg-primary/30">
                      <motion.span
                        key={unit.value}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="block text-3xl md:text-5xl font-display text-foreground text-center"
                      >
                        {String(unit.value).padStart(2, "0")}
                      </motion.span>
                      <span className="block text-xs md:text-sm text-primary font-medium text-center mt-1 tracking-widest">
                        {unit.label}
                      </span>
                    </div>
                    {/* Separator */}
                    {index < timeUnits.length - 1 && (
                      <span className="absolute -right-2 md:-right-3 top-1/2 -translate-y-1/2 text-primary text-2xl md:text-4xl font-bold animate-pulse">
                        :
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center lg:text-left mt-10"
            >
              <motion.a
                href="#inscricao"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block gradient-purple px-10 py-4 rounded-full font-display text-xl tracking-widest text-foreground box-glow-strong"
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

export default CountdownSection;
