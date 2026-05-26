# Zhiqiao Gong - Portfolio Website

A full-stack portfolio website built with React, Vite, and Tailwind CSS, with an Express + PostgreSQL backend supporting a real-time message board.

🌐 Live: [portfolio-nu-sage-24.vercel.app](https://portfolio-nu-sage-24.vercel.app/)

## Features

- Experience and project sections with images and links
- Real-time message board
- Sidebar navigation with GitHub, LinkedIn, and email links
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS, deployed on Vercel
- **Backend**: Express.js + PostgreSQL, deployed on Render

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/ZhiqiaoGong/portfolio.git
cd portfolio
```

2. Set up environment variables

Create `server/.env`:
```
DATABASE_URL=your_postgresql_connection_string
```

Create `client/.env`:
```
VITE_API_URL=http://localhost:3001
```

3. Install and run the frontend

```bash
cd client
npm install
npm run dev
```

4. Install and run the backend

```bash
cd server
npm install
node index.js
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:3001`.

## Folder Structure

```
portfolio/
├── client/          # React frontend
│   ├── public/      # Static assets and project images
│   ├── src/
│   │   └── components/
│   │       ├── Sidebar.jsx
│   │       ├── ExperienceSection.jsx
│   │       ├── ProjectSection.jsx
│   │       ├── MessageSection.jsx
│   │       └── LeaveMessage.jsx
│   └── vite.config.js
└── server/          # Express backend
    └── index.js
```

## Customize

Update experience and project content in the component files under `client/src/components/`.