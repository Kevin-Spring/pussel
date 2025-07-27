# 🧩 Slide Puzzle – Full Stack React/Express App

This is a small full-stack slide puzzle game built with **React** (frontend) and **Express** (backend), intended as a portfolio demo to showcase coding style, logic handling, and basic backend functionality.

## ✨ Features

- **Classic 4x4 Slide Puzzle**
- **Daily Puzzle Mode** – Same board for all users each day (based on UTC date)
- **Random Puzzle Mode** – For regular play and testing
- **Victory Detection** – Detects win condition dynamically
- **Win Feedback** – Shows alerts on victory (daily or random)
- **Stats Tracking** – Tracks moves and time for each win
- **Persistent Results** – Results saved in `results.json` via Express API
- **Lightweight Backend** – Simple Express server for handling stats and seed logic
- **Keyboard navigation**
- **Dark/Light Theme Toggle** 🌗

---

## 🧠 Tech Stack

### Frontend

- React (with Vite)
- Functional components & hooks (`useState`, `useEffect`)
- Context API for global game state
- Modular component design (Rows, Tiles, Dialogs, Stats, etc.)

### Backend

- Node.js + Express
- JSON file-based "database"
- API endpoints for:
  - `/daily-seed` – returns a consistent daily puzzle
  - `/results` – GET and POST routes to manage result history

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Install and Run

```bash
# Start the Express backend
cd server
npm install
node index.js
```

```bash
# In a second terminal, start the React frontend
cd client
npm install
npm run dev
```

### Default Ports

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)

---

## 📁 Project Structure

```
puzzle/
├── client/              # React frontend
│   ├── components/      # UI components (Board, Stats, Buttons, etc.)
│   ├── game/            # Game logic (movement, win check, etc.)
│   ├── services/        # Requests to backend endpoints
│   ├── utils/           # Shared context and various utility data
│   └── App.jsx          # Main app
├── server/              # Express backend
│   ├── results.json     # Stores all game results to simulate database
│   └── index.js         # Express server and endpoints
├── README.md
└── ...
```

---

## 🛠 Backend API

### `GET /daily-seed`

Returns a seed array (length 16) for today's puzzle based on date-based hashing.

```json
{ "seed": [5, 1, 3, 2, 4, 6, ...] }
```

### `GET /results`

Returns an array of all stored puzzle results.

### `POST /results`

Adds a new result:

```json
{
	"moves": 42,
	"time": 58,
	"isDaily": true,
	"mode": "daily",
	"date": "2025-07-26T14:20:00.000Z"
}
```

---

## 📈 Future Improvements

- Use a proper DB (e.g., SQLite or MongoDB)
- Add difficulty settings

---

## 👋 Author

Developed by **Kevin** as part of a code showcase.
Feel free to explore, run, and adapt the project!

---
