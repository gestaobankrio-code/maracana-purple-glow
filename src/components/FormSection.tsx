import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import heroStadium from "@/assets/hero-stadium.jpg";
import { Ticket, Trophy, Sparkles, Clock, ArrowRight } from "lucide-react";

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Inscrição realizada! 🎉",
      description: "Boa sorte no sorteio! Entraremos em contato em breve.",
    });

    setFormData({ name: "", email: "", phone: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const emotionalPoints = [
    { icon: Sparkles, text: "Cada sorteio é uma nova chance" },
    { icon: Trophy, text: "Cada jogo é uma experiência diferente" },
    { icon: Clock, text: "Quanto antes você participa, mais oportunidades acompanha" },
  ];

  return (
    <section
      id="inscricao"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Stadium Background */}
      <div className="absolute inset-0">
        <img
          src={heroStadium}
          alt="Stadium Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>
      
      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Ticket className="w-10 h-10 text-primary" />
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary">
              300
            </h2>
            <span className="font-display text-3xl md:text-4xl text-foreground">ingressos</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-2">
            Vários sorteios
          </h2>
          <p className="font-display text-xl md:text-2xl text-primary">
            Uma experiência que poucos vivem
          </p>
        </motion.div>

        {/* Emotional Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="space-y-3">
            {emotionalPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 justify-center"
              >
                <point.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-foreground/90">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-8 md:p-10 box-glow"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-foreground font-medium mb-2">
                  Nome completo
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  required
                  className="bg-background/50 border-border focus:border-primary h-12"
                />
              </div>

              <div>
                <label className="block text-foreground font-medium mb-2">
                  E-mail
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="bg-background/50 border-border focus:border-primary h-12"
                />
              </div>

              <div>
                <label className="block text-foreground font-medium mb-2">
                  Telefone
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="bg-background/50 border-border focus:border-primary h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 gradient-purple font-display text-lg tracking-wider text-foreground hover:scale-[1.02] transition-transform box-glow-strong disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Participar dos sorteios agora
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Campanha promocional válida enquanto houver ingressos disponíveis
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FormSection;
