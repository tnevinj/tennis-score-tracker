'use client'
import MatchCard from '@/components/MatchCard';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import useMatches from '@/hooks/useMatches';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';


export default function Admin() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { matches, isLoading, error } = useMatches()

  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <ErrorMessage message={error} />
  }

  const filteredMatches = matches.matches.filter(match => 
    match.player1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.player2.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className='flex flex-row gap-4'>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Matches</h1>
          <div className="relative w-84">
            <input className="pl-10" type='text' placeholder='Search by player name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}>
              {/* <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> */}
            </input>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredMatches).map((match) => (
            <MatchCard key={match._id} match={match} admin={true}/>
          ))}
        </div>
      </div>
    </div>
  );
}