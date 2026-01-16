import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, MapPin, Clock, Sparkles } from "lucide-react";

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
  "Mariana V.",
  "Bruno S.",
  "Carolina A.",
  "Daniel R.",
  "Rafaela M.",
];

// Lista de cidades
const cities = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Brasília, DF",
  "Salvador, BA",
  "Curitiba, PR",
  "Fortaleza, CE",
  "Recife, PE",
  "Porto Alegre, RS",
  "Campinas, SP",
  "Niterói, RJ",
  "Santos, SP",
  "Goiânia, GO",
  "Manaus, AM",
  "Florianópolis, SC",
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
      const randomSeconds = Math.floor(Math.random() * 50) + 10;
      
      setCurrentName(randomName);
      setCurrentCity(randomCity);
      setTimeAgo(randomSeconds < 60 ? `${randomSeconds} segundos atrás` : `${Math.floor(randomSeconds / 60)} min atrás`);
      setIsVisible(true);

      // Esconde após 8 segundos (aumentado)
      setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    };

    // Mostra o primeiro popup após 4 segundos
    const initialTimeout = setTimeout(showPopup, 4000);

    // Depois repete a cada 12-22 segundos
    const interval = setInterval(() => {
      if (!isVisible) {
        showPopup();
      }
    }, Math.random() * 10000 + 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -500, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -500, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 150 }}
          className="fixed bottom-8 left-8 z-50 max-w-sm md:max-w-md"
        >
          <motion.div 
            className="bg-background/95 backdrop-blur-xl border-2 border-primary/40 rounded-2xl p-5 md:p-6 shadow-2xl shadow-primary/30 relative overflow-hidden"
            animate={{ 
              boxShadow: [
                "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
                "0 25px 50px -12px rgba(147, 51, 234, 0.4)",
                "0 25px 50px -12px rgba(147, 51, 234, 0.25)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Glow effect no topo */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
            
            {/* Sparkles animados */}
            <motion.div
              className="absolute top-3 right-3"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>

            <div className="flex items-start gap-4">
              {/* Avatar com ícone */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex-shrink-0"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                  <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                </div>
              </motion.div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <motion.p 
                  className="text-lg md:text-xl font-bold text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentName}
                </motion.p>
                
                <motion.div 
                  className="flex items-center gap-1.5 text-sm md:text-base text-foreground/70 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{currentCity}</span>
                </motion.div>
                
                <motion.p 
                  className="text-base md:text-lg text-primary font-semibold mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  ✨ Acabou de se inscrever!
                </motion.p>
                
                <motion.div 
                  className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Clock className="w-3 h-3" />
                  <span>{timeAgo}</span>
                </motion.div>
              </div>
            </div>
            
            {/* Barra de progresso animada */}
            <motion.div 
              className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-b-2xl"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
            />

            {/* Partículas decorativas */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/40 rounded-full"
                style={{ 
                  top: `${20 + i * 25}%`,
                  right: `${10 + i * 5}%`
                }}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3 
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofPopup;