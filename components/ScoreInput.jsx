import { useState } from 'react';

const ScoreInput = ({ player1, player2, handleAddPoint }) => {
  const [player1Score, setPlayer1Score] = useState('');
  const [player2Score, setPlayer2Score] = useState('');

  return (
    <div className="bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enter Scores</h2>
      <div>
          {/* Add point buttons */}
          <div className="mb-4 space-x-8">
            <button
              onClick={() => handleAddPoint('player1')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
            >
              Add Point to {player1}
            </button>
            <button
              onClick={() => handleAddPoint('player2')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Point to {player2}
            </button>
          </div>

    </div>
    </div>
  );
};

export default ScoreInput;