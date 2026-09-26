# Tennis Score Tracker

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, real-time tennis match scoring application built with Next.js. Track singles matches with proper tennis scoring rules, manage tournaments, and provide live score updates for spectators.

**Live Demo:** [https://tennisscore.co.za/](https://tennisscore.co.za/)

---

## Features

### Match Management
- **Real-time Scoring** – Track points, games, and sets with proper tennis scoring (0, 15, 30, 40, Advantage)
- **Multiple Match Formats** – Support for best-of-3 sets, supertiebreak (10-point tiebreak), and short-deuce formats
- **Serve Tracking** – Visual indicator showing which player is serving
- **Tiebreak Support** – Automatic handling of 7-point and 10-point tiebreaks
- **Match Retirement** – Handle player retirements with proper score preservation

### Admin Features
- **Secure Authentication** – Password-protected admin interface via NextAuth.js
- **Create Matches** – Add individual matches with player names, tournament, and format
- **Bulk Creation** – Import multiple matches at once for tournaments
- **Score Control** – Add/undo points with one-click interface
- **Status Management** – Mark matches as upcoming, in-progress, or completed

### Public Interface
- **Live Scores** – Real-time match viewing for spectators (auto-refreshing)
- **Match Filtering** – Search matches by player name
- **Status Sorting** – In-progress matches displayed first
- **Responsive Design** – Works on desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Frontend** | React 19, TypeScript |
| **Styling** | Tailwind CSS 4, shadcn/ui |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB with Mongoose |
| **Auth** | NextAuth.js (Credentials Provider) |
| **State** | React Hooks, SWR for data fetching |
| **Icons** | Lucide React |

---

## Prerequisites

- Node.js 18+ 
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm, yarn, or pnpm

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tnevinj/tennis-score-tracker.git
   cd tennis-score-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tennis-score-tracker
   MATCH_PASSWORD=your-secure-admin-password
   NEXTAUTH_SECRET=your-random-secret-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `MATCH_PASSWORD` | Password for admin access | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT encryption | Yes |
| `NEXTAUTH_URL` | Base URL (set automatically in dev) | No |

---

## Usage

### Public View
1. Visit the homepage and click "Get Started"
2. Browse all matches on the matches page
3. Use the search bar to find matches by player name
4. Click any match card to view details

### Admin Access
1. Navigate to `/matches/admin`
2. Enter the admin password (set in `MATCH_PASSWORD`)
3. Create matches individually or in bulk
4. Click on any match to open the scoring interface
5. Use the +/- buttons to track points
6. Toggle match status as needed

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/matches` | List all matches (sorted by status) |
| `POST` | `/api/matches` | Create a new match |
| `GET` | `/api/matches/[id]` | Get match details |
| `PUT` | `/api/matches/[id]` | Update match scores/status |
| `DELETE` | `/api/matches/[id]` | Delete a match |
| `POST` | `/api/matches/new` | Bulk create matches |
| `POST` | `/api/auth/[...nextauth]` | Authentication endpoints |

### Match Schema

```javascript
{
  player1: String,          // First player name
  player2: String,          // Second player name
  tournament: String,       // Tournament or event name
  matchFormat: String,      // "best-of-3", "supertiebreak", or "short-deuce"
  set1: [Number, Number],   // Set 1 games
  set2: [Number, Number],   // Set 2 games
  set3: [Number, Number],   // Set 3 games
  tiebreak1: [Number, Number],
  tiebreak2: [Number, Number],
  tiebreak3: [Number, Number],
  game: [Number, Number],   // Current game points (0-4, where 4=Advantage)
  supertiebreak: [Number, Number],
  status: String,           // "upcoming" | "in-progress" | "completed"
  serving: Number,          // 0 = player1, 1 = player2
  initialServer: Number,    // Who served first
  retirement: Boolean,
  retiredPlayer: Number,
  retirementReason: String,
  date: Date
}
```

---

## Project Structure

```
tennis-score-tracker/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   ├── matches/            # Match pages (public & admin)
│   │   ├── contact/            # Contact page
│   │   ├── page.jsx            # Homepage
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── MatchCard.jsx       # Match display card
│   │   ├── ScoreInput.jsx      # Scoring controls
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   │   ├── addPoint.js         # Scoring logic
│   │   ├── removePoint.js      # Undo logic
│   │   └── connectDB.js        # MongoDB connection
│   ├── models/                 # Mongoose models
│   │   ├── Match.js
│   │   └── Message.js
│   └── auth.js                 # NextAuth configuration
├── public/                     # Static assets
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Tennis Scoring Rules Implemented

- **Standard Games**: 0 → 15 → 30 → 40 → Game (win by 2 points)
- **Deuce**: At 40-40, advantage required to win
- **Short Deuce**: First to 40 wins (no advantage)
- **Set**: First to 6 games (win by 2), or 7-5 / 7-6
- **Tiebreak**: 7-point tiebreak at 6-6 (win by 2)
- **Supertiebreak**: 10-point tiebreak for deciding set (win by 2)
- **Match**: Best of 3 sets (or 2 sets + supertiebreak)

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)