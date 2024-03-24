import Link from 'next/link';
import { useState, useEffect } from 'react';

const MatchCard = ({ match }) => {
  const { _id, player1, player2, tournament} = match;

  const points = [0, 15, 30, 40, 'A']

  const [status,setStatus] = useState(match.status)
  const [gameA, setGameA] = useState(match.game[0])
  const [gameB, setGameB] = useState(match.game[1])
  const [set1A, setSet1A] = useState(match.set1[0])
  const [set1B, setSet1B] = useState(match.set1[1])
  const [set2A, setSet2A] = useState(match.set2[0])
  const [set2B, setSet2B] = useState(match.set2[1])
  const [set3A, setSet3A] = useState(match.set3[0])
  const [set3B, setSet3B] = useState(match.set3[1])
  const [tiebreak1A, setTiebreak1A] = useState(match.tiebreak1[0])
  const [tiebreak1B, setTiebreak1B] = useState(match.tiebreak1[1])
  const [tiebreak2A, setTiebreak2A] = useState(match.tiebreak2[0])
  const [tiebreak2B, setTiebreak2B] = useState(match.tiebreak2[1])
  const [tiebreak3A, setTiebreak3A] = useState(match.tiebreak3[0])
  const [tiebreak3B, setTiebreak3B] = useState(match.tiebreak3[1])
  const [supertieA, setSupertieA] = useState(match.supertiebreak[0])
  const [supertieB, setSupertieB] = useState(match.supertiebreak[1])

  const updateView = (match) => {
    setStatus(match.status)
    setGameA(match.game[0])
    setGameB(match.game[1])
    setSet1A(match.set1[0])
    setSet1B(match.set1[1])
    setSet2A(match.set2[0])
    setSet2B(match.set2[1])
    setSet3A(match.set3[0])
    setSet3B(match.set3[1])
    setTiebreak1A(match.tiebreak1[0])
    setTiebreak1B(match.tiebreak1[1])
    setTiebreak2A(match.tiebreak2[0])
    setTiebreak2B(match.tiebreak2[1])
    setTiebreak3A(match.tiebreak3[0])
    setTiebreak3B(match.tiebreak3[1])
    setSupertieA(match.supertiebreak[0])
    setSupertieB(match.supertiebreak[1])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateView(match)
    }, 1000)
    return () => clearInterval(interval)
        
  }, [match])

  return (
    
      <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
        <div className="text-2xl font-bold mb-4">
          {tournament}
        </div>
        <table className="w-full text-left">
          <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2 font-semibold">{player1}</td>
                <td className="px-1 py-2">{points[gameA]}</td>
                <td className="px-1 py-2">{set1A}</td>
                {(tiebreak1A+tiebreak1B)>0 ? (<td className="px-1 py-2">({tiebreak1A})</td>) : null}
                {(set2A+set2B)>0 ? (<td className="px-1 py-2">{set2A}</td>) : null}
                {(tiebreak2A+tiebreak2B)>0 ? (<td className="px-1 py-2">({tiebreak2A})</td>) : null}
                {(set3A+set3B)>0 ? (<td className="px-1 py-2">{set3A}</td>) : null}
                {(tiebreak3A+tiebreak3B)>0 ? (<td className="px-1 py-2">({tiebreak3A})</td>) : null}
                {(supertieA+supertieB)>0 ? (<td className="px-1 py-2">{supertieA}</td>) : null}
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2 font-semibold">{player2}</td>
                <td className="px-1 py-2">{points[gameB]}</td>
                <td className="px-1 py-2">{set1B}</td>
                {(tiebreak1A+tiebreak1B)>0 ? (<td className="px-1 py-2">({tiebreak1B})</td>) : null}
                {(set2A+set2B)>0 ? (<td className="px-1 py-2">{set2B}</td>) : null}
                {(tiebreak2A+tiebreak2B)>0 ? (<td className="px-1 py-2">({tiebreak2B})</td>) : null}
                {(set3A+set3B)>0 ? (<td className="px-1 py-2">{set3B}</td>) : null}
                {(tiebreak3A+tiebreak3B)>0 ? (<td className="px-1 py-2">({tiebreak3B})</td>) : null}
                {(supertieA+supertieB)>0 ? (<td className="px-1 py-2">{supertieB}</td>) : null}
              </tr>
          </tbody>
        </table>
        <Link href={`/matches/${_id}`}>
          <div
            className={`mt-4 text-sm font-semibold ${
              status === 'completed' ? 'text-green-600' : 'text-blue-600'
            }`}
          >
            {status === 'completed' ? 'Completed' : 'In Progress'}
          </div>
        </Link>
      </div>
    
  );
};

export default MatchCard;