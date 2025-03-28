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
  const [history, setHistory] = useState([]);

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
    };

    setHistory(prev => [...prev, match_data]);

    if (player === 'player1') {
      const updated_match = addPoint1(match_data);
      updateView(updated_match);
      updateMatch(updated_match, match._id);
    } else if (player === 'player2') {
      const updated_match = addPoint2(match_data);
      updateView(updated_match);
      updateMatch(updated_match, match._id);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      // Get the last state from history
      const previousState = history[history.length - 1];
      
      // Remove the last state from history
      setHistory(prev => prev.slice(0, -1));
      
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
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-center">{match.player1}</TableHead>
                <TableHead className="text-center">{match.player2}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Game</TableCell>
                <TableCell className="text-center font-bold">{points[gameA]}</TableCell>
                <TableCell className="text-center font-bold">{points[gameB]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Set 1</TableCell>
                <TableCell className="text-center">
                  {set1A} {tiebreak1A > 0 && <span>({tiebreak1A})</span>}
                </TableCell>
                <TableCell className="text-center">
                  {set1B} {tiebreak1B > 0 && <span>({tiebreak1B})</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Set 2</TableCell>
                <TableCell className="text-center">
                  {set2A} {tiebreak2A > 0 && <span>({tiebreak2A})</span>}
                </TableCell>
                <TableCell className="text-center">
                  {set2B} {tiebreak2B > 0 && <span>({tiebreak2B})</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Set 3</TableCell>
                <TableCell className="text-center">
                  {set3A} {tiebreak3A > 0 && <span>({tiebreak3A})</span>}
                </TableCell>
                <TableCell className="text-center">
                  {set3B} {tiebreak3B > 0 && <span>({tiebreak3B})</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Super Tiebreak</TableCell>
                <TableCell className="text-center">{supertieA}</TableCell>
                <TableCell className="text-center">{supertieB}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Button
          variant="outline"
          onClick={handleUndo}
          disabled={history.length === 0}
          className="mb-4"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Undo Last Point
        </Button>
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