import { motion } from "framer-motion";
import logoInvestsmart from "@/assets/logo-investsmart-new.png";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/10"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center"
        >
          <a href="#">
            <img
              src={logoInvestsmart}
              alt="InvestSmart XP"
              className="h-5 md:h-6 w-auto"
            />
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
