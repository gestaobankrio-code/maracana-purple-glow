import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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

  return (
    <section
      id="inscricao"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display italic text-4xl md:text-6xl lg:text-7xl text-foreground mb-2">
            GARANTA SUA
          </h2>
          <h2 className="font-display italic text-5xl md:text-7xl lg:text-8xl text-outline">
            PARTICIPAÇÃO
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card/70 backdrop-blur-lg border border-border/50 rounded-2xl p-8 md:p-10 box-glow"
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
                className="w-full h-14 gradient-purple font-display text-xl tracking-widest text-foreground hover:scale-[1.02] transition-transform box-glow-strong disabled:opacity-50"
              >
                {isSubmitting ? "ENVIANDO..." : "QUERO PARTICIPAR"}
              </Button>

              <p className="text-center text-muted-foreground text-sm">
                Ao se inscrever, você concorda com nossos{" "}
                <a href="#" className="text-primary hover:underline">
                  termos e condições
                </a>
                .
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FormSection;
