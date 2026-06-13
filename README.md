# 🌌 AstroGem - Astrological & AI Gemstone Intelligence Platform

<p align="center">
  <img src="https://img.shields.io/badge/ASTROGEM-AI-4b5320?style=for-the-badge" alt="Astrogem AI">
  <img src="https://img.shields.io/badge/NODE.JS-6cc24a?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/EXPRESS.JS-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MONGODB-47a248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/REACT-20232a?style=for-the-badge&logo=react&logoColor=61dafb" alt="React">
  <img src="https://img.shields.io/badge/GEMINI%20AI-1a73e8?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini AI">
</p>

<p align="center">
  <strong>A modern, full-stack astrological analysis & gemstone recommendation platform 🔮</strong>
</p>

<p align="center">
  <a href="#-about-the-project">About The Project</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-available-scripts">Available Scripts</a>
</p>

---

## 📖 About The Project

AstroGem is a comprehensive astrological intelligence and gemstone recommendation solution. Built with modern web technologies, it offers a seamless calculations experience, featuring real-time AI alignments using Google Gemini, local rules fallbacks, and a sleek glassmorphic dashboard design.

### ✨ Live Demo

* 🌐 **Live Website**: [https://gem-stone-recommendation-iofc.vercel.app/](https://gem-stone-recommendation-iofc.vercel.app/)
* 🚀 **Local Development Ready** - Clone and run with `npm run dev`
* 🌐 **Production Deployed on Vercel**

---

## ⚡ Quick Start

To quickly get started with local development:
```bash
npm run install:all
npm run dev
```

---

## 🚀 Key Features

* **Dual-Mode Recommendation Engine**:
  * **Gemini AI Alignment**: If a `GEMINI_API_KEY` is provided, AstroGem calls Google Gemini (`gemini-1.5-flash`) via an optimized, dependency-free `fetch` pipeline. The AI evaluates birth parameters and maps challenges/intentions (career, finance, health) to the exact catalog of gemstones present in the database.
  * **Fail-Safe Local Engine**: If the Gemini API is unavailable or the key is not set, a local rule-based engine automatically takes over, calculating compatible gemstones using traditional zodiac and ruling planet models.
* **Modern Glassmorphic UI**: Beautiful dark mode and a customized high-contrast light mode with smooth transitions, custom typography, and micro-animations.
* **Comprehensive Dashboard & Logs**: Users can review their astrological profile, get personalized wearing methods (day, metal, finger, purification rituals), search their history, and download reports.
* **Unified Management**: Built-in workspace scripts to manage client-server installations, seeds, and local hot reloading out of the box.

---

## 🎮 Usage

### For Users
1. **Create Account / Login**: Register to track your recommendation history and secure your profile reports.
2. **Calculate Alignments**: Input your name, gender, birth date, time, and city, along with your career, financial, and health intentions.
3. **AI Recommendation**: The system evaluates your chart and presents your compatibility percentage along with ruling planet details.
4. **Purification & Wear**: Follow step-by-step guidance on purifying the gemstone, recommended wearing metal, finger, day of the week, and Vedic mantras.
5. **Horoscope & Profiles**: Review your detailed astrological zodiac details directly in your personalized dashboard.

### For Developers
1. **Fallback Testing**: Leave `GEMINI_API_KEY` empty to test the deterministic rules-based calculations.
2. **Custom Prompts**: Adjust system instruction inputs in `backend/utils/recommendationEngine.js` to modify the recommendation parameters.

---

## 🚀 Installation

### Prerequisites
Before you begin, ensure you have the following:
* **Node.js** (v18 or higher)
* **Git** (for cloning the repository)
* **MongoDB Atlas account** (cloud database - already configured)

*Note: Database collections are automatically seeded with default gemstone factsheets and horoscopes upon server startup!*

### Step 1: Clone the Repository
<!-- ```bash
git clone https://github.com/dilpreetsingh61/GemStone_Recommendation.git
cd GemStone_Recommendation
``` -->

### Step 2: Install Dependencies
From the root directory, run the workspace command to install dependencies for both the frontend and backend:
```bash
npm run install:all
```

### Step 3: Environment Configuration
Create a `.env` file in the `backend` folder:
```env
# Database Configuration
MONGODB_URI=mongodb+srv://astrogemadmin:Akshitrana11@be.ge1mhr7.mongodb.net/astrogem?appName=BE

# Server Configuration
PORT=5000
NODE_ENV=development

# Session Secret
JWT_SECRET=dev_secret_key_astrogem_2026

# Google Gemini API (Optional)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 4: Database Setup
The server automatically sets up the database collection models and imports the initial datasets on startup. There is no manual SQL or database seeding script required.

---

## 🌐 Deployment

### Local Development
The project runs locally with front-and-backend concurrently:
* Frontend runs on: [http://localhost:5173](http://localhost:5173)
* Backend API runs on: [http://localhost:5000](http://localhost:5000)

### Production Deployment
* **Backend Hosting**: Vercel Serverless Functions
* **Frontend Hosting**: Vercel Static Hosting
* **Database**: MongoDB Atlas cloud cluster

---

## ⚙️ Available Scripts

### Development:
```bash
npm run dev         # Starts backend (nodemon) and frontend (Vite) concurrently
npm run dev:backend # Starts the Express API server with hot reloading
npm run dev:frontend # Starts the Vite dev server for frontend UI edits
```

### Production Build:
```bash
npm run build       # Compiles the production-ready static assets in frontend/dist
```

---

## 🙏 Acknowledgments

* **Lucide React** - High-quality vector icon assets
* **Google Fonts** - Custom typography (Outfit / Inter / Poppins)
* **Framer Motion** - Fluid micro-animations & transitions
* **Tailwind CSS** - Glassmorphic layout structure
* **MongoDB Atlas** - Reliable document store database
* **Google Gemini API** - Advanced planetary alignments

---

## 📞 Support

For support, email [support@astrogem.com](mailto:support@astrogem.com) or join our Discord channel.

---

## ⭐ Star History

If you find this project helpful, please consider giving it a ⭐!

---

<div align="center">

Made with ❤️ and 🌌 by **Aryan Rana**

<br>

<img src="https://img.shields.io/badge/Astro--Gem-PRO-indigo?style=for-the-badge&logo=astronomy" alt="AstroGem Badge">

</div>
