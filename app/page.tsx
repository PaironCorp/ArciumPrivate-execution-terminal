"use client";

import { useState, useEffect } from "react";
import { Shield, Lock, Activity, Wallet, ChevronRight } from "lucide-react";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState("1");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [txCount, setTxCount] = useState(1240);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = async () => {
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
    alert("Arcium Demo Mode: Wallet connection is simulated for this prototype.");
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-purple-500/30">
      <nav className="border-b border-gray-800 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h1 className="text-xl font-bold tracking-tighter">PRIVATE PERPS</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1 hidden md:flex">
            <Shield className="w-4 h-4" /> Arcium Protected
          </span>
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
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text leading-tight">
              Trade Invisible.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Execute leverage trades on Solana without revealing your position size. 
              Powered by <span className="text-white font-bold">Arcium</span> confidential computing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-800 rounded bg-gray-900/50 hover:border-purple-500/50 transition">
              <Lock className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-bold text-sm">MEV Resistant</h3>
              <p className="text-xs text-gray-500">No front-running bots.</p>
            </div>
            <div className="p-4 border border-gray-800 rounded bg-gray-900/50 hover:border-blue-500/50 transition">
              <Activity className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="font-bold text-sm">Network Stats</h3>
              <p className="text-xs text-gray-400">{txCount.toLocaleString()} Encrypted Tx</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-800 rounded-xl p-8 bg-gray-900/30 backdrop-blur relative overflow-hidden shadow-2xl shadow-purple-500/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10" />

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest text-[10px]">Position Size (SOL)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-gray-700 rounded p-4 text-2xl focus:border-purple-500 focus:outline-none transition placeholder:text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest text-[10px]">Leverage</label>
              <div className="grid grid-cols-4 gap-2">
                {["1", "2", "5", "10"].map((x) => (
                  <button 
                    key={x}
                    onClick={() => setLeverage(x)}
                    className={`p-2 rounded border transition text-xs font-bold ${
                      leverage === x 
                        ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20" 
                        : "border-gray-700 text-gray-400