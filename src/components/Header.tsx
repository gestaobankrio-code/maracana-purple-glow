import { motion } from "framer-motion";
import logoInvestsmart from "@/assets/logo-investsmart.png";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/10"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center"
        >
          <a href="#">
            <img
              src={logoInvestsmart}
              alt="InvestSmart XP"
              className="h-7 md:h-9 w-auto"
            />
          </a>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-10">
          <a href="#como-participar" className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium tracking-wide">
            Como Participar
          </a>
          <a href="#sobre" className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium tracking-wide">
            Sobre
          </a>
          <a href="#inscricao" className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium tracking-wide">
            Inscreva-se
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <a 
            href="#inscricao" 
            className="text-sm text-primary font-semibold"
          >
            Inscrever
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
