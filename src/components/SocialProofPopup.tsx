import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

// Lista de nomes fictícios para simular inscrições
const mockNames = [
  "Maria S.",
  "João P.",
  "Ana C.",
  "Carlos M.",
  "Fernanda L.",
  "Roberto A.",
  "Patricia R.",
  "Lucas G.",
  "Camila B.",
  "André F.",
  "Juliana T.",
  "Ricardo N.",
  "Beatriz O.",
  "Gustavo H.",
  "Larissa V.",
  "Marcos D.",
  "Isabela K.",
  "Felipe E.",
  "Amanda S.",
  "Thiago R.",
];

// Lista de cidades
const cities = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Brasília",
  "Salvador",
  "Curitiba",
  "Fortaleza",
  "Recife",
  "Porto Alegre",
  "Campinas",
];

const SocialProofPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const showPopup = () => {
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomMinutes = Math.floor(Math.random() * 5) + 1;
      
      setCurrentName(randomName);
      setCurrentCity(randomCity);
      setTimeAgo(`${randomMinutes} min atrás`);
      setIsVisible(true);

      // Esconde após 4 segundos
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Mostra o primeiro popup após 5 segundos
    const initialTimeout = setTimeout(showPopup, 5000);

    // Depois repete a cada 8-15 segundos
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 7000 + 8000; // Entre 8 e 15 segundos
      setTimeout(showPopup, randomDelay);
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs"
        >
          <div className="bg-background/95 backdrop-blur-lg border border-primary/30 rounded-xl p-4 shadow-2xl shadow-primary/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {currentName}
                </p>
                <p className="text-xs text-foreground/70 mt-0.5">
                  de {currentCity}
                </p>
                <p className="text-xs text-primary font-medium mt-1">
                  acabou de se inscrever!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {timeAgo}
                </p>
              </div>
            </div>
            
            {/* Barra de progresso animada */}
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-primary rounded-b-xl"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofPopup;
