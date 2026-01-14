import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import camarote from "@/assets/camarote.jpg";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Inscrição realizada! 🎉",
      description: "Boa sorte no sorteio! Entraremos em contato em breve.",
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
      {/* Background Image with Purple Effect */}
      <div className="absolute inset-0">
        <img
          src={camarote}
          alt="Camarote"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/20 to-background" />
        <div className="absolute inset-0 bg-primary/15 mix-blend-overlay" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 relative">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <div className="flex items-baseline justify-center gap-3 mb-4">
            <span className="text-6xl md:text-7xl lg:text-8xl text-primary font-bold tracking-tight">
              300
            </span>
            <span className="text-2xl md:text-3xl text-foreground font-bold">ingressos</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-3">
            Vários sorteios
          </h2>
          <p className="text-lg md:text-xl text-foreground/60">
            Uma experiência que poucos vivem
          </p>
        </motion.div>

        {/* Emotional Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto mb-14"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-foreground/70">Cada sorteio é uma nova chance</p>
            <p className="text-foreground/70">Cada jogo é uma experiência diferente</p>
            <p className="text-primary font-medium">Quanto antes você participa, mais oportunidades</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-background/90 backdrop-blur-md border border-primary/20 rounded-2xl p-8 md:p-10 shadow-xl shadow-primary/10"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-foreground text-sm font-medium mb-2">
                  Nome completo
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="bg-background border-border/60 focus:border-primary h-12 rounded-xl"
                />
              </div>

              <div>
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
                  className="bg-background border-border/60 focus:border-primary h-12 rounded-xl"
                />
              </div>

              <div>
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
                  className="bg-background border-border/60 focus:border-primary h-12 rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base tracking-wide rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/25"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Participar dos sorteios agora
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-2">
                Campanha válida enquanto houver ingressos disponíveis
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FormSection;
