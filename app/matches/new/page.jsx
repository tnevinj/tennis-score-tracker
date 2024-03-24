'use client'
import { useState } from 'react';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';

const NewMatch = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [tournament, setTournament] = useState('');
  const [matchFormat, setMatchFormat] = useState('best-of-3');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation and submit logic
    const matchData = {
      player1,
      player2,
      tournament,
      matchFormat
    }
    fetch('/api/matches/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push('/matches');
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Create New Match">
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="player1" className="block mb-2 font-bold">
            Player 1:
          </label>
          <input
            type="text"
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="player2" className="block mb-2 font-bold">
            Player 2:
          </label>
          <input
            type="text"
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tournament" className="block mb-2 font-bold">
            Tournament:
          </label>
          <input
            type="text"
            id="tournament"
            value={tournament}
            onChange={(e) => setTournament(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="matchFormat" className="block mb-2 font-bold">
            Match Format:
          </label>
          <select
            id="matchFormat"
            value={matchFormat}
            onChange={(e) => setMatchFormat(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="best-of-3">Best of 3 Full Sets</option>
            <option value="supertiebreak">Best of 2 + Supertiebreak</option>
            <option value="short-deuce">Best of 2 + Supertiebreak (Short Deuce)</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 mr-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Match
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewMatch;