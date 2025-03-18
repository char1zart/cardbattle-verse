
import React from 'react';
import { Card as CardType } from '../types';
import Card from './Card';
import { cn } from '@/lib/utils';

interface PlayerHandProps {
  cards: CardType[];
  onSelectCard: (card: CardType) => void;
  selectedCard: CardType | null;
  currentMana: number;
  className?: string;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  cards,
  onSelectCard,
  selectedCard,
  currentMana,
  className,
}) => {
  return (
    <div className={cn('relative flex justify-center items-end h-36 overflow-visible', className)}>
      <div className="flex items-end justify-center transform">
        {cards.map((card, index) => {
          const isSelected = selectedCard?.id === card.id;
          const isPlayable = card.cost <= currentMana;
          const cardOffset = Math.abs(cards.length / 2 - index) * 5;
          const rotation = (index - cards.length / 2) * 3;
          
          return (
            <div
              key={card.id}
              className="animate-draw-card hover:z-50"
              style={{
                transform: `translateX(-${cardOffset}px) rotate(${rotation}deg)`,
                transformOrigin: 'bottom center',
                zIndex: isSelected ? 20 : index,
                marginLeft: index === 0 ? 0 : -60, // Overlap cards
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Card
                card={card}
                isSelected={isSelected}
                isPlayable={isPlayable}
                onClick={() => onSelectCard(card)}
                animationDelay={index * 100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerHand;
