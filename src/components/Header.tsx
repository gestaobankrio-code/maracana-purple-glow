import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl italic text-foreground tracking-wider">
            Invest<span className="text-primary">Smart</span>
          </span>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-medium">XP</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#sobre" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            O Camarote
          </a>
          <a href="#como-participar" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Como Participar
          </a>
          <a href="#inscricao" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Inscreva-se
          </a>
        </nav>

        <a
          href="#inscricao"
          className="gradient-purple px-6 py-2 rounded-full font-display text-lg tracking-wide text-foreground hover:scale-105 transition-transform box-glow"
        >
          PARTICIPE
        </a>
      </div>
    </motion.header>
  );
};

export default Header;
