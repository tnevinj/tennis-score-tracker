'use client'
import MatchCard from '@/components/MatchCard';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import useMatches from '@/hooks/useMatches';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

export default function MatchList() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { matches, isLoading, error } = useMatches()

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <ErrorMessage message={error} />
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Matches</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(matches.matches).map((match) => (
            <MatchCard key={match._id} match={match} admin={false} />
          ))}
        </div>
      </div>
    </div>
  );
}