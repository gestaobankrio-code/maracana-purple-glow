import { motion } from "framer-motion";
import logoInvestSmart from "@/assets/logo-investsmart-footer.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <img
            src={logoInvestSmart}
            alt="InvestSmart XP"
            className="h-9 w-auto opacity-80"
          />

          {/* Divider */}
          <div className="w-16 h-px bg-border/40" />

          {/* Copyright */}
          <p className="text-muted-foreground text-xs">
            © 2026 InvestSmart. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
