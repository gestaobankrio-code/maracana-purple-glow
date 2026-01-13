import { motion } from "framer-motion";

const FloatingPlayers = () => {
  const players = [
    { id: 1, left: "5%", top: "20%", delay: 0, scale: 0.8 },
    { id: 2, right: "5%", top: "30%", delay: 0.5, scale: 0.9 },
    { id: 3, left: "8%", bottom: "25%", delay: 1, scale: 0.7 },
    { id: 4, right: "8%", bottom: "20%", delay: 1.5, scale: 0.85 },
  ];

  return (
    <>
      {players.map((player) => (
        <motion.div
          key={player.id}
          className="fixed pointer-events-none z-20 hidden lg:block"
          style={{
            left: player.left,
            right: player.right,
            top: player.top,
            bottom: player.bottom,
            transform: `scale(${player.scale})`,
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            y: [100, 0, 0, -100],
          }}
          transition={{
            duration: 8,
            delay: player.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        >
          {/* Stylized Football Player Silhouette */}
          <svg
            width="120"
            height="200"
            viewBox="0 0 120 200"
            className="drop-shadow-2xl"
          >
            {/* Head */}
            <circle cx="60" cy="25" r="18" fill="hsl(258 96% 70%)" />
            
            {/* Body/Jersey - Purple */}
            <path
              d="M30 50 L40 45 L60 40 L80 45 L90 50 L95 90 L85 95 L75 130 L45 130 L35 95 L25 90 Z"
              fill="hsl(258 96% 70%)"
            />
            
            {/* Arms */}
            <path
              d="M25 50 L15 75 L25 80 L35 60 Z"
              fill="hsl(258 96% 70%)"
            />
            <path
              d="M95 50 L105 75 L95 80 L85 60 Z"
              fill="hsl(258 96% 70%)"
            />
            
            {/* Jersey Number */}
            <text
              x="60"
              y="95"
              textAnchor="middle"
              fill="white"
              fontSize="24"
              fontWeight="bold"
              fontFamily="Bebas Neue, sans-serif"
            >
              10
            </text>
            
            {/* Shorts - White */}
            <path
              d="M45 130 L40 165 L55 165 L60 145 L65 165 L80 165 L75 130 Z"
              fill="white"
            />
            
            {/* Legs */}
            <rect x="42" y="165" width="16" height="30" fill="hsl(258 96% 70%)" rx="2" />
            <rect x="62" y="165" width="16" height="30" fill="hsl(258 96% 70%)" rx="2" />
            
            {/* Soccer Ball */}
            <circle cx="100" cy="185" r="12" fill="white" stroke="hsl(258 96% 70%)" strokeWidth="1" />
            <path
              d="M94 185 L100 180 L106 185 L103 192 L97 192 Z"
              fill="hsl(258 96% 70%)"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
};

export default FloatingPlayers;
