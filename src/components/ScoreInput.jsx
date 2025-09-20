import { Button } from '@/components/ui/button';
import { PlusCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ScoreInput = ({ player1, player2, handleAddPoint, handleUndo, status }) => {
  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Score Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            size="lg" 
            className="h-16 text-md"
            onClick={() => handleAddPoint('player1')}
            disabled={status === 'completed'}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Point for {player1}
          </Button>
          
          <Button 
            size="lg" 
            className="h-16 text-md"
            onClick={() => handleAddPoint('player2')}
            disabled={status === 'completed'}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Point for {player2}
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default ScoreInput;
