"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Star, 
  Shield, 
  MessageCircle, 
  Play,
  Monitor,
  Menu,
  X,
  CreditCard,
  QrCode,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Constante para caminhos no GitHub Pages
const BASE_PATH = '/elite-training';

// --- DATA ---
const PLANOS = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '47',
    desc: 'Ideal para quem está começando agora.',
    features: ['Planilha mensal', 'Guia básico', 'Área do aluno', 'Suporte E-mail'],
    not: ['WhatsApp', 'Personalizado', 'Check-in vídeo'],
    featured: false
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: '97',
    desc: 'O plano mais escolhido para resultados reais.',
    features: ['Planilha dedicada', 'Guia completo', 'Área do aluno', 'Suporte WhatsApp 24h', '100% Personalizado'],
    not: ['Check-in vídeo'],
    featured: true
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '197',
    desc: 'Acompanhamento total e performance máxima.',
    features: ['Plano VIP', 'Nutrição avançada', 'Área do aluno', 'WhatsApp Prioritário', '100% Personalizado', 'Check-in semanal vídeo'],
    not: [],
    featured: false
  }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
      scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-xl font-black tracking-tighter flex items-center gap-1">
          ELITE<span className="text-primary">TRAINING</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Metodologia', 'Resultados', 'Planos', 'Contato'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              {item}
            </a>
          ))}
          <a href="#planos" className="bg-primary text-black text-[10px] font-black px-5 py-2 rounded-full hover:shadow-[0_0_20px_rgba(226,255,0,0.4)] transition-all">
            MATRICULE-SE
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Metodologia', 'Resultados', 'Planos', 'Contato'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-lg font-bold">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CheckoutModal = ({ isOpen, onClose, plan }: any) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('card');

  const handleConfirm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-zinc-950 border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        {step === 1 ? (
          <div className="p-8">
            <div className="mb-8">
              <span className="text-[10px] font-black tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">CHECKOUT SEGURO</span>
              <h3 className="text-2xl font-black mt-3">Finalizar {plan?.name}</h3>
              <p className="text-zinc-400 text-sm mt-1">Insira seus dados para liberar acesso imediato.</p>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
                <span className="text-xl leading-none">⚠️</span>
                <p className="text-xs text-yellow-500/90 font-medium">MODO DEMONSTRAÇÃO: Este formulário não processa pagamentos reais. Não insira dados bancários verdadeiros.</p>
              </div>
            </div>

            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="customerName" className="text-[10px] font-bold text-zinc-500 uppercase">Nome Completo</label>
                  <input id="customerName" name="customerName" required type="text" className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-sm transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="customerEmail" className="text-[10px] font-bold text-zinc-500 uppercase">Seu Melhor E-mail</label>
                  <input id="customerEmail" name="customerEmail" required type="email" className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-sm transition-all" placeholder="john@email.com" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">Método de Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', icon: CreditCard, label: 'Cartão' },
                    { id: 'pix', icon: QrCode, label: 'PIX' },
                    { id: 'boleto', icon: FileText, label: 'Boleto' }
                  ].map(item => (
                    <button 
                      key={item.id}
                      type="button"
                      onClick={() => setMethod(item.id)}
                      className={cn(
                        "flex flex-col items-center justify-center py-3 rounded-xl border transition-all gap-1",
                        method === item.id ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-transparent text-zinc-500 hover:border-white/10"
                      )}
                    >
                      <item.icon size={16} />
                      <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {method === 'card' && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label htmlFor="cardNumber" className="text-[10px] font-bold text-zinc-500 uppercase">Número do Cartão</label>
                    <input id="cardNumber" name="cardNumber" required type="text" inputMode="numeric" autoComplete="off" className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-sm transition-all" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="cardExpiry" className="text-[10px] font-bold text-zinc-500 uppercase">Validade</label>
                      <input id="cardExpiry" name="cardExpiry" required type="text" inputMode="numeric" autoComplete="off" className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-sm transition-all" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="cardCvv" className="text-[10px] font-bold text-zinc-500 uppercase">CVV</label>
                      <input id="cardCvv" name="cardCvv" required type="text" inputMode="numeric" autoComplete="off" className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-sm transition-all" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-black font-black py-4 rounded-2xl mt-4 hover:shadow-[0_0_30px_rgba(226,255,0,0.4)] disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "PROCESSANDO..." : `ASSINAR AGORA — R$ ${plan?.price},00`}
                {!loading && <Shield size={18} />}
              </button>
              
              <p className="text-center text-zinc-600 text-[10px] mt-2 font-bold uppercase tracking-tight">Criptografia de 256 bits · SSL Seguro · Satisfação Garantida</p>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-primary" size={40} />
            </div>
            <h3 className="text-3xl font-black mb-2">BEM-VINDO AO ELITE!</h3>
            <p className="text-zinc-400 text-sm mb-8">Enviamos seus dados de acesso para o e-mail informado. Prepare-se para sua melhor versão.</p>
            <button 
              onClick={onClose}
              className="w-full bg-primary text-black font-black py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(226,255,0,0.4)] transition-all"
            >
              ACESSAR ÁREA DO ALUNO
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  return (
    <div className="bg-black text-white selection:bg-primary/30 min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
              <Zap size={12} fill="currentColor" /> Consultoria Online #1 do Brasil
            </span>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
              O ÚLTIMO <br />
              <span className="text-primary italic">TREINO</span> QUE <br />
              VOCÊ VAI <br />
              PRECISAR.
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mb-10 font-medium">
              Metodologia de elite, suporte direto e resultados que o espelho não pode ignorar. 
              Sua transformação começa no primeiro clique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#planos" className="bg-primary text-black font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(226,255,0,0.3)] hover:-translate-y-1 transition-all group">
                COMEÇAR AGORA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#metodologia" className="bg-white/5 border border-white/10 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                METODOLOGIA
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
              {[
                { n: "+1.2k", label: "ALUNOS" },
                { n: "97%", label: "SUCESSO" },
                { n: "12sem", label: "TRANSFORMAÇÃO" }
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-primary">{stat.n}</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="hidden lg:block relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="relative z-10"
            >
              {/* This would be a high-quality image placeholder */}
              <div className="aspect-[4/5] bg-zinc-900 rounded-[40px] border border-white/10 relative overflow-hidden group">
                 <img src={`${BASE_PATH}/treino.jpg`} alt="Treino Elite" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
                 <div className="absolute inset-6 border border-white/5 rounded-[30px] z-30 pointer-events-none" />
                 <div className="absolute bottom-10 left-10 z-40">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                       <Star className="text-primary" size={14} fill="currentColor" />
                       <span className="text-xs font-black tracking-tighter">PROTOCOLO ELITE</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section id="metodologia" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">O Diferencial</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">SEM ENROLAÇÃO. <br />APENAS <span className="text-primary italic">PERFORMANCE</span>.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: 'Treino Dinâmico', d: 'Planilhas que evoluem com sua carga. Sem platôs.', i: Zap },
              { t: 'Nutrição Real', d: 'Guia prático sem dietas impossíveis ou passar fome.', i: Shield },
              { t: 'Suporte 24h', d: 'Dúvidas resolvidas via WhatsApp pelo próprio treinador.', i: MessageCircle },
              { t: 'Área do Aluno', d: 'Acompanhe seu progresso, medidas e pesos em um só lugar.', i: Users }
            ].map((item, idx) => (
              <motion.div 
                key={item.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900 border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <item.i size={24} />
                </div>
                <h3 className="text-lg font-black mb-3">{item.t}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS / TESTIMONIALS */}
      <section id="resultados" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
             <div className="lg:col-span-1">
                <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">Testemunhos</span>
                <h2 className="text-4xl font-black mt-4 mb-6">QUEM FEZ, <br /><span className="text-primary">AVALIA</span>.</h2>
                <div className="flex items-center gap-1 mb-8">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#e2ff00" className="text-primary" />)}
                   <span className="ml-2 font-bold text-sm">4.9/5 stars</span>
                </div>
                <div className="space-y-4">
                   <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="text-xs text-zinc-500 uppercase font-black mb-1">Média de Perda</div>
                      <div className="text-2xl font-black">7.4 KG <span className="text-sm font-medium text-zinc-600">/ 8 sem</span></div>
                   </div>
                </div>
             </div>

             <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] pointer-events-none" />
                {[
                  { n: 'João Silva', v: 'Perdeu 14kg', t: 'Mudança extrema em 12 semanas. O suporte faz toda a diferença.' },
                  { n: 'Mariana Costa', v: 'Ganhou 6kg massa', t: 'Metodologia sem enrolação. Treinos intensos que cabem no dia.' },
                  { n: 'Rafael Pereira', v: '8% Gordura', t: 'O único programa que funcionou de verdade para mim.' },
                  { n: 'Ana Lima', v: 'Novo PR 5k', t: 'Finalmente adoro treinar. Cada semana evolui comigo.' }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-zinc-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl relative z-10"
                  >
                    <p className="text-zinc-300 text-sm mb-6 font-medium leading-relaxed italic">"{item.t}"</p>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-primary/20 rounded-full" />
                       <div>
                          <div className="text-sm font-black tracking-tight">{item.n}</div>
                          <div className="text-[10px] font-bold text-primary uppercase">{item.v}</div>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-32 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">Investimento</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter">QUAL O SEU <br /><span className="text-primary italic">OBJETIVO?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {PLANOS.map(plano => (
              <motion.div 
                key={plano.id}
                whileHover={{ y: -10 }}
                className={cn(
                  "relative p-8 rounded-[40px] border transition-all duration-500",
                  plano.featured ? "bg-primary text-black border-transparent scale-105 z-20" : "bg-zinc-900 border-white/5 text-white"
                )}
              >
                {plano.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-primary text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest">MOST POPULAR</div>}
                
                <div className="mb-8">
                  <div className={cn("text-xs font-black uppercase tracking-widest", plano.featured ? "text-black/60" : "text-primary")}>{plano.name}</div>
                  <div className="text-5xl font-black mt-2 tracking-tighter">R$ {plano.price}<span className="text-sm font-bold opacity-60">/mês</span></div>
                  <p className={cn("text-sm mt-4 font-medium", plano.featured ? "text-black/70" : "text-zinc-500")}>{plano.desc}</p>
                </div>

                <ul className="space-y-4 mb-10">
                   {plano.features.map(f => (
                     <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                        <CheckCircle size={16} /> {f}
                     </li>
                   ))}
                   {plano.not.map(f => (
                     <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight opacity-30">
                        <X size={16} /> {f}
                     </li>
                   ))}
                </ul>

                <button 
                  onClick={() => setSelectedPlan(plano)}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                    plano.featured ? "bg-black text-primary hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]" : "bg-white/5 hover:bg-primary hover:text-black"
                  )}
                >
                  SELECIONAR PLANO
                </button>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-zinc-600 text-xs mt-12 font-medium">🔒 Pagamento processado de forma segura e criptografada.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
                <a href="#" className="text-2xl font-black tracking-tighter">ELITE<span className="text-primary">TRAINING</span></a>
                <p className="text-zinc-500 mt-6 max-w-sm text-sm">Performance máxima para quem não aceita desculpas. Sua melhor versão começa no treino de hoje.</p>
                <div className="flex gap-4 mt-8">
                   {[Play, Monitor, MessageCircle].map((Icon, i) => (
                     <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                        <Icon size={18} />
                     </a>
                   ))}
                </div>
            </div>

            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">Navegação</h4>
               <ul className="space-y-3">
                 {['Metodologia', 'Resultados', 'Planos', 'Contato'].map(item => (
                   <li key={item}><a href={`#${item.toLowerCase()}`} className="text-zinc-500 hover:text-white text-sm transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">Suporte</h4>
               <p className="text-zinc-500 text-sm mb-4">Dúvidas? Fale com nosso time via WhatsApp.</p>
               <a href="#" className="text-primary font-black uppercase text-xs tracking-widest hover:underline flex items-center gap-2">
                  <MessageCircle size={14} /> (11) 99999-9999
               </a>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
           <div className="text-[10px] font-bold text-zinc-600 uppercase">© {new Date().getFullYear()} ELITE TRAINING · CNPJ 00.000.000/0001-00</div>
           <div className="flex gap-6">
              {['Termos', 'Privacidade', 'Reembolso'].map(item => <a key={item} href="#" className="text-[10px] font-bold text-zinc-600 uppercase hover:text-white transition-colors">{item}</a>)}
           </div>
        </div>
      </footer>

      {/* CHECKOUT MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPlan && (
          <CheckoutModal 
            isOpen={!!selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
            plan={selectedPlan}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
