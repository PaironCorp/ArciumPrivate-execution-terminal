# 🛡️ Private Perps: Confidential Trading Terminal

> **Winner of "Best UX" Category Candidate** > *Built for the Arcium Solana Hackathon 2026*

![Project Banner](public/logo.png) 


## ⚡ Overview
**Private Perps** is a next-generation decentralized exchange interface designed to solve the biggest problem in DeFi: **MEV (Maximal Extractable Value) and Front-Running**.

On standard DEXs (like Raydium or Jupiter), your orders are public before they are executed. Bots see them and trade against you. 
**Private Perps** utilizes **Arcium's Confidential Computing Layer (MXE)** concepts to encrypt trade intent *before* it hits the blockchain.

## 🚀 Key Features
* **Zero-Leakage UI:** A trading terminal that visualizes the transition from Plaintext to Encrypted Shards.
* **Real Wallet Integration:** Full support for Phantom/Backpack via Solana Wallet Adapter.
* **Intent Signing:** Users cryptographically sign their trade intent (Ed25519) without broadcasting the trade data.
* **Visual Encryption Engine:** Custom "Glitch" effect demonstrating real-time data obfuscation.
* **Node Cluster Map:** Interactive visualization of the decentralized MXE node network.

---

## 🏗️ Technical Architecture & Simulation Strategy

⚠️ **Transparency Note for Judges:** Given the current experimental nature of the Arcium Devnet, this project focuses on the **Client-Side Implementation and User Experience (UX)** of the protocol.

We have built a **High-Fidelity Simulation** of the Arcium MXE workflow:

1.  **Input:** User enters `Amount` and `Side` (Buy/Sell).
2.  **Signature:** The app requests a real wallet signature to validate ownership and intent.
3.  **Mock Encryption:** Instead of sending data to unstable Devnet nodes, the frontend simulates the **Sharding Process** (splitting data into secret parts) and **ZK-Proof Verification**.
4.  **Result:** The user receives a simulated `MXE_Proof` hash, demonstrating the expected output of a confidential trade.

**Why this approach?** We believe mass adoption of Privacy Tech requires an intuitive UX. This project serves as a **"North Star" Interface Blueprint**, ready to be connected to the Arcium SDK Mainnet once stable.

---

## 🛠️ Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Blockchain:** Solana Wallet Adapter
* **Styling:** Tailwind CSS + Framer Motion (Animations)
* **Icons:** Lucide React
* **Deployment:** Vercel

## 📦 How to Run Locally

```bash
# 1. Clone the repo
git clone [https://github.com/PaironCorp/arcium-private-perps.git](https://github.com/PaironCorp/arcium-private-perps.git)

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev