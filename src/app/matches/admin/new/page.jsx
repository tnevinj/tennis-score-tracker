'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const NewMatch = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    defaultValues: {
      player1: '',
      player2: '',
      tournament: '',
      matchFormat: 'best-of-3',
      status: 'upcoming',
      serving: 0,
      initialServer: 0,
    },
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/matches/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      console.log(responseData);
      closeModal();
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred while creating the match');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push('/matches/admin');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Create New Match">
      {error && <ErrorMessage message={error} />}
      
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="player1">Player 1</Label>
            <Input
              id="player1"
              {...form.register('player1', { required: true })}
              required
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="player2">Player 2</Label>
            <Input
              id="player2"
              {...form.register('player2', { required: true })}
              required
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="tournament">Tournament</Label>
            <Input
              id="tournament"
              {...form.register('tournament', { required: true })}
              required
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="matchFormat">Match Format</Label>
            <Select
              defaultValue={form.getValues('matchFormat')}
              onValueChange={(value) => form.setValue('matchFormat', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select match format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-of-3">Best of 3 Full Sets</SelectItem>
                <SelectItem value="supertiebreak">Best of 2 + Supertiebreak</SelectItem>
                <SelectItem value="short-deuce">Best of 2 + Supertiebreak (Short Deuce)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="initialServer">First Server</Label>
            <Select
              defaultValue={form.getValues('serving')}
              onValueChange={(value) => {
                const numValue = parseInt(value);
                form.setValue('serving', numValue);
                form.setValue('initialServer', numValue);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select first server" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Player 1</SelectItem>
                <SelectItem value="1">Player 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            Create Match
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewMatch;
