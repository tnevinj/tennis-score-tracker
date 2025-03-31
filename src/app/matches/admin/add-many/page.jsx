'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

const AddMultipleMatches = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([
    {
      id: 1,
      player1: '',
      player2: '',
      tournament: '',
      matchFormat: 'best-of-3',
      status: 'upcoming',
      serving: 0,
      initialServer: 0
    }
  ]);
  
  // Add a new empty match to the list
  const addMatch = () => {
    setMatches([
      ...matches,
      {
        id: matches.length + 1,
        player1: '',
        player2: '',
        tournament: matches[matches.length - 1].tournament, // Copy tournament from last match
        matchFormat: matches[matches.length - 1].matchFormat, // Copy format from last match
        status: 'upcoming',
        serving: matches[matches.length - 1].serving, // Copy serving from last match
        initialServer: matches[matches.length - 1].initialServer // Copy initialServer from last match
      }
    ]);
  };
  
  // Remove a match from the list
  const removeMatch = (id) => {
    if (matches.length > 1) {
      setMatches(matches.filter(match => match.id !== id));
    } else {
      toast.error("Cannot remove", {
        description: "You must have at least one match."
      });
    }
  };
  
  // Update match data when inputs change
  const updateMatch = (id, field, value) => {
    if (field === 'tournament' || field === 'matchFormat') {
      // If tournament or matchFormat is updated, apply to all matches
      setMatches(matches.map(match => ({ 
        ...match, 
        [field]: value 
      })));
    } else {
      // For other fields, only update the specific match
      setMatches(matches.map(match => 
        match.id === id ? { ...match, [field]: value } : match
      ));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate all matches have required fields
    const isValid = matches.every(match => 
      match.player1 && match.player2 && match.tournament
    );
    
    if (!isValid) {
      setError("All matches require Player 1, Player 2, and Tournament fields");
      setIsLoading(false);
      return;
    }
    
    try {
      // Create array of promises for each match creation
      const createPromises = matches.map(match => 
        fetch('/api/matches/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            player1: match.player1,
            player2: match.player2,
            tournament: match.tournament,
            matchFormat: match.matchFormat,
            status: match.status,
            serving: match.serving,
            initialServer: match.initialServer
          }),
        })
      );
      
      // Wait for all promises to resolve
      const responses = await Promise.all(createPromises);
      const results = await Promise.all(responses.map(res => res.json()));
      
      console.log("Created matches:", results);
      toast.success("Success", {
        description: `${matches.length} matches have been created.`
      });
      
      // Redirect after short delay
      setTimeout(() => {
        router.push('/matches/admin');
      }, 1500);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred while creating matches');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add Multiple Matches</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <ErrorMessage message={error} />}
            
            <form onSubmit={handleSubmit}>
              {/* Tournament field for all matches */}
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                  <Label htmlFor="tournament" className="text-lg font-medium">Tournament Name</Label>
                  <Input
                    id="tournament"
                    value={matches[0].tournament}
                    onChange={(e) => updateMatch(matches[0].id, 'tournament', e.target.value)}
                    placeholder="Enter tournament name"
                    className="mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="matchFormat" className="text-lg font-medium">Match Format</Label>
                  <Select
                    value={matches[0].matchFormat}
                    onValueChange={(value) => updateMatch(matches[0].id, 'matchFormat', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select match format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="best-of-3">Best of 3 Full Sets</SelectItem>
                      <SelectItem value="supertiebreak">Best of 2 + Supertiebreak</SelectItem>
                      <SelectItem value="short-deuce">Best of 2 + Supertiebreak (Short Deuce)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="initialServer" className="text-lg font-medium">First Server</Label>
                  <Select
                    value={matches[0].serving.toString()}
                    onValueChange={(value) => {
                      const numValue = parseInt(value);
                      // Update serving and initialServer for all matches
                      setMatches(matches.map(match => ({ 
                        ...match, 
                        serving: numValue,
                        initialServer: numValue
                      })));
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select first server" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Player 1</SelectItem>
                      <SelectItem value="1">Player 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
                
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player 1</TableHead>
                    <TableHead>Player 2</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell>
                        <Input
                          value={match.player1}
                          onChange={(e) => updateMatch(match.id, 'player1', e.target.value)}
                          placeholder="Enter player 1 name"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={match.player2}
                          onChange={(e) => updateMatch(match.id, 'player2', e.target.value)}
                          placeholder="Enter player 2 name"
                          required
                        />
                      </TableCell>


                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          type="button"
                          onClick={() => removeMatch(match.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addMatch}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Match
                </Button>
                
                <div className="flex flex-row space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/matches/admin')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" /> Save All Matches
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* Sonner's Toaster component is imported and used at the _app.js or layout.js level */}
    </div>
  );
};

export default AddMultipleMatches;
