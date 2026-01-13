import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl italic text-foreground tracking-wider">
              Invest<span className="text-primary">Smart</span>
            </span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-medium">
              XP
            </span>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
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
            </div>
            <span className="font-display text-lg text-foreground/80">
              TORCIDA INVESTSMART
            </span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © 2025 InvestSmart. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
