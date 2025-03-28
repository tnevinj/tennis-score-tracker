'use client'

import { useParams } from 'next/navigation'
import MatchDetails from '@/components/MatchDetails';
import useMatch from '@/hooks/useMatch';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

export default function MatchDetailsPage() {
  const params = useParams()
  const { id } = params;

  const { match, isLoading, error } = useMatch(id)

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <ErrorMessage message={error} />
        </div>
      </>
    );
  }

  if (!match) {
    return (
      <>
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <ErrorMessage message="Match not found." />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <MatchDetails match={match.match} />
      </div>
    </>
  );
}