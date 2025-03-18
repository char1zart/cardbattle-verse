
import React from 'react';
import { cn } from '@/lib/utils';

interface CardDeckProps {
  cardCount: number;
  isOpponent?: boolean;
  className?: string;
}

const CardDeck: React.FC<CardDeckProps> = ({
  cardCount,
  isOpponent = false,
  className,
}) => {
  // Generate an array of stack elements
  const stackElements = cardCount > 0 
    ? Array.from({ length: Math.min(5, cardCount) }, (_, i) => i) 
    : [];
  
  return (
    <div className={cn('relative w-16 h-24', className)}>
      {cardCount > 0 ? (
        <div className="relative w-full h-full">
          {stackElements.map((_, index) => (
            <div
              key={index}
              className={cn(
                'absolute rounded-lg border border-gray-300 bg-gradient-to-br from-gray-100 to-white shadow-sm transition-all',
                'transform'
              )}
              style={{
                width: '100%',
                height: '100%',
                top: `${index * 1}px`,
                left: `${index * 1}px`,
                zIndex: 10 - index,
                transform: `rotate(${isOpponent ? index : -index}deg)`,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {cardCount}
          </div>
        </div>
      ) : (
        <div className="w-full h-full rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
          Empty
        </div>
      )}
    </div>
  );
};

export default CardDeck;
