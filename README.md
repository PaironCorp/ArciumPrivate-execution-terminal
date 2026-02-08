# 🛡️ Private Perps: Confidential Trading Terminal

> **Built for Solana Radar Hackathon 2026** | Powered by Arcium

## 🌌 Overview
Standard DEXs reveal your trade intent (Size, Direction, Leverage) to the public mempool, making you vulnerable to MEV bots and copy-traders. **Private Perps** solves this by leveraging **Arcium's Confidential Computing Layer**.

Our terminal encrypts your trade intent *before* it hits the chain. The execution logic (Buy/Sell) happens inside secure MXE enclaves, keeping your strategy invisible.

## ⚡ Key Features
* **Encrypted Intent**: Toggle between `Long/Buy` and `Short/Sell`. The direction is masked from observers until execution.
* **MXE Visualization**: Real-time graph showing the distribution of encrypted shards across the Arcium Network.
* **Zero-Leakage UI**: A terminal-inspired interface designed for privacy-conscious traders.
* **Easter Egg**: A holographic AI guardian ("The Viking") monitors system integrity (Hover bottom-left to reveal).

## 🛠️ Technical Stack
* **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
* **Blockchain**: Solana Wallet Adapter (Phantom/Backpack)
* **Privacy Layer**: Arcium MXE (Multi-Party Execution) Simulation
* **Deployment**: Vercel

## 🚀 How to Run
1.  `npm install`
2.  `npm run dev`
3.  Connect your Solana Wallet (Devnet)