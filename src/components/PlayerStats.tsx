
import React from 'react';
import { Player } from '../types';
import { cn } from '@/lib/utils';
import { Heart, Circle } from 'lucide-react';

interface PlayerStatsProps {
  player: Player;
  isOpponent?: boolean;
  className?: string;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({
  player,
  isOpponent = false,
  className,
}) => {
  return (
    <div className={cn(
      'flex items-center gap-4 px-4 py-2 rounded-lg glass-card animate-fade-in',
      isOpponent ? 'flex-row-reverse' : 'flex-row',
      className
    )}>
      {/* Player Avatar */}
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
        {player.name.charAt(0)}
      </div>
      
      {/* Player Name */}
      <div className="font-medium text-sm">
        {player.name}
      </div>
      
      {/* Health */}
      <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full">
        <Heart className="w-4 h-4 text-red-500" />
        <span className="text-sm font-semibold">{player.health}</span>
      </div>
      
      {/* Mana Crystals */}
      <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
        <Circle className="w-4 h-4 text-blue-500 fill-blue-500" />
        <span className="text-sm font-semibold">{player.mana}/{player.maxMana}</span>
      </div>
      
      {/* Deck Count */}
      <div className="text-xs font-medium text-gray-600">
        Deck: {player.deck.length}
      </div>
    </div>
  );
};

export default PlayerStats;
