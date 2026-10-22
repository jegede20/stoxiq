# StoxIQ — Stock Market Education App

> **"Knowledge Is the First Stock You Should Ever Buy."**

StoxIQ is a responsive, client-side Progressive Web App (PWA) for beginner stock market education across the **United States**, **United Kingdom**, and **Africa**. Built with zero backend, zero authentication, and zero external databases — all learning progress, quiz scores, broker onboarding checklists, and preferences persist locally via `localStorage`.

## Tech Stack

- **Framework:** React + TypeScript + Vite + React Router v6/v7 (`BrowserRouter`)
- **Styling:** Tailwind CSS extended with StoxIQ luxury dark/gold glassmorphism tokens (`Playfair Display` + `Inter`)
- **Charts:** Recharts (Line & Candle views, custom Glass Tier 3 tooltips, animated sparklines)
- **Icons:** Lucide React (`1.5px` outline strokes)
- **Market Data:** Alpha Vantage API (`GLOBAL_QUOTE` 15-min delayed free tier with session caching & seamless educational fallback)
- **PWA & Hosting:** Installable `manifest.json` + offline SPA `sw.js` + `vercel.json` & `public/_redirects` for zero-config Vercel/Netlify deployment

## Local Development

```bash
cd stoxiq
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```
