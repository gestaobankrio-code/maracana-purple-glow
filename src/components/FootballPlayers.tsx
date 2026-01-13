import { motion } from "framer-motion";
import player1 from "@/assets/player-1.png";
import player2 from "@/assets/player-2.png";

const PlayerWithShield = ({ 
  player, 
  position, 
  delay = 0 
}: { 
  player: string; 
  position: "left" | "right"; 
  delay?: number;
}) => {
  const isLeft = position === "left";
  
  return (
    <motion.div
      className={`absolute ${isLeft ? "-left-5 md:left-5 xl:left-20" : "-right-5 md:right-5 xl:right-20"} bottom-10 hidden lg:flex items-end justify-center pointer-events-none z-10`}
      initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
      animate={{ opacity: 0.85, x: 0, y: 0 }}
      transition={{ duration: 1, delay }}
    >
      <div className="relative">
        {/* Shield behind player */}
        <motion.svg
          width="200"
          height="260"
          viewBox="0 0 100 120"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] -z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        >
          <path
            d="M50 5 L95 22 L95 60 Q95 95 50 115 Q5 95 5 60 L5 22 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
          />
        </motion.svg>
        
        {/* Player image */}
        <motion.img
          src={player}
          alt="Jogador de futebol"
          className="h-[280px] md:h-[350px] xl:h-[400px] w-auto object-contain relative z-10"
          style={{ 
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
          }}
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>
    </motion.div>
  );
};

const FootballPlayers = () => {
  return (
    <>
      <PlayerWithShield player={player1} position="left" delay={0.5} />
      <PlayerWithShield player={player2} position="right" delay={0.8} />
    </>
  );
};

export default FootballPlayers;
