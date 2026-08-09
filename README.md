# Lumi — Your Personal Study Companion

Lumi is an AI-powered study companion for college students. Students upload
their study material (PDF/PPTX/DOCX/Images) and Lumi turns it into a
structured Learning Path with topics, summaries, quizzes, and progress
tracking — guided by a calm, friendly companion character.

This repository is a **monorepo** with two independent apps:

```
lumi/
├── client/   → React (Vite) + Tailwind CSS frontend
└── server/   → Node.js + Express backend
```

## Current Status

🚧 **Foundation stage.** Only the project skeleton exists so far:
- Frontend boots and shows a placeholder Landing page with a light/dark theme toggle.
- Backend boots and exposes a single health-check route.
- No authentication, uploads, AI processing, or learning path features yet.
  Those will be added in later stages.

## Tech Stack

| Layer     | Technology              | Why |
|-----------|--------------------------|-----|
| Frontend  | React + Vite             | Simple, fast, widely understood |
| Styling   | Tailwind CSS              | Fast to build a clean, minimal UI |
| Backend   | Node.js + Express         | Minimal, same language as frontend |
| Database  | MongoDB + Mongoose        | Natural fit for nested learning-path data |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (includes npm)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally,
  **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
  (you won't need this until the database stage — not required to run the
  current foundation)

## Getting Started

### 1. Install dependencies

```bash
# From the repo root
cd client && npm install
cd ../server && npm install
```

### 2. Run the backend

```bash
cd server
cp .env.example .env   # create your local environment file
npm run dev
```

The server starts at `http://localhost:5000`. Visit
`http://localhost:5000/api/health` — you should see a JSON response
confirming the server is running.

### 3. Run the frontend

In a separate terminal:

```bash
cd client
npm run dev
```

The app opens at `http://localhost:5173`. You should see the Lumi landing
placeholder page with a light/dark theme toggle in the corner.

## Project Structure

```
lumi/
├── client/
│   ├── src/
│   │   ├── pages/          → One component per page (currently just Landing)
│   │   ├── context/        → ThemeContext (light/dark mode)
│   │   ├── components/     → Shared, reusable UI pieces (empty for now)
│   │   ├── App.jsx         → Root component + routing
│   │   ├── main.jsx        → React entry point
│   │   └── index.css       → Tailwind + theme CSS variables
│   └── package.json
├── server/
│   ├── routes/
│   │   └── health.js       → GET /api/health
│   ├── server.js           → Express app entry point
│   ├── .env.example        → Environment variable template
│   └── package.json
└── README.md
```

## Environment Variables

The backend reads configuration from a `.env` file (never committed to Git —
see `.gitignore`). Copy `server/.env.example` to `server/.env` and fill in
real values as each stage requires them. Right now only `PORT` is used.

## Development Approach

This project is being built incrementally, one stage at a time:

1. ✅ Project foundation (this stage)
2. ⬜ User authentication
3. ⬜ Dashboard
4. ⬜ Uploading study material
5. ⬜ AI processing
6. ⬜ Learning Path generation
7. ⬜ Mind Map
8. ⬜ Topic-wise learning content
9. ⬜ Summary
10. ⬜ Quiz
11. ⬜ Progress tracking
12. ⬜ Resume learning
13. ⬜ Lumi companion interactions
