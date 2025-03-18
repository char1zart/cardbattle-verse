
import React from 'react';
import { Card as CardType } from '../types';
import { cn } from '@/lib/utils';
import { Shield, Zap } from 'lucide-react';

interface CardProps {
  card: CardType;
  isSelected?: boolean;
  isPlayable?: boolean;
  onClick?: () => void;
  className?: string;
  animationDelay?: number;
}

const Card: React.FC<CardProps> = ({
  card,
  isSelected = false,
  isPlayable = true,
  onClick,
  className,
  animationDelay = 0,
}) => {
  const cardStyles = cn(
    'card-container relative flex flex-col w-24 h-36 rounded-xl p-2 shadow-md border border-gray-200 transition-all duration-300',
    isPlayable ? 'cursor-pointer' : 'cursor-not-allowed opacity-70',
    isSelected ? 'ring-2 ring-blue-400 shadow-lg transform -translate-y-4' : '',
    isPlayable && !isSelected ? 'hover:-translate-y-2 hover:shadow-lg' : '',
    className
  );

  const getCardBackground = () => {
    switch (card.rarity) {
      case 'common':
        return 'bg-gradient-to-b from-white to-gray-100';
      case 'rare':
        return 'bg-gradient-to-b from-white to-blue-100';
      case 'epic':
        return 'bg-gradient-to-b from-white to-purple-100';
      case 'legendary':
        return 'bg-gradient-to-b from-white to-orange-100';
      default:
        return 'bg-white';
    }
  };

  const renderCardType = () => {
    switch (card.type) {
      case 'minion':
        return null;
      case 'spell':
        return <Zap className="absolute top-1 right-1 w-4 h-4 text-blue-500" />;
      case 'weapon':
        return <Shield className="absolute top-1 right-1 w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`${cardStyles} ${getCardBackground()}`}
      onClick={isPlayable ? onClick : undefined}
      style={{ 
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'both',
      }}
    >
      {/* Mana Cost */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
        {card.cost}
      </div>
      
      {/* Card Name */}
      <div className="text-center text-xs font-medium truncate mt-1">{card.name}</div>
      
      {renderCardType()}
      
      {/* Card Image/Illustration would go here */}
      <div className="bg-gray-200 rounded-sm h-12 mt-1 mb-1"></div>
      
      {/* Card Description */}
      <div className="text-center text-[0.6rem] text-gray-700 h-6 overflow-hidden">
        {card.description}
      </div>
      
      {/* Attack & Health (for minions) */}
      {card.type === 'minion' && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-1">
          <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {card.attack}
          </div>
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {card.health}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
