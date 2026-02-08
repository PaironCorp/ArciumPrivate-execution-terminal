"use client";

import React, { useState, useEffect } from "react";
import { Shield, Lock, Activity, Wallet, ChevronRight } from "lucide-react";

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

  const connectWallet = () => {
    alert("Arcium Demo Mode: Wallet connection is simulated.");
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      <nav className="border-b border-gray-800 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h1 className="text-xl font-bold tracking-tighter">PRIVATE PERPS</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <button 
            onClick={connectWallet}
            className="bg-white text-black px-4 py-2 rounded hover:bg-purple-400 transition font-bold flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" /> Connect Wallet
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-6 mt-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Trade Invisible.
            </h2>
            <p className="text-gray-400 text-lg">
              Execute leverage trades on Solana without revealing your position size. 
              Powered by <span className="text-white font-bold">Arcium</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-800 rounded bg-gray-900/50">
              <Lock className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-bold text-sm">MEV Resistant</h3>
            </div>
            <div className="p-4 border border-gray-800 rounded bg-gray-900/50">
              <Activity className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="font-bold text-sm">{txCount.toLocaleString()} TX</h3>
            </div>
          </div>
        </div>

        <div className="border border-gray-800 rounded-xl p-8 bg-gray-900/30 relative">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase text-[10px]">Position Size (SOL)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-gray-700 rounded p-4 text-2xl focus:border-purple-500 outline-none"
              />
            </div>

            <div className="bg-black/80 p-4 rounded border border-gray-800 font-mono text-[10px] h-32 overflow-y-auto">
              <p className="text-gray-600 font-bold mb-1">// ARCIUM_LOGS</p>
              <p className="text-gray-500">{"System Ready..."}</p>
              {status === "encrypting" && (
                <div className="mt-1">
                  <p className="text-yellow-500 animate-pulse">{"Initializing MXE..."}</p>
                  <p className="text-yellow-500 animate-pulse">{"Encrypting Order..."}</p>
                </div>
              )}
              {status === "success" && (
                <div className="mt-1">
                  <p className="text-green-500">{"Order Encrypted."}</p>
                  <p className="text-gray-400">{"Tx: Hidden"}</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleTrade}
              disabled={isEncrypting}
              className="w-full bg-white text-black font-black py-4 rounded hover:bg-purple-500 hover:text-white transition disabled:opacity-50 flex justify-center items-center gap-2 uppercase"
            >
              {isEncrypting ? "Processing..." : "Open Private Position"}
              {!isEncrypting && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}