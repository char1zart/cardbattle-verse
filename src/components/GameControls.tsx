
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types';
import { cn } from '@/lib/utils';

interface GameControlsProps {
  gameState: GameState;
  onEndTurn: () => void;
  onStartGame: () => void;
  className?: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onEndTurn,
  onStartGame,
  className,
}) => {
  const isPlayerTurn = gameState.currentTurn === 'player';
  const isGameInProgress = gameState.gameStatus === 'in_progress';
  const isGameOver = ['player_won', 'opponent_won', 'draw'].includes(gameState.gameStatus);
  
  return (
    <div className={cn(
      'flex flex-col items-center gap-3 p-3 glass-card rounded-lg animate-fade-in',
      className
    )}>
      {!isGameInProgress && !isGameOver && (
        <Button 
          onClick={onStartGame}
          className="bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-blue-700 text-white shadow-md"
        >
          Start Game
        </Button>
      )}
      
      {isGameInProgress && (
        <>
          <div className="text-sm font-medium mb-1">
            {isPlayerTurn ? 'Your Turn' : 'Opponent\'s Turn'}
          </div>
          
          <div className="text-xs text-gray-600 mb-2">
            Turn {gameState.turnNumber}
          </div>
          
          <Button
            onClick={onEndTurn}
            disabled={!isPlayerTurn}
            className={cn(
              'transition-all duration-300',
              isPlayerTurn 
                ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-md'
                : 'bg-gray-300 text-gray-600'
            )}
          >
            End Turn
          </Button>
        </>
      )}
      
      {isGameOver && (
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold mb-2">
            {gameState.gameStatus === 'player_won' ? 'You Won!' : 
             gameState.gameStatus === 'opponent_won' ? 'You Lost!' : 'Draw!'}
          </div>
          
          <Button
            onClick={onStartGame}
            className="bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-blue-700 text-white"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameControls;
