import { motion } from "framer-motion";
import logoInvestsmart from "@/assets/logo-investsmart.png";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20"
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <a href="#">
            <img
              src={logoInvestsmart}
              alt="InvestSmart XP"
              className="h-6 md:h-8 w-auto"
            />
          </a>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#sobre" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            O Camarote
          </a>
          <a href="#como-participar" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Como Participar
          </a>
          <a href="#faq" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Dúvidas
          </a>
          <a href="#inscricao" className="text-foreground/80 hover:text-primary transition-colors font-medium">
            Inscreva-se
          </a>
        </nav>

        <motion.a
          href="#inscricao"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gradient-purple px-6 py-2 rounded-full font-display text-lg tracking-wide text-foreground box-glow"
        >
          PARTICIPE
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;
