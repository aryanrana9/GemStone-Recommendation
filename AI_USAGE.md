# 🤖 AI Usage & Integration Declaration

**Project Name:** AstroGem - Astrological & AI Gemstone Intelligence Platform  
**Developer/Submitter:** Aryan Rana  

This document outlines the details of Artificial Intelligence (AI) usage in the AstroGem project, highlighting both the application's runtime integration with the Google Gemini API and the development-time AI assistance.

---

## 🌌 1. Run-time Application AI Integration

The core feature of the AstroGem platform is its dual-mode gemstone recommendation engine, which integrates the **Google Gemini API** to compute personalized results.

### ⚙️ Technical Implementation Details
* **AI Model:** `gemini-1.5-flash` / `gemini-2.0-flash`
* **Purpose:** Evaluates birth date, time, and coordinates alongside user-provided life intentions (career goals, financial goals, health concerns) to recommend a compatible primary gemstone and alternative stones.
* **Code Integration:** Implemented in `backend/utils/recommendationEngine.js` using standard asynchronous `fetch` calls to avoid external SDK weight.
* **Structured JSON Schema:** Configured with `generationConfig: { responseMimeType: "application/json" }` to ensure the model responds with parsed objects matching the database schemas:
  ```json
  {
    "zodiacSign": "string",
    "recommendedGemstoneName": "string",
    "confidenceScore": number,
    "explanation": "string",
    "alternatives": ["string", "string", "string"]
  }
  ```

### 🛡️ Fail-Safe Fallback Mechanism
To ensure absolute reliability and system uptime, we designed a fallback architecture:
* If the `GEMINI_API_KEY` is not present, or if there is a network timeout or invalid token error, the application automatically catches the exception, logs it, and falls back to a **local deterministic rules engine**.
* The local engine resolves compatibility based on Vedic zodiac signs and planetary associations (e.g., Leo -> Sun -> Ruby) to prevent frontend errors.

---

## 🛠️ 2. Development-time AI Assistance

During the build and development phases of AstroGem, AI coding assistance (Antigravity by Google DeepMind) was utilized to optimize productivity, styling, and configuration.

### 📝 Key Tasks Performed via AI Assistance:
1. **Global Styling and Glassmorphism overrides:** Developed high-contrast color mappings, border colors, background rules, and table layouts in `frontend/src/index.css` to build a clean light mode matching the cosmic landing page.
2. **Navbar Navigation Integration:** Implemented client-side routing buttons and UI alignments in the `DashboardLayout.jsx` dashboard header.
3. **Database Asset Repair:** Fixed broken Unsplash photo URLs for the Ruby gemstone cards in the DB seeding script and local databases.
4. **Vercel Deployment Configurations:** Configured Express API routing in `backend/server.js` and created `vercel.json` configurations in both directories to handle serverless middleware and React Router deep link redirects.
5. **Security and Secret Guarding:** Created root-level `.gitignore` rules to keep development databases and keys secure from GitHub public leaks.

---

## 🔒 3. Data Privacy & Security

* **API Key Safety:** All API credentials (`GEMINI_API_KEY`) are kept in secure local `.env` variables or Vercel's encrypted cloud configurations. No keys are exposed in the compiled React frontend.
* **Git Guarding:** Root-level git rules are established to prevent environment keys from being pushed to public GitHub code.
