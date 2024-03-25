'use client'
import MatchDetails from '@/components/MatchDetails';
import useMatch from '@/hooks/useMatch';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

const MatchDetailsPage = ({ params }) => {
  const id = params.id

  const { match, isLoading, error } = useMatch(id)

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!match) {
    return <ErrorMessage message="Match not found." />;
  }

  return (
    <div className="container mx-auto my-8">
      <MatchDetails match={match.match} />
    </div>
  );
};

export default MatchDetailsPage;