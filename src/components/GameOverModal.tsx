
import React from 'react';
import { GameState } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GameOverModalProps {
  gameState: GameState;
  onPlayAgain: () => void;
  className?: string;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  onPlayAgain,
  className,
}) => {
  // Only show modal if game is over
  if (!['player_won', 'opponent_won', 'draw'].includes(gameState.gameStatus)) {
    return null;
  }
  
  const isPlayerWon = gameState.gameStatus === 'player_won';
  const isDraw = gameState.gameStatus === 'draw';
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className={cn(
        'bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slide-up',
        className
      )}>
        <h2 className="text-3xl font-bold text-center mb-6">
          {isPlayerWon ? 'Victory!' : isDraw ? 'Draw!' : 'Defeat!'}
        </h2>
        
        <div className="text-center text-gray-600 mb-8">
          {isPlayerWon 
            ? 'Congratulations! You have won the game.' 
            : isDraw 
              ? 'The game ended in a draw.'
              : 'Better luck next time.'
          }
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={onPlayAgain}
            className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg shadow-lg transition-all duration-300"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
