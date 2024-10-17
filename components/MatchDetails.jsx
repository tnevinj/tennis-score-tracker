import { useRouter } from 'next/navigation';
import ScoreInput from './ScoreInput';
import { useState } from 'react';
import { addPoint1, addPoint2 } from '@/lib/addPoint';

const MatchDetails = ({ match }) => {
  const router = useRouter();
  
  const points = [0, 15, 30, 40, 'A']

  const [status,setStatus] = useState(match.status)
  const [gameA, setGameA] = useState(match.game[-2])
  const [gameB, setGameB] = useState(match.game[-1])
  const [set1A, setSet1A] = useState(match.set1[-2])
  const [set1B, setSet1B] = useState(match.set1[-1])
  const [set2A, setSet2A] = useState(match.set2[-2])
  const [set2B, setSet2B] = useState(match.set2[-1])
  const [set3A, setSet3A] = useState(match.set3[-2])
  const [set3B, setSet3B] = useState(match.set3[-1])
  const [tiebreak1A, setTiebreak1A] = useState(match.tiebreak1[-2])
  const [tiebreak1B, setTiebreak1B] = useState(match.tiebreak1[-1])
  const [tiebreak2A, setTiebreak2A] = useState(match.tiebreak2[-2])
  const [tiebreak2B, setTiebreak2B] = useState(match.tiebreak2[-1])
  const [tiebreak3A, setTiebreak3A] = useState(match.tiebreak3[-2])
  const [tiebreak3B, setTiebreak3B] = useState(match.tiebreak3[-1])
  const [supertieA, setSupertieA] = useState(match.supertiebreak[-2])
  const [supertieB, setSupertieB] = useState(match.supertiebreak[-1])

  const updateView = (match) => {
    setStatus(match.status)
    setGameA(match.game[-2])
    setGameB(match.game[-1])
    setSet1A(match.set1[-2])
    setSet1B(match.set1[-1])
    setSet2A(match.set2[-2])
    setSet2B(match.set2[-1])
    setSet3A(match.set3[-2])
    setSet3B(match.set3[-1])
    setTiebreak1A(match.tiebreak1[-2])
    setTiebreak1B(match.tiebreak1[-1])
    setTiebreak2A(match.tiebreak2[-2])
    setTiebreak2B(match.tiebreak2[-1])
    setTiebreak3A(match.tiebreak3[-2])
    setTiebreak3B(match.tiebreak3[-1])
    setSupertieA(match.supertiebreak[-2])
    setSupertieB(match.supertiebreak[-1])
  }

  const updateMatch = (updated_match, id) => {
    fetch(`/api/matches/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated_match),
    })
  }

  // Handle button click to go back to matches page
  const handleBackClick = () => {
    router.push('/matches');
  };

  const handleAddPoint = (player) => {
    var match_data = {
      status: status,
      matchFormat: match.matchFormat,
      game: [gameA, gameB],
      set1: [set1A, set1B],
      set2: [set2A, set2B],
      set3: [set3A, set3B],
      tiebreak1: [tiebreak1A, tiebreak1B],
      tiebreak2: [tiebreak2A, tiebreak2B],
      tiebreak3: [tiebreak3A, tiebreak3B],
      supertiebreak: [supertieA, supertieB]

    }
    if (player === 'player1') {
      const updated_match = addPoint1(match_data)
      updateView(updated_match)
      updateMatch(updated_match, match._id)
    } else if (player === 'player2') {
      const updated_match = addPoint2(match_data)
      updateView(updated_match)
      updateMatch(updated_match, match._id)
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Match Details</h2>
        <div className="mb-4">
          <p className="text-gray-500">
            {match.tournament} {new Date(match.date).toDateString()}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Scores</h3>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2 text-center">{match.player1}</th>
                <th className="px-4 py-2 text-center">{match.player2}</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className="border px-4 py-2">Game</td>
                  <td className="border text-center px-4 py-2">{points[gameA]}</td>
                  <td className="border text-center px-4 py-2">{points[gameB]}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Set 1</td>
                  <td className="border text-center px-4 py-2">{set1A} ({tiebreak1A})</td>
                  <td className="border text-center px-4 py-2">{set1B} ({tiebreak1B})</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Set 2</td>
                  <td className="border text-center px-4 py-2">{set2A} ({tiebreak2A})</td>
                  <td className="border text-center px-4 py-2">{set2B} ({tiebreak2B})</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Set 3</td>
                  <td className="border text-center px-4 py-2">{set3A} ({tiebreak3A})</td>
                  <td className="border text-center px-4 py-2">{set3B} ({tiebreak3B})</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Super Tiebreak</td>
                  <td className="border text-center px-4 py-2">{supertieA}</td>
                  <td className="border text-center px-4 py-2">{supertieB}</td>
                </tr>
            </tbody>
          </table>
        </div>
        <ScoreInput handleAddPoint={handleAddPoint} player1={match.player1} player2={match.player2} />
        {/* <button
          onClick={handleUndo()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Undo
        </button> */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Match Status</h3>
          <p>{status === 'completed' ? 'Completed' : 'In Progress'}</p>
        </div>
        <button
          onClick={handleBackClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Matches
        </button>
      </div>
    </div>
  );
};

export default MatchDetails;