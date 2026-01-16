import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles } from "lucide-react";
import camarote from "@/assets/camarote.jpg";
import ScarcityBar from "./ScarcityBar";

// Phone mask utility
const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

const FormSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTickets, setAvailableTickets] = useState(300);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Simula diminuição automática de ingressos para criar urgência
  useEffect(() => {
    // Começa com 300 e diminui gradualmente
    const savedTickets = localStorage.getItem('availableTickets');
    if (savedTickets) {
      setAvailableTickets(parseInt(savedTickets));
    } else {
      // Simula que já venderam alguns ingressos
      const initialTickets = Math.floor(Math.random() * 50) + 180; // Entre 180 e 230
      setAvailableTickets(initialTickets);
      localStorage.setItem('availableTickets', initialTickets.toString());
    }

    // A cada 30-60 segundos, diminui 1-3 ingressos para simular vendas
    const interval = setInterval(() => {
      setAvailableTickets(prev => {
        const decrease = Math.floor(Math.random() * 3) + 1;
        const newValue = Math.max(10, prev - decrease); // Nunca vai abaixo de 10
        localStorage.setItem('availableTickets', newValue.toString());
        return newValue;
      });
    }, Math.random() * 30000 + 30000); // Entre 30 e 60 segundos

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Inscrição realizada! 🎉",
      description: "Boa sorte no sorteio! Entraremos em contato em breve.",
    });

    // Diminui os ingressos disponíveis quando alguém se inscreve
    setAvailableTickets(prev => {
      const newValue = Math.max(10, prev - 1);
      localStorage.setItem('availableTickets', newValue.toString());
      return newValue;
    });

    setFormData({ name: "", email: "", phone: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section
      id="inscricao"
      ref={ref}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Background Image with Parallax and Purple Effect */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={camarote}
          alt="Camarote"
          className="w-full h-[130%] object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/20 to-background" />
        <div className="absolute inset-0 bg-primary/15 mix-blend-overlay" />
      </motion.div>
      
      {/* Animated particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/40 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: -100,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "linear",
          }}
        />
      ))}
      
      <motion.div 
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2 }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <motion.div 
            className="flex items-baseline justify-center gap-3 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <motion.span 
              className="text-6xl md:text-7xl lg:text-8xl text-primary font-bold tracking-tight"
              animate={{ 
                textShadow: [
                  "0 0 20px hsl(258 96% 70% / 0.3)",
                  "0 0 40px hsl(258 96% 70% / 0.5)",
                  "0 0 20px hsl(258 96% 70% / 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              300
            </motion.span>
            <span className="text-2xl md:text-3xl text-foreground font-bold">ingressos</span>
          </motion.div>
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Vários sorteios
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-foreground/60"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Uma experiência que poucos vivem
          </motion.p>
        </motion.div>

        {/* Emotional Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-lg mx-auto mb-14"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <motion.p 
              className="text-foreground/70 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Cada sorteio é uma nova chance
            </motion.p>
            <motion.p 
              className="text-foreground/70 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Cada jogo é uma experiência diferente
            </motion.p>
            <motion.p 
              className="text-primary font-medium flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              Quanto antes você participa, mais oportunidades
            </motion.p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1, type: "spring" }}
          className="max-w-md mx-auto"
        >
          {/* Barra de Escassez */}
          <ScarcityBar availableTickets={availableTickets} totalTickets={300} />

          <motion.form
            onSubmit={handleSubmit}
            className="bg-background/90 backdrop-blur-md border border-primary/20 rounded-2xl p-8 md:p-10 shadow-xl shadow-primary/10"
            whileHover={{ borderColor: "hsl(258 96% 70% / 0.4)" }}
          >
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1 }}
              >
                <label className="block text-foreground text-sm font-medium mb-2">
                  Nome completo
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="bg-background border-border/60 focus:border-primary h-12 rounded-xl transition-all focus:shadow-lg focus:shadow-primary/10"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 }}
              >
                <label className="block text-foreground text-sm font-medium mb-2">
                  E-mail
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="bg-background border-border/60 focus:border-primary h-12 rounded-xl transition-all focus:shadow-lg focus:shadow-primary/10"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.3 }}
              >
                <label className="block text-foreground text-sm font-medium mb-2">
                  Telefone
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                  maxLength={15}
                  className="bg-background border-border/60 focus:border-primary h-12 rounded-xl transition-all focus:shadow-lg focus:shadow-primary/10"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base tracking-wide rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/25"
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      Participar dos sorteios agora
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.p 
                className="text-center text-xs text-muted-foreground pt-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
              >
                Campanha válida enquanto houver ingressos disponíveis
              </motion.p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default FormSection;
