
import React, { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Card as CardType } from '@/types';
import Card from '@/components/Card';
import PlayerHand from '@/components/PlayerHand';
import PlayerStats from '@/components/PlayerStats';
import CardDeck from '@/components/CardDeck';
import GameControls from '@/components/GameControls';
import GameOverModal from '@/components/GameOverModal';
import { cn } from '@/lib/utils';

const GameBoard: React.FC = () => {
  const {
    gameState,
    startGame,
    endTurn,
    playCard,
    selectCard,
    selectAttackingMinion,
    attackPlayer,
  } = useGameState();
  
  const [boardPosition, setBoardPosition] = useState<number | null>(null);
  
  const handleSelectCard = (card: CardType) => {
    if (gameState.currentTurn !== 'player') return;
    
    // Toggle card selection
    if (gameState.selectedCard?.id === card.id) {
      selectCard(null);
    } else {
      selectCard(card);
    }
  };
  
  const handleBoardSlotClick = (position: number) => {
    setBoardPosition(position);
    
    if (gameState.selectedCard && gameState.currentTurn === 'player') {
      // Play the selected card to this board position
      playCard(gameState.selectedCard, position);
      setBoardPosition(null);
    }
  };
  
  const handleMinionClick = (card: CardType, isPlayerMinion: boolean) => {
    if (gameState.currentTurn !== 'player') return;
    
    if (isPlayerMinion) {
      // Select this minion for attacking
      selectAttackingMinion(card);
    } else if (gameState.attackingMinion) {
      // Attack this enemy minion
      // attack(gameState.attackingMinion, card);
    }
  };
  
  const handleOpponentClick = () => {
    if (gameState.attackingMinion && gameState.currentTurn === 'player') {
      attackPlayer(gameState.attackingMinion, 'opponent');
    }
  };
  
  // Render board slots
  const renderBoardSlots = (isPlayerBoard: boolean) => {
    const maxSlots = 7;
    const board = isPlayerBoard ? gameState.player.board : gameState.opponent.board;
    
    return (
      <div className="flex justify-center gap-1 h-40 w-full px-2">
        {Array.from({ length: maxSlots }).map((_, index) => {
          const cardInSlot = board[index];
          const isHighlighted = isPlayerBoard && boardPosition === index;
          
          return (
            <div
              key={index}
              className={cn(
                'board-slot relative',
                isHighlighted ? 'active' : '',
                cardInSlot ? 'border-0' : ''
              )}
              onClick={() => isPlayerBoard ? handleBoardSlotClick(index) : undefined}
            >
              {cardInSlot ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Card
                    card={cardInSlot}
                    isSelected={isPlayerBoard && gameState.attackingMinion?.id === cardInSlot.id}
                    onClick={() => handleMinionClick(cardInSlot, isPlayerBoard)}
                    className="scale-90"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Opponent Area */}
      <div className="flex items-start justify-between p-4">
        <PlayerStats
          player={gameState.opponent}
          isOpponent
          className="animate-slide-in-left"
        />
        <div className="flex items-center gap-4 animate-slide-in-right">
          <div 
            className="relative cursor-pointer"
            onClick={handleOpponentClick}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
              {gameState.opponent.name.charAt(0)}
            </div>
            {gameState.attackingMinion && (
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-yellow-400 animate-pulse"></div>
            )}
          </div>
          <CardDeck 
            cardCount={gameState.opponent.deck.length} 
            isOpponent 
          />
        </div>
      </div>
      
      {/* Opponent's Board */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
          {renderBoardSlots(false)}
        </div>
        
        {/* Center Divider with Turn Indicator */}
        <div className="h-8 flex items-center justify-center">
          <div className={cn(
            'px-4 py-1 rounded-full text-xs font-medium',
            gameState.currentTurn === 'player' 
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          )}>
            {gameState.currentTurn === 'player' ? 'Your Turn' : 'Opponent\'s Turn'}
          </div>
        </div>
        
        {/* Player's Board */}
        <div className="flex-1 flex items-center justify-center w-full animate-fade-in" style={{ animationDelay: '400ms' }}>
          {renderBoardSlots(true)}
        </div>
      </div>
      
      {/* Player Area */}
      <div className="mt-auto">
        <PlayerHand
          cards={gameState.player.hand}
          onSelectCard={handleSelectCard}
          selectedCard={gameState.selectedCard}
          currentMana={gameState.player.mana}
          className="mb-4 animate-slide-in-left"
          style={{ animationDelay: '500ms' }}
        />
        
        <div className="flex items-start justify-between p-4">
          <PlayerStats
            player={gameState.player}
            className="animate-slide-in-left"
            style={{ animationDelay: '600ms' }}
          />
          <div className="flex items-center gap-4 animate-slide-in-right" style={{ animationDelay: '600ms' }}>
            <GameControls
              gameState={gameState}
              onEndTurn={endTurn}
              onStartGame={startGame}
            />
            <CardDeck cardCount={gameState.player.deck.length} />
          </div>
        </div>
      </div>
      
      {/* Game Over Modal */}
      <GameOverModal gameState={gameState} onPlayAgain={startGame} />
    </div>
  );
};

export default GameBoard;
