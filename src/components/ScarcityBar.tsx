import { motion } from "framer-motion";
import { AlertTriangle, Flame, Clock } from "lucide-react";

interface ScarcityBarProps {
  availableTickets: number;
  totalTickets: number;
}

const ScarcityBar = ({ availableTickets, totalTickets }: ScarcityBarProps) => {
  const percentage = (availableTickets / totalTickets) * 100;
  const usedPercentage = 100 - percentage;
  
  // Determina a urgência baseado na porcentagem disponível
  const getUrgencyLevel = () => {
    if (percentage <= 20) return "critical";
    if (percentage <= 40) return "high";
    if (percentage <= 60) return "medium";
    return "normal";
  };

  const urgency = getUrgencyLevel();

  const getBarColor = () => {
    switch (urgency) {
      case "critical":
        return "from-red-500 to-red-600";
      case "high":
        return "from-orange-500 to-red-500";
      case "medium":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-primary to-primary/80";
    }
  };

  const getMessage = () => {
    if (percentage <= 20) {
      return {
        icon: AlertTriangle,
        text: "🔥 ÚLTIMOS INGRESSOS! Restam apenas " + availableTickets + "!",
        color: "text-red-400"
      };
    }
    if (percentage <= 40) {
      return {
        icon: Flame,
        text: "⚡ Ingressos acabando rápido! Garanta o seu!",
        color: "text-orange-400"
      };
    }
    if (percentage <= 60) {
      return {
        icon: Clock,
        text: "⏰ Mais de " + Math.round(usedPercentage) + "% já preenchido!",
        color: "text-yellow-400"
      };
    }
    return {
      icon: Clock,
      text: "Vagas limitadas - inscreva-se agora!",
      color: "text-primary"
    };
  };

  const message = getMessage();
  const MessageIcon = message.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      {/* Mensagem de urgência */}
      <motion.div 
        className={`flex items-center justify-center gap-2 mb-3 ${message.color}`}
        animate={urgency === "critical" ? { 
          scale: [1, 1.02, 1],
        } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <MessageIcon className="w-4 h-4" />
        <span className="text-sm font-semibold">{message.text}</span>
      </motion.div>

      {/* Barra de progresso */}
      <div className="relative">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>0</span>
          <motion.span 
            className="text-foreground font-semibold"
            animate={urgency !== "normal" ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {availableTickets} disponíveis
          </motion.span>
          <span>300</span>
        </div>
        
        <div className="h-3 bg-border/50 rounded-full overflow-hidden relative">
          {/* Barra preenchida (ingressos já usados) */}
          <motion.div
            className={`h-full bg-gradient-to-r ${getBarColor()} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${usedPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Efeito de brilho */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
          
          {/* Indicador pulsante no final */}
          {urgency !== "normal" && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg"
              style={{ left: `calc(${usedPercentage}% - 8px)` }}
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 0 0 rgba(255,255,255,0.4)",
                  "0 0 0 8px rgba(255,255,255,0)",
                  "0 0 0 0 rgba(255,255,255,0)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Texto adicional de escassez */}
        {urgency === "critical" && (
          <motion.p
            className="text-center text-xs text-red-400 mt-2 font-medium"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ⚠️ Não perca sua chance! Os últimos ingressos estão sendo reservados agora!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default ScarcityBar;
