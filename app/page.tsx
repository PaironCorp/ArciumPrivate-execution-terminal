"use client";

import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; 
import { Shield, Lock, Activity, Wallet, ChevronRight, Globe, Zap, Server, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [txCount, setTxCount] = useState(1268);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = () => {
    if (!amount) return;
    setIsEncrypting(true);
    setStatus("encrypting");
    setTimeout(() => {
      setStatus("success");
      setIsEncrypting(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen !bg-black !text-white font-mono overflow-x-hidden relative selection:bg-purple-500/30">
      
      {/* Навигация */}
      <nav className="border-b border-white/5 p-4 flex justify-between items-center bg-black/40 backdrop-blur-xl sticky top-0 z-50 h-20">
        <div className="w-1/3 flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-600 uppercase tracking-widest font-bold">MXE Cluster Status</span>
            <div className="flex gap-1 mt-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-green-500/40 rounded-sm animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-1/3 flex justify-center">
          <img 
            src="/logo.png" 
            alt="Arcium" 
            className="h-7 w-auto invert brightness-[5] contrast-125" 
          />
        </div>

        <div className="w-1/3 flex justify-end">
          <div className="wallet-adapter-custom-wrapper">
            <WalletMultiButton className="!bg-white !text-black !px-6 !py-2 !h-auto !rounded-full hover:!bg-purple-400 !transition-all !font-bold !text-[10px] !uppercase !tracking-widest !leading-none shadow-lg shadow-white/5" />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 mt-12 relative z-10 items-start">
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-7xl font-black tracking-tighter leading-[0.9] uppercase italic border-l-4 border-purple-500 pl-6 shadow-purple-500/20 shadow-sm">
              Private<br />Execution.
            </h2>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed font-light">
              Decentralized confidential computing for Solana traders. Your strategy remains hidden from MEV bots through <span className="text-white font-bold">Arcium MXE</span>.
            </p>
          </div>

          {/* Новый графический элемент: Интенсивность сети */}
          <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.01] space-y-4">
            <div className="flex justify-between items-end h-16 gap-1">
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
            <div className="flex justify-between items-center text-[8px] text-gray-600 uppercase tracking-widest font-bold">
              <span>Global MXE Throughput</span>
              <span className="text-purple-500">8.4 GB/s</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
              <Lock className="w-4 h-4 text-purple-500 mb-3 group-hover:rotate-12 transition-transform" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1">Zero-Leakage</h3>
              <p className="text-[9px] text-gray-600 uppercase italic font-bold">MPC Protocol Active</p>
            </div>
            <div className="p-5 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
              <Cpu className="w-4 h-4 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1">Compute Nodes</h3>
              <p className="text-[9px] text-gray-400 uppercase font-bold">1 024 Nodes Online</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative border border-white/10 rounded-2xl p-8 bg-black/60 backdrop-blur-2xl shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Trade Terminal</span>
                <Server className="w-3 h-3 text-purple-500 animate-pulse" />
              </div>

              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00 SOL"
                  className="w-full bg-transparent text-4xl font-black focus:outline-none placeholder:text-white/5 !text-white"
                />
                <div className="absolute top-0 right-0 text-[10px] text-gray-700 font-bold uppercase">Size</div>
              </div>

              <div className="bg-black/40 rounded-xl p-5 border border-white/5 font-mono text-[10px] h-44 overflow-y-auto space-y-2 shadow-inner">
                <div className="flex items-center gap-2 text-purple-500/50 italic mb-2 font-bold">
                  <span className="w-1 h-1 bg-purple-500 rounded-full animate-ping" />
                  {"//"} ESTABLISHING SECURE CHANNEL...
                </div>
                <p className="text-gray-600 italic">{"[SYSTEM] Arcium MXE Cluster: Connection Verified"}</p>
                
                <AnimatePresence>
                  {status === "encrypting" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                      <p className="text-yellow-500/80 animate-pulse">{"> SHARDING TRANSACTION DATA"}</p>
                      <p className="text-yellow-500/80 animate-pulse">{"> ENCRYPTING INPUTS WITH MPC"}</p>
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-2 bg-green-500/10 border border-green-500/20 rounded text-green-500">
                      <p className="font-bold uppercase tracking-tighter">{"//"} EXECUTION SUCCESSFUL</p>
                      <p className="text-[8px] opacity-70 mt-1 uppercase italic font-bold">MXE Hash: {Math.random().toString(36).substring(7)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={handleTrade}
                disabled={isEncrypting}
                className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-purple-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-30 uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-white/5"
              >
                {isEncrypting ? "Processing MXE..." : "Execute Private Trade"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-24 relative flex justify-center items-center pb-32">
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative w-64 h-64 rounded-full border border-white/5 flex justify-center items-center opacity-40 hover:opacity-100 transition-opacity"
        >
          <Globe className="w-12 h-12 text-white/10 animate-pulse" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_12px_#a855f7]"
              animate={{
                x: [Math.cos(i) * 120, 0, Math.cos(i) * 120],
                y: [Math.sin(i) * 120, 0, Math.sin(i) * 120],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <div className="absolute -bottom-4 text-center">
          <p className="text-[8px] text-gray-600 font-black tracking-[0.5em] uppercase">
            Real-time MXE Network Propagation
          </p>
          <div className="w-20 h-0.5 bg-purple-500 mx-auto mt-2 shadow-[0_0_10px_#a855f7]" />
        </div>
      </div>

      <footer className="p-10 border-t border-white/5 text-center bg-black/80">
        <p className="text-[8px] text-gray-800 font-bold tracking-[0.3em] uppercase italic">
          Arcium Confidential Computing Layer // Developed for Solana Hackathon 2026
        </p>
      </footer>
    </main>
  );
}