
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SwordIcon, ShieldIcon, SparklesIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4">
            CARD GAME
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Arcane Duels
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A strategic card game of spells and minions. Build your deck, outwit your opponent, and prove your mastery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 glass-card animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <SwordIcon className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Strategic Gameplay</h3>
            <p className="text-gray-600 text-center text-sm">
              Plan your moves carefully, manage your mana, and outwit your opponent.
            </p>
          </Card>
          
          <Card className="p-6 glass-card animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Powerful Spells</h3>
            <p className="text-gray-600 text-center text-sm">
              Cast devastating spells to turn the tide of battle in your favor.
            </p>
          </Card>
          
          <Card className="p-6 glass-card animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Defensive Tactics</h3>
            <p className="text-gray-600 text-center text-sm">
              Protect yourself with taunt minions and healing spells to survive.
            </p>
          </Card>
        </div>
        
        <div className="flex justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
          <Link to="/game">
            <Button className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transform transition-all duration-300 hover:-translate-y-1">
              Play Now
            </Button>
          </Link>
        </div>
        
        <div className="text-center mt-12 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p>Designed with elegance and simplicity in mind.</p>
          <p>Best experienced on desktop but fully responsive for mobile.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
