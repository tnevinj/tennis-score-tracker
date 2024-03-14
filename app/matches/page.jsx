// pages/matches/index.js
import Head from 'next/head';
import MatchCard from '../../components/MatchCard';

// Sample match data
const matches = [
  {
    id: 1,
    player1: 'Roger Federer',
    player2: 'Rafael Nadal',
    scores: [
      {
        games: [
          {
            player1Score: 4,
            player2Score: 3,
          },
          {
            player1Score: 4,
            player2Score: 6,
            tiebreakScore: {
              player1Score: 6,
              player2Score: 8,
            },
          },
          {
            player1Score: 6,
            player2Score: 4,
          },
        ],
        player1SetScore: 6,
        player2SetScore: 4,
      },
      {
        games: [
          {
            player1Score: 4,
            player2Score: 6,
          },
          {
            player1Score: 3,
            player2Score: 6,
          },
        ],
        player1SetScore: 4,
        player2SetScore: 6,
      },
    ],
    status: 'completed',
  },
  {
    id: 2,
    player1: 'Novak Djokovic',
    player2: 'Andy Murray',
    scores: [
      {
        games: [
          {
            player1Score: 6,
            player2Score: 4,
          },
          {
            player1Score: 6,
            player2Score: 7,
          },
        ],
        player1SetScore: 7,
        player2SetScore: 6,
      },
      {
        games: [
          {
            player1Score: 3,
            player2Score: 4,
          },
        ],
        player1SetScore: 3,
        player2SetScore: 6,
      },
    ],
    status: 'in progress',
    superTiebreakScore: {
      player1Score: 5,
      player2Score: 7,
    },
  },
  // Add more match data here
];

export default function MatchList() {
  return (
    <div>
      <Head>
        <title>Tennis Score Tracker - Match List</title>
        <meta name="description" content="View all tennis matches" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Match List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
}