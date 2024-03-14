// components/MatchCard.js
import Link from 'next/link';

const MatchCard = ({ match }) => {
  const { id, player1, player2, scores, status, superTiebreakScore } = match;

  const renderSetScore = (set) => {
    const { player1SetScore, player2SetScore } = set;
    return `${player1SetScore}-${player2SetScore}`;
  };

  const renderGameScore = (game) => {
    const { player1Score, player2Score, tiebreakScore } = game;
    const gameScore = `${player1Score}-${player2Score}`;

    if (tiebreakScore) {
      const { player1Score: tb1Score, player2Score: tb2Score } = tiebreakScore;
      return `${gameScore} (${tb1Score}-${tb2Score})`;
    }

    return gameScore;
  };

  return (
    <Link href={`/matches/${id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        <div className="text-lg font-semibold mb-2">
          {player1} vs {player2}
        </div>
        <div className="mb-4">
          {scores.map((set, index) => (
            <div key={index} className="mb-2">
              <div className="font-semibold">Set {index + 1}</div>
              <div>{renderSetScore(set)}</div>
              <div className="ml-4">
                {set.games.map((game, gameIndex) => (
                  <div key={gameIndex}>
                    Game {gameIndex + 1}: {renderGameScore(game)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {superTiebreakScore && (
          <div className="mb-2">
            <div className="font-semibold">Super Tiebreak</div>
            <div>
              {superTiebreakScore.player1Score}-{superTiebreakScore.player2Score}
            </div>
          </div>
        )}
        <div
          className={`text-sm font-semibold ${
            status === 'completed' ? 'text-green-600' : 'text-blue-600'
          }`}
        >
          {status === 'completed' ? 'Completed' : 'In Progress'}
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;