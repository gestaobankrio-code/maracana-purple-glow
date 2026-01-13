import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mt-12"
    >
      <p className="text-center text-muted-foreground mb-4 font-medium tracking-wider">
        TEMPO RESTANTE PARA O SORTEIO
      </p>
      <div className="flex justify-center gap-3 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.8 + index * 0.1,
            }}
            className="relative"
          >
            <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-3 md:p-5 min-w-[70px] md:min-w-[100px] box-glow group hover:scale-105 transition-transform">
              <motion.span
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="block text-3xl md:text-5xl font-display text-foreground text-center"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
              <span className="block text-xs md:text-sm text-primary font-medium text-center mt-1">
                {unit.label}
              </span>
            </div>
            {/* Separator */}
            {index < timeUnits.length - 1 && (
              <span className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 text-primary text-2xl md:text-4xl font-bold animate-pulse">
                :
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Countdown;
