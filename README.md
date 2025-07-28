# Zhiqiao Gong - Portfolio Website

This is a personal portfolio website built with React, Vite, Tailwind CSS, and a simple Express + SQLite backend to support a basic message board feature.

## 🌐 Features

- 📂 Project and experience sections
- 🎨 Responsive design with Tailwind CSS
- 💬 Leave a message (stored in SQLite DB)
- 🧭 Sidebar navigation
- 🧑‍💻 Fully customizable layout

## 🛠️ Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Express.js + SQLite3
- Deployment-ready setup

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ZhiqiaoGong/portfolio.git
cd portfolio
```

### 2. Install frontend dependencies

```bash
cd client
npm install
npm run dev
```

### 3. Start the backend server

```bash
cd ../server
npm install
node index.js
```

The backend will run on `http://localhost:3001`.

The frontend will run on `http://localhost:5173`.

## 📁 Folder Structure

```
my-portfolio/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── server/          # Express backend
│   ├── index.js
│   └── messages.db (auto-generated)
```

## 💡 Customize

You can update the experience and project content in the respective component files in `client/src/components`.

