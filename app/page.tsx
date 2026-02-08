"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react"; 
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; 
import { Shield, Lock, Activity, Wallet, ChevronRight, Globe, Zap, Server, Cpu, Github, Twitter, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { signMessage } = useWallet(); 
  const [amount, setAmount] = useState("");
  const [displayValue, setDisplayValue] = useState(""); 
  const [side, setSide] = useState("buy");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [txCount, setTxCount] = useState(1284);

  // Эффект "Глюка" (Glitch)
  useEffect(() => {
    if (status === "encrypting") {
      const interval = setInterval(() => {
        setDisplayValue(Math.random().toString(36).substring(2, 10).toUpperCase());
      }, 80);
      return () => clearInterval(interval);
    } else if (status === "success") {
      setDisplayValue("********"); 
    } else {
      setDisplayValue(amount); 
    }
  }, [status, amount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = async () => {
    if (!amount) return;

    try {
      if (signMessage) {
        const message = new TextEncoder().encode(
          `Arcium Encrypted Trade Request:\n\nSide: ${side.toUpperCase()}\nAmount: ${amount} SOL\nTimestamp: ${Date.now()}\n\nNOTE: This signature validates your intent without revealing data to the public mempool.`
        );
        await signMessage(message);
      }
    } catch (error) {
      console.log("User rejected signature");
      return; 
    }

    setIsEncrypting(true);
    setStatus("encrypting");
    
    setTimeout(() => {
      setStatus("success");
      setIsEncrypting(false);
    }, 3500); 
  };

  return (
    <main className="min-h-screen !bg-black !text-white font-mono overflow-x-hidden relative selection:bg-purple-500/30">
      
      {/* --- НАВИГАЦИЯ --- */}
      <nav className="border-b border-white/5 p-4 flex justify-between items-center bg-black/40 backdrop-blur-xl sticky top-0 z-50 h-28">
        <div className="w-1/3 flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">MXE Cluster Status</span>
            <div className="flex gap-1 mt-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-green-500/40 rounded-sm animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        
        {/* ЦЕНТР: БОЛЬШОЙ ВИКИНГ + МЕНЮ (ИСПРАВЛЕНО) */}
        <div className="w-1/3 flex justify-center relative group h-full items-center">
           <div className="relative cursor-pointer py-4"> {/* Увеличили зону захвата */}
              
              {/* Светящаяся аура (теперь больше) */}
              <div className="absolute inset-0 bg-purple-500/40 rounded-full blur-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Аватар: УВЕЛИЧЕН (h-16 w-16 = 64px) */}
              <img 
                src="/avatar.png" 
                alt="Builder" 
                className="h-16 w-16 rounded-full border-2 border-white/20 group-hover:border-purple-500 transition-all duration-300 relative z-10 object-cover bg-black shadow-2xl" 
              />

              {/* МЕНЮ: ИСПРАВЛЕН БАГ С ИСЧЕЗНОВЕНИЕМ */}
              {/* Используем pt-6 вместо mt-4. Это создает невидимый мост для мышки */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                
                {/* Само тело меню */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-2 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                  <div className="text-[9px] uppercase font-bold text-gray-500 px-2 py-2 tracking-widest text-center mb-1 border-b border-white/5">
                    Connect with Builder
                  </div>
                  
                  <a href="https://x.com/HandOdTech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-colors group/link mb-1">
                    <Twitter className="w-4 h-4 text-blue-400 group-hover/link:text-white transition-colors" />
                    <span>X / Twitter</span>
                  </a>
                  
                  <a href="https://github.com/PaironCorp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-colors group/link">
                    <Github className="w-4 h-4 text-purple-400 group-hover/link:text-white transition-colors" />
                    <span>GitHub Repo</span>
                  </a>
                </div>
              </div>
           </div>
        </div>

        <div className="w-1/3 flex justify-end">
          <div className="wallet-adapter-custom-wrapper">
            <WalletMultiButton className="!bg-white !text-black !px-6 !py-2 !h-auto !rounded-full hover:!bg-purple-400 !transition-all !font-bold !text-[10px] !uppercase !tracking-widest !leading-none shadow-lg shadow-white/5" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 p-8 mt-8 relative z-10 items-start">
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
          <div className="space-y-6">
            
            <h2 className="flex flex-col text-7xl font-black tracking-tighter leading-[0.85] uppercase italic border-l-4 border-purple-500 pl-8 shadow-purple-500/20 shadow-sm">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Private
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"
              >
                Execution.
              </motion.span>
            </h2>

            <p className="text-gray-400 text-base max-w-md leading-relaxed font-light">
              Confidential trade execution for Solana. Your strategy remains invisible to MEV bots thanks to <span className="text-white font-bold uppercase tracking-wider text-xs">Arcium MXE technology</span>.
              <span className="block mt-4 text-xs text-purple-400/80 font-bold uppercase tracking-widest">
                Project for RTG. Ventures | X:@HandOdTech
              </span>
            </p>
          </div>

          <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.01] space-y-6">
            <div className="flex justify-between items-end h-20 gap-2">
              {[40, 70, 45, 90, 65, 80, 30, 50, 85, 40, 60, 75].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", delay: i * 0.1 }}
                  className="w-full bg-purple-500/20 rounded-t-sm"
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              <span>Global MXE Throughput</span>
              <span className="text-purple-500 text-xs animate-pulse">9.2 GB/s</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group relative cursor-help">
              <Lock className="w-5 h-5 text-purple-500 mb-4 group-hover:rotate-12 transition-transform" />
              <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Zero-Leakage</h3>
              <p className="text-[10px] text-gray-500 uppercase italic font-bold">MPC Protocol Active</p>
              
              <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-[#0a0a0a] border border-purple-500/30 rounded-xl text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-[0_0_20px_rgba(168,85,247,0.15)] leading-relaxed">
                <span className="text-purple-400 font-bold block mb-2 tracking-widest text-[10px]">HOW IT WORKS:</span>
                Your trade inputs are split into secret shards. No single node ever sees the full order size or direction.
              </div>
            </div>

            <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group relative cursor-help">
              <Cpu className="w-5 h-5 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Compute Nodes</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold">{txCount.toLocaleString()} Active Nodes</p>

               <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-[#0a0a0a] border border-blue-500/30 rounded-xl text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-[0_0_20px_rgba(59,130,246,0.15)] leading-relaxed">
                <span className="text-blue-400 font-bold block mb-2 tracking-widest text-[10px]">ARCIUM NETWORK:</span>
                Decentralized nodes process your trade blindly using Multi-Party Execution (MXE) simulation.
              </div>
            </div>
          </div>
        </motion.div>

        {/* ПРАВАЯ ЧАСТЬ: ТЕРМИНАЛ */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative group mt-8 lg:mt-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative border border-white/10 rounded-3xl p-8 bg-black/80 backdrop-blur-2xl shadow-2xl">
            <div className="space-y-8">
              
              <div className="flex gap-3 p-1 bg-white/5 rounded-xl border border-white/5">
                <button 
                  onClick={() => setSide("buy")}
                  className={`flex-1 py-4 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${side === 'buy' ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                >
                  Buy / Long
                </button>
                <button 
                  onClick={() => setSide("sell")}
                  className={`flex-1 py-4 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${side === 'sell' ? 'bg-red-500 text-black shadow-lg shadow-red-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                >
                  Sell / Short
                </button>
              </div>

              <div className="relative pt-2">
                <input 
                  type="text" 
                  value={displayValue} 
                  onChange={(e) => status === "idle" && setAmount(e.target.value)}
                  placeholder="0.00 SOL"
                  className={`w-full bg-transparent text-6xl font-black focus:outline-none placeholder:text-white/5 !text-white tracking-tight ${status === 'encrypting' ? 'text-purple-500 blur-[1px] transition-all duration-75' : ''}`}
                />
                <div className="absolute top-0 right-0 text-[10px] text-gray-600 font-bold uppercase tracking-widest italic border border-white/10 px-2 py-1 rounded">Order Size</div>
              </div>

              <div className="bg-black/50 rounded-xl p-6 border border-white/10 font-mono text-xs h-64 overflow-y-auto space-y-3 shadow-inner custom-scrollbar">
                <div className="flex items-center gap-2 text-purple-500/50 italic mb-2 font-bold">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
                  {"//"} ESTABLISHING SECURE CHANNEL...
                </div>
                
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 italic">
                      {`[SYSTEM] Ready for confidential ${side.toUpperCase()} execution...`}
                    </motion.p>
                  )}
                  {status === "encrypting" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                      <p className="text-yellow-500/80 animate-pulse font-bold">{`> SIGNATURE VERIFIED`}</p>
                      <p className="text-purple-400 animate-pulse">{`> SHREDDING INPUT DATA...`}</p>
                      <p className="text-gray-600">{`> Verifying ZK-Proofs on ${txCount} nodes...`}</p>
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500">
                      <div className="flex flex-col gap-2">
                        <div>
                           <p className="font-bold uppercase tracking-tighter text-sm">{"//"} SHIELDED EXECUTION COMPLETE</p>
                           <p className="text-[10px] opacity-70 mt-1 uppercase italic font-bold tracking-widest">
                             MXE_{Math.random().toString(36).substring(7).toUpperCase()}
                           </p>
                        </div>
                        
                        <a 
                          href="https://arcium.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-2 w-full flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500 hover:text-black border border-green-500/50 text-green-400 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all"
                        >
                          View ZK-Proof Explorer <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={handleTrade}
                disabled={isEncrypting}
                className={`w-full font-black py-5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-30 uppercase text-[11px] tracking-[0.25em] flex items-center justify-center gap-2 shadow-2xl ${side === 'buy' ? 'bg-white text-black hover:bg-green-400' : 'bg-white text-black hover:bg-red-400'}`}
              >
                {isEncrypting ? "Encrypting MXE..." : `Execute Private ${side}`}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-32 relative flex justify-center items-center pb-40">
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="relative w-72 h-72 rounded-full border border-white/5 flex justify-center items-center opacity-40 hover:opacity-100 transition-opacity">
          <Globe className="w-16 h-16 text-white/10 animate-pulse" />
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]" animate={{ x: [Math.cos(i) * 140, 0, Math.cos(i) * 140], y: [Math.sin(i) * 140, 0, Math.sin(i) * 140], opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }} />
          ))}
        </motion.div>
      </div>

      <footer className="p-12 border-t border-white/5 text-center bg-black/80 group">
        <p className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase italic">
          Arcium Confidential Computing Layer // Developed for Solana Hackathon 2026
        </p>
        <div className="mt-6 flex justify-center items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] animate-pulse" />
          <span className="text-[9px] text-gray-500 uppercase tracking-[0.4em] font-black">
            Status: Verified MXE Node Provider (Prototype)
          </span>
        </div>
      </footer>

      {/* АВТОРСКИЙ ВИДЖЕТ ВНИЗУ (Оставляем на всякий случай, если вверху не нажмут) */}
      <a 
        href="https://github.com/PaironCorp/arcium-private-perps" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 group cursor-pointer hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-28 h-28 filter grayscale-[50%] contrast-125 group-hover:grayscale-0 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-purple-600 blur-[30px] opacity-20 group-hover:opacity-60 transition-opacity rounded-full" />
          <img 
            src="/avatar.png" 
            alt="Dev Signature" 
            className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
          />
        </motion.div>
      </a>
    </main>
  );
}