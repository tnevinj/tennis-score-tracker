'use client'
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchCard from '@/components/MatchCard';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import useMatches from '@/hooks/useMatches';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MatchList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { matches, isLoading, error } = useMatches();

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }

  const filteredMatches = matches.matches.filter(match => 
    match.player1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.player2.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="flex flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Matches</h1>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 w-full"
              type="text"
              placeholder="Search by player name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match._id} match={match} admin={false} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
