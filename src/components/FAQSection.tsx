import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroStadium from "@/assets/hero-stadium.jpg";

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "Quem pode participar do sorteio?",
      answer:
        "Qualquer pessoa maior de 18 anos que seja cliente InvestSmart XP pode participar. Basta preencher o formulário de inscrição com seus dados.",
    },
    {
      question: "Como funciona o sorteio?",
      answer:
        "O sorteio será realizado de forma eletrônica e transparente. Todos os participantes inscritos terão chances iguais de serem sorteados. O resultado será divulgado por e-mail e em nossas redes sociais.",
    },
    {
      question: "O que está incluso no prêmio?",
      answer:
        "O prêmio inclui 2 ingressos para o camarote InvestSmart no Maracanã, com open bar premium, buffet exclusivo, estacionamento VIP e acesso à área lounge com a melhor vista do estádio.",
    },
    {
      question: "Quando será realizado o sorteio?",
      answer:
        "O sorteio será realizado ao final do período de inscrições. O contador regressivo no topo da página mostra exatamente quanto tempo resta para participar.",
    },
    {
      question: "Posso transferir o prêmio para outra pessoa?",
      answer:
        "Não, o prêmio é pessoal e intransferível. O ganhador deverá comparecer ao evento com documento de identificação válido.",
    },
    {
      question: "Como saberei se fui sorteado?",
      answer:
        "Entraremos em contato através do e-mail e telefone cadastrados no formulário de inscrição. Também publicaremos o resultado em nossas redes sociais oficiais.",
    },
  ];

  return (
    <section
      id="faq"
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
        <div className="absolute inset-0 bg-primary/85" />
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)` 
        }} />
      </div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display italic text-4xl md:text-6xl lg:text-7xl text-white/90 mb-2">
            PERGUNTAS
          </h2>
          <h2 className="font-display italic text-5xl md:text-7xl lg:text-8xl text-white">
            FREQUENTES
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 hover:border-white/40 transition-colors overflow-hidden"
                >
                  <AccordionTrigger className="font-display text-lg md:text-xl text-white hover:text-white/80 transition-colors py-5 [&[data-state=open]>svg]:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 pb-5 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
