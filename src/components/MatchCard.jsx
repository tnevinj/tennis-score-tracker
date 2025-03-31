import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Trash2, Trophy, PauseCircle, Clock } from 'lucide-react';

const MatchCard = ({ match, admin }) => {
  const { _id, player1, player2, tournament } = match;

  const handleDelete = async (e) => {
    e.preventDefault();
    
    fetch(`/api/matches/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match),
    })
      .catch(error => {
        console.error('Error:', error);
      });
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      updateView(match);
    }, 1000);
    return () => clearInterval(interval);
  }, [match]);

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

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{tournament}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {player1} {status === 'in-progress' && serving === 0 && <span className="text-xs ml-1">🎾</span>}
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
                {player2} {status === 'in-progress' && serving === 1 && <span className="text-xs ml-1">🎾</span>}
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
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`/matches/admin/${_id}`}>
          <div className="flex justify-between items-center">
            {getStatusBadge(status)}
          </div>
        </Link>
        {admin && (
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
