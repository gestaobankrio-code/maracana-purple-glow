import { motion } from "framer-motion";
import { AlertTriangle, Flame, Clock, Ticket, Zap } from "lucide-react";

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
        return "from-red-500 via-red-600 to-red-700";
      case "high":
        return "from-orange-400 via-orange-500 to-red-500";
      case "medium":
        return "from-yellow-400 via-orange-400 to-orange-500";
      default:
        return "from-primary via-primary/90 to-primary/80";
    }
  };

  const getBgGlow = () => {
    switch (urgency) {
      case "critical":
        return "shadow-red-500/50";
      case "high":
        return "shadow-orange-500/40";
      case "medium":
        return "shadow-yellow-500/30";
      default:
        return "shadow-primary/30";
    }
  };

  const getMessage = () => {
    if (percentage <= 20) {
      return {
        icon: AlertTriangle,
        text: "🔥 ÚLTIMOS INGRESSOS! Restam apenas " + availableTickets + "!",
        subtext: "Não perca sua última chance!",
        color: "text-red-400",
        bgColor: "bg-red-500/20 border-red-500/40"
      };
    }
    if (percentage <= 40) {
      return {
        icon: Flame,
        text: "⚡ Ingressos acabando rápido!",
        subtext: "Garanta o seu antes que acabe!",
        color: "text-orange-400",
        bgColor: "bg-orange-500/20 border-orange-500/40"
      };
    }
    if (percentage <= 60) {
      return {
        icon: Clock,
        text: "⏰ Mais de " + Math.round(usedPercentage) + "% já preenchido!",
        subtext: "A procura está alta!",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20 border-yellow-500/40"
      };
    }
    return {
      icon: Ticket,
      text: "🎟️ Vagas limitadas!",
      subtext: "Inscreva-se agora e garanta sua vaga!",
      color: "text-primary",
      bgColor: "bg-primary/20 border-primary/40"
    };
  };

  const message = getMessage();
  const MessageIcon = message.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="mb-6 sm:mb-8"
    >
      {/* Container principal com borda animada */}
      <motion.div 
        className={`relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 ${message.bgColor} backdrop-blur-sm shadow-2xl ${getBgGlow()} max-w-3xl mx-auto`}
        animate={urgency === "critical" ? { 
          boxShadow: [
            "0 0 20px rgba(239, 68, 68, 0.3)",
            "0 0 40px rgba(239, 68, 68, 0.5)",
            "0 0 20px rgba(239, 68, 68, 0.3)"
          ]
        } : urgency === "high" ? {
          boxShadow: [
            "0 0 15px rgba(249, 115, 22, 0.2)",
            "0 0 30px rgba(249, 115, 22, 0.4)",
            "0 0 15px rgba(249, 115, 22, 0.2)"
          ]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Ícones animados de fundo - ocultos em mobile */}
        {urgency !== "normal" && (
          <>
            <motion.div
              className="absolute top-3 right-3 opacity-20 hidden sm:block"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-current" />
            </motion.div>
            <motion.div
              className="absolute bottom-3 left-3 opacity-20 hidden sm:block"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Ticket className="w-6 h-6 md:w-8 md:h-8 text-current" />
            </motion.div>
          </>
        )}

        {/* Mensagem de urgência principal */}
        <motion.div 
          className={`flex flex-col items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 ${message.color}`}
          animate={urgency === "critical" ? { 
            scale: [1, 1.03, 1],
          } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: urgency !== "normal" ? [0, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <MessageIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </motion.div>
          <span className="text-base sm:text-xl md:text-2xl font-bold text-center px-2">{message.text}</span>
          <span className="text-xs sm:text-sm md:text-base opacity-80">{message.subtext}</span>
        </motion.div>

        {/* Número grande de ingressos disponíveis */}
        <motion.div 
          className="text-center mb-4 sm:mb-6"
          animate={urgency !== "normal" ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.span 
            className={`text-4xl sm:text-5xl md:text-7xl font-black ${message.color}`}
            animate={urgency === "critical" ? { 
              opacity: [1, 0.7, 1],
              textShadow: [
                "0 0 10px currentColor",
                "0 0 30px currentColor",
                "0 0 10px currentColor"
              ]
            } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            {availableTickets}
          </motion.span>
          <span className="block text-sm sm:text-lg md:text-xl text-foreground/70 font-medium mt-1">
            ingressos restantes de {totalTickets}
          </span>
        </motion.div>

        {/* Barra de progresso grande */}
        <div className="relative">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium">
            <span>Esgotado</span>
            <span>Disponível</span>
          </div>
          
          {/* Container da barra com espaço extra para o indicador */}
          <div className="relative h-8 sm:h-10 md:h-12 flex items-center">
            <div className="h-5 sm:h-6 md:h-8 bg-background/50 rounded-full overflow-hidden relative border border-border/50 w-full">
              {/* Barra preenchida (ingressos já usados) */}
              <motion.div
                className={`h-full bg-gradient-to-r ${getBarColor()} rounded-full relative overflow-hidden`}
                initial={{ width: 0 }}
                animate={{ width: `${usedPercentage}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                {/* Efeito de brilho correndo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                />
                
                {/* Partículas brilhantes - menos em mobile */}
                {urgency !== "normal" && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 sm:w-1 h-full bg-white/60"
                    style={{ left: `${30 * i}%` }}
                    animate={{ opacity: [0, 1, 0], scaleY: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Indicador pulsante - posicionado verticalmente no centro */}
            <motion.div
              className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-white shadow-2xl flex items-center justify-center z-10 border-2 border-primary/30"
              style={{ 
                left: `calc(${Math.max(3, Math.min(97, usedPercentage))}% - 12px)`
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.15, 1],
                boxShadow: [
                  "0 0 0 0 rgba(147, 51, 234, 0.4)",
                  "0 0 0 8px rgba(147, 51, 234, 0)",
                  "0 0 0 0 rgba(147, 51, 234, 0)"
                ]
              }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 2 }}
            >
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-500" />
            </motion.div>
          </div>

          {/* Labels abaixo da barra */}
          <div className="flex justify-between text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1.5 sm:mt-2">
            <span>{Math.round(usedPercentage)}% preenchido</span>
            <span>{Math.round(percentage)}% disponível</span>
          </div>
        </div>

        {/* Texto adicional de escassez crítica */}
        {urgency === "critical" && (
          <motion.div
            className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl"
            animate={{ opacity: [1, 0.8, 1], borderColor: ["rgba(239,68,68,0.3)", "rgba(239,68,68,0.6)", "rgba(239,68,68,0.3)"] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <p className="text-center text-xs sm:text-sm md:text-base text-red-400 font-semibold flex items-center justify-center gap-1.5 sm:gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>⚠️ Os últimos ingressos estão sendo reservados AGORA!</span>
            </p>
          </motion.div>
        )}

        {urgency === "high" && (
          <motion.p
            className="text-center text-xs sm:text-sm text-orange-400 mt-3 sm:mt-4 font-medium"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ⏳ Pessoas estão se inscrevendo neste momento...
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ScarcityBar;