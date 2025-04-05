import { useRouter } from 'next/navigation';
import ScoreInput from './ScoreInput';
import { useState } from 'react';
import { addPoint1, addPoint2 } from '@/lib/addPoint';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, Trophy, PauseCircle, Clock } from 'lucide-react';

const MatchDetails = ({ match }) => {
  const router = useRouter();
  
  const points = [0, 15, 30, 40, 'A'];

  const [status, setStatus] = useState(match.status);
  const [gameA, setGameA] = useState(match.game[0]);
  const [gameB, setGameB] = useState(match.game[1]);
  const [set1A, setSet1A] = useState(match.set1[0]);
  const [set1B, setSet1B] = useState(match.set1[1]);
  const [set2A, setSet2A] = useState(match.set2[0]);
  const [set2B, setSet2B] = useState(match.set2[1]);
  const [set3A, setSet3A] = useState(match.set3[0]);
  const [set3B, setSet3B] = useState(match.set3[1]);
  const [tiebreak1A, setTiebreak1A] = useState(match.tiebreak1[0]);
  const [tiebreak1B, setTiebreak1B] = useState(match.tiebreak1[1]);
  const [tiebreak2A, setTiebreak2A] = useState(match.tiebreak2[0]);
  const [tiebreak2B, setTiebreak2B] = useState(match.tiebreak2[1]);
  const [tiebreak3A, setTiebreak3A] = useState(match.tiebreak3[0]);
  const [tiebreak3B, setTiebreak3B] = useState(match.tiebreak3[1]);
  const [supertieA, setSupertieA] = useState(match.supertiebreak[0]);
  const [supertieB, setSupertieB] = useState(match.supertiebreak[1]);
  const [serving, setServing] = useState(match.serving || 0);
  // Initialize history with the initial match state
  const [history, setHistory] = useState([{
    status: match.status,
    matchFormat: match.matchFormat,
    game: [...match.game],
    set1: [...match.set1],
    set2: [...match.set2],
    set3: [...match.set3],
    tiebreak1: [...match.tiebreak1],
    tiebreak2: [...match.tiebreak2],
    tiebreak3: [...match.tiebreak3],
    supertiebreak: [...match.supertiebreak],
    serving: match.serving || 0
  }]);

  const updateView = (match) => {
    setStatus(match.status);
    setGameA(match.game[0]);
    setGameB(match.game[1]);
    setSet1A(match.set1[0]);
    setSet1B(match.set1[1]);
    setSet2A(match.set2[0]);
    setSet2B(match.set2[1]);
    setSet3A(match.set3[0]);
    setSet3B(match.set3[1]);
    setTiebreak1A(match.tiebreak1[0]);
    setTiebreak1B(match.tiebreak1[1]);
    setTiebreak2A(match.tiebreak2[0]);
    setTiebreak2B(match.tiebreak2[1]);
    setTiebreak3A(match.tiebreak3[0]);
    setTiebreak3B(match.tiebreak3[1]);
    setSupertieA(match.supertiebreak[0]);
    setSupertieB(match.supertiebreak[1]);
    setServing(match.serving !== undefined ? match.serving : 0);
  };

  const updateMatch = (updated_match, id) => {
    fetch(`/api/matches/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated_match),
    });
  };

  // Handle button click to go back to matches page
  const handleBackClick = () => {
    router.push('/matches');
  };

  const handleAddPoint = (player) => {
    // Create current state object
    var current_state = {
      status: status,
      matchFormat: match.matchFormat,
      game: [gameA, gameB],
      set1: [set1A, set1B],
      set2: [set2A, set2B],
      set3: [set3A, set3B],
      tiebreak1: [tiebreak1A, tiebreak1B],
      tiebreak2: [tiebreak2A, tiebreak2B],
      tiebreak3: [tiebreak3A, tiebreak3B],
      supertiebreak: [supertieA, supertieB],
      serving: serving
    };

    let updated_match;
    if (player === 'player1') {
      updated_match = addPoint1(current_state);
    } else if (player === 'player2') {
      updated_match = addPoint2(current_state);
    }
    
    // Update the view with the new state
    updateView(updated_match);
    updateMatch(updated_match, match._id);
    
    // Add the new state to history AFTER applying the point
    // This ensures we're saving the state AFTER the point is added
    setHistory(prev => [...prev, {
      status: updated_match.status,
      matchFormat: updated_match.matchFormat,
      game: [...updated_match.game],
      set1: [...updated_match.set1],
      set2: [...updated_match.set2],
      set3: [...updated_match.set3],
      tiebreak1: [...updated_match.tiebreak1],
      tiebreak2: [...updated_match.tiebreak2],
      tiebreak3: [...updated_match.tiebreak3],
      supertiebreak: [...updated_match.supertiebreak]
    }]);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      // Remove the current state from history
      const newHistory = [...history.slice(0, -1)];
      
      // Get the previous state (which is now the last item in the new history)
      const previousState = newHistory[newHistory.length - 1];
      
      // Update the history state
      setHistory(newHistory);
      
      // Apply the previous state
      updateView(previousState);
      updateMatch(previousState, match._id);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <PauseCircle className="h-3 w-3" />
            Upcoming
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  // Format the date
  const formattedDate = new Date(match.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className=" mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Match Details</CardTitle>
          <div className="flex justify-between items-center">
            {getStatusBadge(status)}
          </div>
        </div>
        <p className="text-muted-foreground">
          {match.tournament} | {formattedDate}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Scores</h3>
          <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {match.player1} {status === 'in-progress' && serving === 0 && <span className="text-xs ml-1">🎾</span>}
              </TableCell>
              {status === 'in-progress' && (
                <TableCell className="text-center">{points[gameA]}</TableCell>
              )}
              <TableCell className="text-center">{set1A}</TableCell>
              {(tiebreak1A + tiebreak1B) > 0 && (
                <TableCell className="text-center">({tiebreak1A})</TableCell>
              )}
              {(set2A + set2B) > 0 && (
                <TableCell className="text-center">{set2A}</TableCell>
              )}
              {(tiebreak2A + tiebreak2B) > 0 && (
                <TableCell className="text-center">({tiebreak2A})</TableCell>
              )}
              {(set3A + set3B) > 0 && (
                <TableCell className="text-center">{set3A}</TableCell>
              )}
              {(tiebreak3A + tiebreak3B) > 0 && (
                <TableCell className="text-center">({tiebreak3A})</TableCell>
              )}
              {(supertieA + supertieB) > 0 && (
                <TableCell className="text-center">{supertieA}</TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                {match.player2} {status === 'in-progress' && serving === 1 && <span className="text-xs ml-1">🎾</span>}
              </TableCell>
              {status === 'in-progress' && (
                <TableCell className="text-center">{points[gameB]}</TableCell>
              )}
              <TableCell className="text-center">{set1B}</TableCell>
              {(tiebreak1A + tiebreak1B) > 0 && (
                <TableCell className="text-center">({tiebreak1B})</TableCell>
              )}
              {(set2A + set2B) > 0 && (
                <TableCell className="text-center">{set2B}</TableCell>
              )}
              {(tiebreak2A + tiebreak2B) > 0 && (
                <TableCell className="text-center">({tiebreak2B})</TableCell>
              )}
              {(set3A + set3B) > 0 && (
                <TableCell className="text-center">{set3B}</TableCell>
              )}
              {(tiebreak3A + tiebreak3B) > 0 && (
                <TableCell className="text-center">({tiebreak3B})</TableCell>
              )}
              {(supertieA + supertieB) > 0 && (
                <TableCell className="text-center">{supertieB}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="mb-4"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Undo Last Point
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newServing = serving === 0 ? 1 : 0;
              setServing(newServing);
              
              // Update the match data
              const updated_match = {
                status: status,
                matchFormat: match.matchFormat,
                game: [gameA, gameB],
                set1: [set1A, set1B],
                set2: [set2A, set2B],
                set3: [set3A, set3B],
                tiebreak1: [tiebreak1A, tiebreak1B],
                tiebreak2: [tiebreak2A, tiebreak2B],
                tiebreak3: [tiebreak3A, tiebreak3B],
                supertiebreak: [supertieA, supertieB],
                serving: newServing
              };
              
              // Update in database
              updateMatch(updated_match, match._id);
              
              // Add to history for undo
              setHistory(prev => [...prev, updated_match]);
            }}
            className="mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="m16 12-4 4-4-4"/></svg>
            Switch Server
          </Button>
        </div>
        <ScoreInput handleAddPoint={handleAddPoint} player1={match.player1} player2={match.player2} />
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={handleBackClick}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Matches
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchDetails;
