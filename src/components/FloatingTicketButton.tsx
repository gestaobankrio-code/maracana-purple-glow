import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

const FloatingTicketButton = () => {
  return (
    <motion.a
      href="#inscricao"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-full shadow-lg shadow-primary/30 cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -5px hsl(258 96% 70% / 0.5)" }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-sm font-semibold whitespace-nowrap">Concorra a um ingresso!</span>
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Ticket className="w-5 h-5" />
      </motion.div>
    </motion.a>
  );
};

export default FloatingTicketButton;
