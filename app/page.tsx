"use client";

import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; 
import { Shield, Lock, Activity, Wallet, ChevronRight, Globe, Zap, Server } from "lucide-react";
import { Shield, Lock, Activity, Wallet, ChevronRight, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState("1");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [txCount, setTxCount] = useState(1240);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = () => {
    if (!amount) return;
    setIsEncrypting(true);
    setStatus("encrypting");
    setTimeout(() => {
      setStatus("success");
      setIsEncrypting(false);
      setAmount("");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
      {/* Логотип по центру */}
      <nav className="border-b border-gray-800 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 w-1/3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500 hidden md:block uppercase tracking-widest">Network: Arcium MXE</span>
        </div>
        
        <div className="flex justify-center w-1/3">
          <img src="/logo.png" alt="Arcium Logo" className="h-8 invert brightness-200" />
        </div>

        <div className="w-1/3 flex justify-end">
  <WalletMultiButton className="!bg-white !text-black !px-6 !py-2 !rounded-full hover:!bg-purple-400 !transition-all !font-bold !text-[10px] !uppercase !tracking-widest !h-auto !leading-none shadow-lg shadow-white/5" />
</div>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-6 mt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-purple-500 to-transparent" />
            <h2 className="text-6xl font-black mb-4 tracking-tighter leading-none uppercase">
              Private <br />
              <span className="text-purple-500">Execution.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md border-l border-gray-800 pl-4">
              Decentralized confidential computing for Solana traders. Your strategy remains hidden.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-800 rounded-xl bg-gray-900/20 backdrop-blur hover:bg-purple-500/5 transition group cursor-default">
              <Lock className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition" />
              <h3 className="font-bold text-xs uppercase tracking-tighter">Zero-Leakage</h3>
              <p className="text-[10px] text-gray-500 mt-1">Multi-Party Computation (MPC)</p>
            </div>
            <div className="p-4 border border-gray-800 rounded-xl bg-gray-900/20 backdrop-blur hover:bg-blue-500/5 transition group cursor-default">
              <Zap className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition" />
              <h3 className="font-bold text-xs uppercase tracking-tighter">Live Activity</h3>
              <p className="text-[10px] text-gray-400 mt-1">{txCount.toLocaleString()} Shards Processed</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-gray-800 rounded-2xl p-8 bg-gray-900/10 backdrop-blur-xl relative shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold tracking-widest uppercase">
              <span>Order Terminal</span>
              <span className="flex items-center gap-1"><Globe className="w-3 h-3 animate-spin-slow" /> Global MXE</span>
            </div>

            <div className="space-y-2">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00 SOL"
                className="w-full bg-black/50 border border-gray-800 rounded-lg p-5 text-3xl focus:border-purple-500 outline-none transition placeholder:text-gray-800 font-bold"
              />
            </div>

            <div className="bg-black/80 p-5 rounded-lg border border-gray-800 font-mono text-[10px] h-40 overflow-y-auto custom-scrollbar shadow-inner">
              <p className="text-purple-500 font-bold mb-2">{"//"} ESTABLISHING SECURE CHANNEL...</p>
              <p className="text-gray-500">{"[INFO] Initializing Arcium Node Cluster"}</p>
              {status === "encrypting" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-1">
                  <p className="text-yellow-500 animate-pulse">{"> SPLITTING DATA INTO 32 SHARDS"}</p>
                  <p className="text-yellow-500 animate-pulse">{"> DISTRIBUTING TO MXE NODES"}</p>
                </motion.div>
              )}
              {status === "success" && (
                <div className="mt-2 text-green-500 border-t border-gray-800 pt-2">
                  <p>{"> CONFIDENTIAL COMPUTATION COMPLETE"}</p>
                  <p className="text-gray-400">{"[TXID]: hidden_by_arcium_protocol"}</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleTrade}
              disabled={isEncrypting}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-5 rounded-lg transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-3 uppercase text-sm tracking-widest"
            >
              {isEncrypting ? "Encrypting..." : "Execute Private Trade"}
              {!isEncrypting && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Анимированный Шар (Data Transfer Sphere) */}
      <div className="mt-20 relative flex justify-center items-center h-[400px] overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative w-80 h-80 rounded-full border border-gray-800 flex justify-center items-center shadow-inner shadow-purple-500/10"
        >
          {/* Имитация передачи данных */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
              animate={{
                x: [Math.cos(i) * 160, 0, Math.cos(i) * 160],
                y: [Math.sin(i) * 160, 0, Math.sin(i) * 160],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
          <Globe className="w-20 h-20 text-gray-800 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-t border-purple-500/30 rotate-45" />
          <div className="absolute inset-0 rounded-full border-b border-blue-500/30 -rotate-45" />
        </motion.div>
        
        <div className="absolute bottom-10 text-center space-y-2">
          <p className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase underline decoration-purple-500 underline-offset-8">
            Real-time MXE Network Propagation
          </p>
        </div>
      </div>

      <footer className="p-12 border-t border-gray-900 text-center">
        <p className="text-[9px] text-gray-700 tracking-widest uppercase italic">
          Built for Arcium x Solana Hackathon // No private keys are ever stored on-chain.
        </p>
      </footer>
    </main>
  );
}