import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles, Gift, Star, Trophy, Clock, AlertTriangle, FileText, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import camarote from "@/assets/camarote.jpg";
import ScarcityBar from "./ScarcityBar";

const FormSection = () => {
  const ref = useRef(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const backGuardArmedRef = useRef(false);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [exitCountdown, setExitCountdown] = useState(300);
  const [availableTickets, setAvailableTickets] = useState(300);

  // Load Bitrix form script
  useEffect(() => {
    if (formContainerRef.current) {
      // Check if script is already loaded
      const existingScript = document.querySelector('script[data-b24-form="inline/1103/5e8gub"]');
      if (existingScript) return;

      const script = document.createElement('script');
      script.setAttribute('data-b24-form', 'inline/1103/5e8gub');
      script.setAttribute('data-skip-moving', 'true');
      script.async = true;
      script.src = `https://cdn.bitrix24.com.br/b20641853/crm/form/loader_1103.js?${Math.floor(Date.now() / 180000)}`;
      formContainerRef.current.appendChild(script);
    }
  }, []);

  // Countdown timer para o exit intent popup
  useEffect(() => {
    if (showExitIntent && exitCountdown > 0) {
      const timer = setInterval(() => {
        setExitCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showExitIntent, exitCountdown]);

  // Formatar o countdown em MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Exit intent detection
  useEffect(() => {
    const EXIT_COUNTDOWN_SECONDS = 5 * 60;

    const triggerExitIntent = () => {
      if (exitIntentShown) return;
      setExitCountdown(EXIT_COUNTDOWN_SECONDS);
      setShowExitIntent(true);
      setExitIntentShown(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Node | null;
      if (!related && e.clientY <= 0) triggerExitIntent();
    };

    const handleMouseMoveTop = (e: MouseEvent) => {
      if (e.clientY <= 8) triggerExitIntent();
    };

    const handlePopState = () => {
      if (exitIntentShown) return;
      triggerExitIntent();
      window.history.pushState(null, "", window.location.href);
    };

    if (isMobile && !backGuardArmedRef.current) {
      backGuardArmedRef.current = true;
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!exitIntentShown) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        triggerExitIntent();
      }, 45000);
    };

    document.addEventListener("mouseout", handleMouseOut, true);
    document.addEventListener("mousemove", handleMouseMoveTop, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("scroll", resetInactivityTimer, { passive: true });
    window.addEventListener("mousemove", resetInactivityTimer, { passive: true });
    resetInactivityTimer();

    return () => {
      document.removeEventListener("mouseout", handleMouseOut, true);
      document.removeEventListener("mousemove", handleMouseMoveTop);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", resetInactivityTimer);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("popstate", handlePopState);
      clearTimeout(inactivityTimer);
    };
  }, [exitIntentShown, isMobile]);

  const scrollToForm = () => {
    setShowExitIntent(false);
    const formElement = document.getElementById('inscricao');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Simula diminuição automática de ingressos para criar urgência
  useEffect(() => {
    const savedTickets = localStorage.getItem('availableTickets');
    if (savedTickets) {
      setAvailableTickets(parseInt(savedTickets));
    } else {
      const initialTickets = Math.floor(Math.random() * 50) + 180;
      setAvailableTickets(initialTickets);
      localStorage.setItem('availableTickets', initialTickets.toString());
    }

    const interval = setInterval(() => {
      setAvailableTickets(prev => {
        const decrease = Math.floor(Math.random() * 3) + 1;
        const newValue = Math.max(10, prev - decrease);
        localStorage.setItem('availableTickets', newValue.toString());
        return newValue;
      });
    }, Math.random() * 30000 + 30000);

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="inscricao"
      ref={ref}
      className="py-32 md:py-44 relative overflow-hidden"
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
      {[...Array(20)].map((_, i) => (
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
          className="text-center mb-8"
        >
          <motion.div 
            className="flex items-baseline justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <motion.span 
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-primary font-bold tracking-tight"
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
            <span className="text-2xl sm:text-3xl md:text-4xl text-foreground font-bold">ingressos</span>
          </motion.div>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Várias chances de concorrer
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-foreground/60"
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
          className="max-w-lg mx-auto mb-8 sm:mb-12"
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-foreground/70 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span>Cada seleção é uma nova chance</span>
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-foreground/70 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span>Cada jogo é uma experiência diferente</span>
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-primary font-semibold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Quanto antes você participa, mais oportunidades</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1, type: "spring" }}
          className="max-w-xl mx-auto"
        >
          {/* Barra de Escassez */}
          <ScarcityBar availableTickets={availableTickets} totalTickets={300} />

          {/* Formulário Principal - Bitrix Embed */}
          <motion.div
            className="relative bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl border-2 border-primary/30 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-10 lg:p-12 shadow-2xl shadow-primary/20"
            whileHover={{ borderColor: "hsl(258 96% 70% / 0.5)" }}
            animate={{
              boxShadow: [
                "0 25px 50px -12px rgba(147, 51, 234, 0.2)",
                "0 25px 50px -12px rgba(147, 51, 234, 0.35)",
                "0 25px 50px -12px rgba(147, 51, 234, 0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Decoração no topo */}
            <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-2xl md:rounded-t-3xl" />
            
            {/* Ícones decorativos - ocultos em mobile */}
            <motion.div
              className="absolute top-4 right-4 opacity-30 hidden sm:block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </motion.div>
            <motion.div
              className="absolute top-4 left-4 opacity-30 hidden sm:block"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <Gift className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </motion.div>

            {/* Header do formulário */}
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-3 md:mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">Inscrição Gratuita</span>
              </motion.div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1.5 md:mb-2">
                Garanta sua participação
              </h3>
              <p className="text-sm sm:text-base text-foreground/60">
                Preencha seus dados e concorra aos ingressos
              </p>
            </div>

            {/* Bitrix Form Container */}
            <div 
              ref={formContainerRef} 
              className="min-h-[400px] bitrix-form-container"
            />

            {/* Regulamento Link */}
            <div className="mt-6 text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium inline-flex items-center gap-1 text-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Regulamento da Campanha
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-background border-primary/30 mx-2 sm:mx-auto p-4 sm:p-6">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Regulamento
                    </DialogTitle>
                  </DialogHeader>
                  <div className="prose prose-sm prose-invert max-w-none mt-4 text-foreground/80 space-y-4">
                    <h3 className="text-lg font-bold text-primary">Experiência no Camarote Maracanã – InvestSmart</h3>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-bold text-foreground mb-2">1. DO CONCURSO</h4>
                        <p>1.1. O presente concurso cultural, promovido pela InvestSmart, tem por finalidade promover o relacionamento institucional com seus clientes, sem qualquer modalidade de sorte, pagamento ou contraprestação, incentivando a reflexão e a criatividade dos participantes por meio da elaboração de uma frase original sobre o tema: "A importância da educação financeira na vida das pessoas"</p>
                        <p>1.2. O concurso possui caráter exclusivamente cultural, sem qualquer modalidade de sorte, compra vinculada, pagamento ou exigência de contratação de serviços, em conformidade com a legislação aplicável.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">2. PERÍODO DE PARTICIPAÇÃO</h4>
                        <p>2.1. Poderão participar exclusivamente os clientes que tenham aberto conta na InvestSmart, independentemente do motivo da abertura.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">3. COMO PARTICIPAR</h4>
                        <p>3.1. Poderão participar do concurso cultural os clientes da PROMOTORA que atendam aos critérios de elegibilidade definidos pela InvestSmart.</p>
                        <p>3.2. Para participar, o interessado deverá:</p>
                        <p className="pl-4">i. criar uma frase original sobre o tema "A importância da educação financeira na vida das pessoas"; e</p>
                        <p className="pl-4">ii. possuir conta ativa na InvestSmart, observadas as demais condições deste Regulamento.</p>
                        <p>3.3. A participação é totalmente gratuita, sem qualquer exigência financeira ou comercial.</p>
                        <p>3.4. Cada participante poderá ser contemplado 01 vez durante o período de vigência do concurso.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">4. FORMA DE SELEÇÃO</h4>
                        <p>4.1. A escolha do participante contemplado será realizada com base em critérios institucionais e objetivos, definidos pela PROMOTORA, tais como, exemplificativamente:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>criatividade, originalidade, clareza na mensagem, adequação ao tema;</li>
                          <li>perfil de relacionamento com a InvestSmart;</li>
                          <li>aderência ao propósito institucional do evento; e</li>
                          <li>histórico de relacionamento com a empresa.</li>
                        </ul>
                        <p className="mt-2">4.2. A seleção será realizada por comissão interna designada pela PROMOTORA, cuja decisão será soberana e irrecorrível.</p>
                        <p>4.3. Não haverá sorteio, aleatoriedade ou qualquer outro elemento de risco na escolha do participante.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">5. DO PRÊMIO</h4>
                        <p>5.1. O participante selecionado fará jus a 01 (um) par de ingressos para acesso ao Camarote do Estádio do Maracanã, em data e evento previamente definidos pela PROMOTORA.</p>
                        <p>5.2. O prêmio é pessoal, intransferível e não poderá ser convertido em dinheiro, bens ou qualquer outra vantagem.</p>
                        <p>5.3. A data do evento, bem como as condições de acesso ao camarote, será informada diretamente ao participante contemplado.</p>
                        <p>5.4. O acesso ao camarote estará sujeito às normas internas do Estádio do Maracanã, bem como às regras de segurança do evento.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">6. CONDIÇÕES DE UTILIZAÇÃO DO PRÊMIO</h4>
                        <p>6.1. O participante deverá comparecer ao evento no horário informado, portando documento oficial de identificação.</p>
                        <p>6.2. A não utilização do ingresso na data indicada implicará a perda do direito ao prêmio, sem possibilidade de reagendamento ou compensação.</p>
                        <p>6.3. O ingresso não poderá ser cedido, transferido, comercializado ou utilizado para fins diversos daqueles previstos neste regulamento.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">7. USO DE IMAGEM E DIREITOS DE PERSONALIDADE</h4>
                        <p>7.1. Ao participar do concurso, o participante autoriza, de forma gratuita e por prazo indeterminado, a utilização de seu nome, imagem e voz pela PROMOTORA, exclusivamente para fins institucionais, promocionais e de divulgação do concurso.</p>
                        <p>7.2. A autorização concedida neste item não implica qualquer obrigação de pagamento por parte da PROMOTORA.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">8. RESPONSABILIDADE</h4>
                        <p>8.1. A PROMOTORA não se responsabiliza por despesas adicionais do participante, tais como transporte, alimentação, hospedagem ou quaisquer outros custos não expressamente previstos neste regulamento.</p>
                        <p>8.2. A PROMOTORA não se responsabiliza por atos praticados pelo participante que contrariem as normas do Estádio do Maracanã ou da organização do evento.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">9. PROTEÇÃO DE DADOS PESSOAIS</h4>
                        <p>9.1. Os dados pessoais coletados no âmbito deste concurso serão utilizados exclusivamente para fins de operacionalização do concurso, comunicação com os participantes e cumprimento de obrigações legais, nos termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados – LGPD).</p>
                        <p>9.2. De forma facultativa, o participante poderá manifestar seu consentimento expresso para receber comunicações institucionais, educativas e informativas da InvestSmart, por meios físicos ou eletrônicos.</p>
                        <p>9.3. A concessão do consentimento referido no item 9.2 não constitui condição para participação no concurso, não interfere na avaliação das frases e não impacta a elegibilidade do participante.</p>
                        <p>9.4. O consentimento poderá ser revogado a qualquer tempo, mediante solicitação pelos canais oficiais de atendimento da InvestSmart, sem qualquer prejuízo ao participante.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">10. DISPOSIÇÕES GERAIS</h4>
                        <p>10.1. A participação implica a concordância integral com este regulamento.</p>
                        <p>10.2. A InvestSmart poderá alterar datas ou regras por motivos de força maior, garantindo adequada comunicação aos participantes.</p>
                        <p>10.3. Casos omissos serão analisados e decididos pelo Comitê Julgador.</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-2">11. CONTATO</h4>
                        <p>Para dúvidas, entre em contato com o SAC pelo número (21) 99832-1296.</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Texto de segurança */}
            <div className="text-center pt-4 space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                🔒 Seus dados estão seguros conosco
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground/70">
                Campanha válida enquanto houver ingressos disponíveis
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/90 backdrop-blur-lg p-4"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative bg-gradient-to-b from-destructive/20 to-background border-2 border-destructive/50 rounded-3xl p-6 sm:p-8 md:p-10 max-w-lg mx-auto shadow-2xl shadow-destructive/30 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Ícone de alerta */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
                className="mb-4 sm:mb-6"
              >
                <AlertTriangle className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-destructive" />
              </motion.div>

              {/* Timer */}
              <motion.div
                className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-destructive font-mono">
                  {formatCountdown(exitCountdown)}
                </span>
              </motion.div>

              {/* Título */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                Espere! Não vá embora...
              </h3>

              {/* Mensagem */}
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 mb-4 sm:mb-6">
                Você está prestes a perder a chance de <span className="text-primary font-semibold">viver uma experiência única no Camarote do Maracanã!</span>
              </p>

              {/* Stats urgência */}
              <div className="bg-background/50 border border-primary/30 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-foreground/70 mb-1 sm:mb-2">Restam apenas</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{availableTickets} ingressos</p>
                <p className="text-xs sm:text-sm text-foreground/60">de 300 disponíveis</p>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                Quero Participar Agora!
              </motion.button>

              <p className="text-xs sm:text-sm text-foreground/50 mt-3 sm:mt-4">
                Clique acima ou feche para continuar navegando
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FormSection;
