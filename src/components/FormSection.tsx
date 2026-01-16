import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles, User, Mail, Phone, Gift, Star, Trophy, Wallet, PartyPopper, X, Clock, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import camarote from "@/assets/camarote.jpg";
import ScarcityBar from "./ScarcityBar";
import confetti from "canvas-confetti";

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
  const backGuardArmedRef = useRef(false);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [exitCountdown, setExitCountdown] = useState(300); // 5 minutos em segundos
  const [availableTickets, setAvailableTickets] = useState(300);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investmentAmount: "",
  });

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

  // Exit intent detection - (funciona melhor no preview/iframe)
  useEffect(() => {
    const EXIT_COUNTDOWN_SECONDS = 5 * 60;

    const triggerExitIntent = () => {
      if (exitIntentShown || showCelebration) return;
      setExitCountdown(EXIT_COUNTDOWN_SECONDS);
      setShowExitIntent(true);
      setExitIntentShown(true);
    };

    // Desktop: exit intent clássico
    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Node | null;
      if (!related && e.clientY <= 0) triggerExitIntent();
    };

    // Desktop/Preview: aproximação do topo
    const handleMouseMoveTop = (e: MouseEvent) => {
      if (e.clientY <= 8) triggerExitIntent();
    };

    // Mobile: intercepta botão "voltar" (popstate)
    const handlePopState = () => {
      if (exitIntentShown || showCelebration) return;
      triggerExitIntent();
      // Impede sair imediatamente; a segunda tentativa após fechar seguirá o fluxo normal
      window.history.pushState(null, "", window.location.href);
    };

    if (isMobile && !backGuardArmedRef.current) {
      backGuardArmedRef.current = true;
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    // Proteção nativa (não permite modal custom)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!exitIntentShown && !showCelebration) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    // Inatividade (45s)
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
  }, [exitIntentShown, showCelebration, isMobile]);


  const scrollToForm = () => {
    setShowExitIntent(false);
    const formElement = document.getElementById('inscricao');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para tocar som de fogos de artifício realista
  const playFireworkSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createFireworkBurst = (startTime: number, intensity: number = 1) => {
      // Som de lançamento (whoosh)
      const launchOsc = audioContext.createOscillator();
      const launchGain = audioContext.createGain();
      launchOsc.connect(launchGain);
      launchGain.connect(audioContext.destination);
      launchOsc.type = 'sawtooth';
      launchOsc.frequency.setValueAtTime(200, startTime);
      launchOsc.frequency.exponentialRampToValueAtTime(800, startTime + 0.3);
      launchGain.gain.setValueAtTime(0.1 * intensity, startTime);
      launchGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      launchOsc.start(startTime);
      launchOsc.stop(startTime + 0.3);

      // Som de explosão (ruído branco + frequências altas)
      const bufferSize = audioContext.sampleRate * 0.5;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      
      const noiseGain = audioContext.createGain();
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 2000 + Math.random() * 2000;
      noiseFilter.Q.value = 0.5;
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      const explosionTime = startTime + 0.4;
      noiseGain.gain.setValueAtTime(0.3 * intensity, explosionTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, explosionTime + 0.4);
      noiseSource.start(explosionTime);
      noiseSource.stop(explosionTime + 0.5);

      // Estouros múltiplos (crackling)
      for (let j = 0; j < 5; j++) {
        const crackOsc = audioContext.createOscillator();
        const crackGain = audioContext.createGain();
        crackOsc.connect(crackGain);
        crackGain.connect(audioContext.destination);
        crackOsc.type = 'square';
        crackOsc.frequency.value = 1000 + Math.random() * 3000;
        
        const crackTime = explosionTime + Math.random() * 0.3;
        crackGain.gain.setValueAtTime(0.08 * intensity, crackTime);
        crackGain.gain.exponentialRampToValueAtTime(0.001, crackTime + 0.05);
        crackOsc.start(crackTime);
        crackOsc.stop(crackTime + 0.05);
      }
    };

    // Sequência de fogos de artifício
    const currentTime = audioContext.currentTime;
    createFireworkBurst(currentTime, 1);
    createFireworkBurst(currentTime + 0.6, 0.8);
    createFireworkBurst(currentTime + 1.1, 1.2);
    createFireworkBurst(currentTime + 1.5, 0.9);
    createFireworkBurst(currentTime + 1.9, 1.1);
    createFireworkBurst(currentTime + 2.3, 0.7);
    createFireworkBurst(currentTime + 2.6, 1);

    // Fanfarre celebratória no final
    setTimeout(() => {
      const fanfareNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      let fanfareTime = audioContext.currentTime;
      
      fanfareNotes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.15, fanfareTime);
        gain.gain.exponentialRampToValueAtTime(0.01, fanfareTime + 0.3);
        
        osc.start(fanfareTime);
        osc.stop(fanfareTime + 0.3);
        
        fanfareTime += 0.12;
      });
    }, 3000);
  };

  // Função para disparar fogos de artifício
  const fireConfetti = () => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // Tocar som de fogos de artifício
    playFireworkSound();

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fogos da esquerda
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#9333ea', '#a855f7', '#c084fc', '#FFD700', '#FF6B6B', '#4ECDC4'],
      });
      // Fogos da direita
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#9333ea', '#a855f7', '#c084fc', '#FFD700', '#FF6B6B', '#4ECDC4'],
      });
    }, 250);
  };

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
    
    // Validação de todos os campos obrigatórios
    if (!formData.name || !formData.email || !formData.phone || !formData.investmentAmount) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Dispara fogos de artifício
    fireConfetti();
    
    // Mostra modal de celebração
    setShowCelebration(true);

    // Diminui os ingressos disponíveis quando alguém se inscreve
    setAvailableTickets(prev => {
      const newValue = Math.max(10, prev - 1);
      localStorage.setItem('availableTickets', newValue.toString());
      return newValue;
    });

    setFormData({ name: "", email: "", phone: "", investmentAmount: "" });
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
            className="flex items-baseline justify-center gap-3 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <motion.span 
              className="text-7xl md:text-8xl lg:text-9xl text-primary font-bold tracking-tight"
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
            <span className="text-3xl md:text-4xl text-foreground font-bold">ingressos</span>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Vários sorteios
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-foreground/60"
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
          className="max-w-lg mx-auto mb-12"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <motion.p 
              className="text-lg text-foreground/70 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
              Cada sorteio é uma nova chance
            </motion.p>
            <motion.p 
              className="text-lg text-foreground/70 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
              Cada jogo é uma experiência diferente
            </motion.p>
            <motion.p 
              className="text-lg text-primary font-semibold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5" />
              Quanto antes você participa, mais oportunidades
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

          {/* Formulário Principal */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl border-2 border-primary/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/20"
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
            <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-3xl" />
            
            {/* Ícones decorativos */}
            <motion.div
              className="absolute top-4 right-4 opacity-30"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Trophy className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div
              className="absolute top-4 left-4 opacity-30"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <Gift className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Header do formulário */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Inscrição Gratuita</span>
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Garanta sua participação
              </h3>
              <p className="text-foreground/60">
                Preencha seus dados e concorra aos ingressos
              </p>
            </div>

            <div className="space-y-6">
              {/* Campo Nome */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1 }}
              >
                <label className="flex items-center gap-2 text-foreground text-sm font-semibold mb-3">
                  <User className="w-4 h-4 text-primary" />
                  Nome completo <span className="text-primary">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  required
                  className="bg-background/80 border-2 border-border/60 focus:border-primary h-14 md:h-16 rounded-xl text-base md:text-lg px-5 transition-all focus:shadow-lg focus:shadow-primary/20 placeholder:text-muted-foreground/50"
                />
              </motion.div>

              {/* Campo Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 }}
              >
                <label className="flex items-center gap-2 text-foreground text-sm font-semibold mb-3">
                  <Mail className="w-4 h-4 text-primary" />
                  E-mail <span className="text-primary">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="bg-background/80 border-2 border-border/60 focus:border-primary h-14 md:h-16 rounded-xl text-base md:text-lg px-5 transition-all focus:shadow-lg focus:shadow-primary/20 placeholder:text-muted-foreground/50"
                />
              </motion.div>

              {/* Campo Telefone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.3 }}
              >
                <label className="flex items-center gap-2 text-foreground text-sm font-semibold mb-3">
                  <Phone className="w-4 h-4 text-primary" />
                  Telefone / WhatsApp <span className="text-primary">*</span>
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                  maxLength={15}
                  className="bg-background/80 border-2 border-border/60 focus:border-primary h-14 md:h-16 rounded-xl text-base md:text-lg px-5 transition-all focus:shadow-lg focus:shadow-primary/20 placeholder:text-muted-foreground/50"
                />
              </motion.div>

              {/* Campo Valor de Investimento */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.35 }}
              >
                <label className="flex items-center gap-2 text-foreground text-sm font-semibold mb-3">
                  <Wallet className="w-4 h-4 text-primary" />
                  Qual o valor aproximado você tem disponível para investir atualmente? <span className="text-primary">*</span>
                </label>
                <Select
                  value={formData.investmentAmount}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, investmentAmount: value }))}
                  required
                >
                  <SelectTrigger className="bg-background/80 border-2 border-border/60 focus:border-primary h-14 md:h-16 rounded-xl text-base md:text-lg px-5 transition-all focus:shadow-lg focus:shadow-primary/20">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-2 border-border/60 rounded-xl">
                    <SelectItem value="ate-50k" className="text-base py-3">Até R$50 mil</SelectItem>
                    <SelectItem value="50k-100k" className="text-base py-3">de R$50 mil a R$100 mil</SelectItem>
                    <SelectItem value="100k-300k" className="text-base py-3">de R$100 mil a R$300 mil</SelectItem>
                    <SelectItem value="300k-1m" className="text-base py-3">de R$300 mil a R$1 milhão</SelectItem>
                    <SelectItem value="acima-1m" className="text-base py-3">acima de R$1 milhão</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Botão de Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 md:h-20 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold text-lg md:text-xl tracking-wide rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 shadow-xl shadow-primary/30"
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="w-7 h-7 border-3 border-primary-foreground border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Gift className="w-6 h-6 flex-shrink-0" />
                      <span>Participar do Sorteio</span>
                      <motion.span
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.span>
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Texto de segurança */}
              <motion.div 
                className="text-center pt-4 space-y-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
              >
                <p className="text-sm text-muted-foreground">
                  🔒 Seus dados estão seguros conosco
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Campanha válida enquanto houver ingressos disponíveis
                </p>
              </motion.div>
            </div>
          </motion.form>
        </motion.div>
      </div>

      {/* Modal de Celebração */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80 backdrop-blur-md"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative bg-gradient-to-b from-background to-background/95 border-2 border-primary/50 rounded-3xl p-8 md:p-12 max-w-md mx-4 shadow-2xl shadow-primary/30 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={() => setShowCelebration(false)}
                className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Ícone animado */}
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="mb-6"
              >
                <PartyPopper className="w-20 h-20 mx-auto text-primary" />
              </motion.div>

              {/* Título */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              >
                Parabéns! 🎉
              </motion.h3>

              {/* Mensagem */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-foreground/80 mb-6"
              >
                Sua inscrição foi realizada com sucesso!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold text-primary mb-8"
              >
                🍀 Boa sorte no sorteio!
              </motion.p>

              {/* Botão fechar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() => setShowCelebration(false)}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold text-lg px-8 py-6 rounded-xl"
                >
                  Fechar
                </Button>
              </motion.div>

              {/* Estrelas decorativas */}
              <motion.div
                className="absolute top-6 left-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 text-primary/50" />
              </motion.div>
              <motion.div
                className="absolute bottom-6 right-6"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-primary/50" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Exit Intent - Popup de saída */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/90 backdrop-blur-lg"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: -100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.3, opacity: 0, y: -100 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative bg-gradient-to-b from-background to-background/95 border-2 border-primary rounded-3xl p-8 md:p-12 max-w-lg mx-4 shadow-2xl shadow-primary/40 text-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Efeito de brilho animado */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />

              {/* Botão fechar */}
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Ícone de alerta animado */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mb-6 relative z-10"
              >
                <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-primary" />
                </div>
              </motion.div>

              {/* Título impactante */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-bold text-foreground mb-3 relative z-10"
              >
                Espere! Você está perdendo uma oportunidade única!
              </motion.h3>

              {/* Timer Countdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring" }}
                className="mb-4 relative z-10"
              >
                <div className="inline-flex items-center gap-3 bg-destructive/20 border border-destructive/40 rounded-xl px-5 py-3">
                  <Clock className="w-5 h-5 text-destructive animate-pulse" />
                  <div className="text-center">
                    <p className="text-xs text-destructive/80 uppercase tracking-wide font-medium">Oferta expira em</p>
                    <motion.p 
                      className="text-2xl font-bold text-destructive font-mono"
                      animate={{ scale: exitCountdown <= 60 ? [1, 1.05, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: exitCountdown <= 60 ? Infinity : 0 }}
                    >
                      {formatCountdown(exitCountdown)}
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* Subtítulo de escassez */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 mb-4 relative z-10"
              >
                <Gift className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">
                  Restam apenas {availableTickets} ingressos!
                </span>
              </motion.div>

              {/* Mensagem persuasiva */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-foreground/80 mb-6 relative z-10"
              >
                Não deixe essa chance escapar! Inscreva-se agora <strong className="text-foreground">gratuitamente</strong> e concorra a ingressos exclusivos para o <strong className="text-primary">Camarote no Maracanã</strong>.
              </motion.p>

              {/* Benefícios rápidos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-2 mb-8 text-sm text-foreground/70 relative z-10"
              >
                <div className="flex items-center gap-2 justify-center">
                  <Gift className="w-4 h-4 text-primary" />
                  <span>Inscrição 100% gratuita</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span>Vários sorteios durante a temporada</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Experiência VIP exclusiva</span>
                </div>
              </motion.div>

              {/* Botões de ação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 relative z-10"
              >
                <Button
                  onClick={scrollToForm}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold text-lg py-6 rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Quero Participar Agora!
                </Button>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Não, prefiro perder essa oportunidade
                </button>
              </motion.div>

              {/* Decorações */}
              <motion.div
                className="absolute top-6 left-6 opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <motion.div
                className="absolute bottom-6 left-6 opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FormSection;