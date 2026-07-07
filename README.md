# Zhiqiao Gong - Portfolio Website

A portfolio website built with React, Vite, and Tailwind CSS, with a serverless message board backed by Neon Postgres. Everything deploys as a single Vercel project.

🌐 Live: [https://zhiqiaogong.com/](https://zhiqiaogong.com/)

## Features

- Interactive particle hero (React Three Fiber) morphing between role-themed shapes
- Experience timeline with scroll-driven progress rail
- Featured project cards with media, scroll reveals, and scrollspy navigation
- Real-time public message board (Vercel Serverless Functions + Neon Postgres)
- Smooth scrolling (lenis) and responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + React Three Fiber
- **API**: Vercel Serverless Functions (`client/api/`)
- **Database**: Neon (serverless PostgreSQL)
- **Hosting**: Vercel

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/ZhiqiaoGong/portfolio.git
cd portfolio/client
npm install
```

2. Frontend only (message board API unavailable locally):

```bash
npm run dev
```

3. Full stack locally (frontend + serverless functions):

```bash
npm i -g vercel
vercel link          # link to the Vercel project once
vercel env pull      # pulls DATABASE_URL into .env.local
vercel dev
```

`DATABASE_URL` (a Neon connection string) is configured in the Vercel project's environment variables.

## Folder Structure

```
portfolio/
└── client/
    ├── api/
    │   └── messages.js       # GET/POST message board endpoints
    ├── public/               # Static assets and project images
    ├── source-media/         # Original high-resolution media (not deployed)
    ├── src/
    │   └── components/
    │       ├── Sidebar.jsx
    │       ├── Spotlight.jsx
    │       ├── Reveal.jsx
    │       ├── IntroSection.jsx
    │       ├── ParticleHero.jsx
    │       ├── ExperienceSection.jsx
    │       ├── ProjectSection.jsx
    │       ├── MessageSection.jsx
    │       └── LeaveMessage.jsx
    └── vite.config.js
```

## Customize

Update experience and project content in the component files under `client/src/components/`.
