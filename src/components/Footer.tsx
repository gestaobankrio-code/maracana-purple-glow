import { motion } from "framer-motion";
import logoInvestSmart from "@/assets/logo-investsmart.png";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <motion.div
        className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={logoInvestSmart}
              alt="InvestSmart XP"
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {[
              { icon: "📷", label: "Instagram" },
              { icon: "📘", label: "Facebook" },
              { icon: "🐦", label: "Twitter" },
              { icon: "📺", label: "YouTube" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-xl hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-pointer"
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Badge */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <svg
                width="20"
                height="24"
                viewBox="0 0 100 120"
                className="text-primary"
              >
                <path
                  d="M50 0 L100 20 L100 60 Q100 100 50 120 Q0 100 0 60 L0 20 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                />
              </svg>
            </motion.div>
            <span className="font-display text-lg text-foreground/80 tracking-wider">
              TORCIDA INVESTSMART
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-sm"
          >
            © 2026 InvestSmart. Todos os direitos reservados.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
