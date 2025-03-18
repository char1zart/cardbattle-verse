
import { useReducer, useEffect, useCallback } from 'react';
import { GameState, GameAction, Player, Card } from '../types';
import { createDeck } from '../data/cards';
import { toast } from 'sonner';

const initialState: GameState = {
  player: {
    id: 'player',
    name: 'Player',
    health: 30,
    maxHealth: 30,
    mana: 0,
    maxMana: 0,
    deck: [],
    hand: [],
    board: [],
    graveyard: [],
  },
  opponent: {
    id: 'opponent',
    name: 'Opponent',
    health: 30,
    maxHealth: 30,
    mana: 0,
    maxMana: 0,
    deck: [],
    hand: [],
    board: [],
    graveyard: [],
  },
  currentTurn: 'player',
  turnNumber: 0,
  gameStatus: 'not_started',
  selectedCard: null,
  selectedBoardSlot: null,
  attackingMinion: null,
  defendingMinion: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      // Initialize decks and draw starting hands
      const playerDeck = createDeck();
      const opponentDeck = createDeck();
      
      // Draw initial hands (3 cards each)
      const playerHand = playerDeck.splice(0, 3);
      const opponentHand = opponentDeck.splice(0, 3);
      
      return {
        ...state,
        player: {
          ...state.player,
          deck: playerDeck,
          hand: playerHand,
          mana: 1,
          maxMana: 1,
        },
        opponent: {
          ...state.opponent,
          deck: opponentDeck,
          hand: opponentHand,
          mana: 1,
          maxMana: 1,
        },
        currentTurn: 'player',
        turnNumber: 1,
        gameStatus: 'in_progress',
      };
    }
    
    case 'END_TURN': {
      const nextTurn = state.currentTurn === 'player' ? 'opponent' : 'player';
      const nextTurnNumber = nextTurn === 'player' ? state.turnNumber + 1 : state.turnNumber;
      
      // The player whose turn is starting draws a card and gets a mana crystal
      const currentPlayer = nextTurn === 'player' ? 'player' : 'opponent';
      const playerToUpdate = state[currentPlayer];
      
      // Draw a card if possible
      let newHand = [...playerToUpdate.hand];
      let newDeck = [...playerToUpdate.deck];
      
      if (newDeck.length > 0) {
        const drawnCard = newDeck[0];
        newHand.push(drawnCard);
        newDeck = newDeck.slice(1);
      }
      
      // Increase max mana (up to 10)
      const newMaxMana = Math.min(10, playerToUpdate.maxMana + 1);
      
      return {
        ...state,
        [currentPlayer]: {
          ...playerToUpdate,
          deck: newDeck,
          hand: newHand,
          mana: newMaxMana,
          maxMana: newMaxMana,
        },
        currentTurn: nextTurn,
        turnNumber: nextTurnNumber,
        selectedCard: null,
        selectedBoardSlot: null,
        attackingMinion: null,
        defendingMinion: null,
      };
    }
    
    case 'DRAW_CARD': {
      const player = state[action.playerId as 'player' | 'opponent'];
      if (player.deck.length === 0) {
        // Handle fatigue damage here if needed
        return state;
      }
      
      const drawnCard = player.deck[0];
      const newDeck = player.deck.slice(1);
      const newHand = [...player.hand, drawnCard];
      
      return {
        ...state,
        [action.playerId]: {
          ...player,
          deck: newDeck,
          hand: newHand,
        },
      };
    }
    
    case 'PLAY_CARD': {
      const player = state[action.playerId as 'player' | 'opponent'];
      
      // Check if player has enough mana
      if (player.mana < action.card.cost) {
        return state;
      }
      
      // Remove card from hand
      const newHand = player.hand.filter(card => card.id !== action.card.id);
      
      // Add card to board if it's a minion
      let newBoard = [...player.board];
      if (action.card.type === 'minion') {
        if (newBoard.length >= 7) {
          // Board is full
          return state;
        }
        // Insert at position if provided
        if (action.position !== undefined && action.position >= 0 && action.position <= newBoard.length) {
          newBoard.splice(action.position, 0, action.card);
        } else {
          newBoard.push(action.card);
        }
      }
      
      // Apply spell effects if it's a spell
      // This would be more complex in a real implementation
      
      // Update player's mana
      const newMana = player.mana - action.card.cost;
      
      return {
        ...state,
        [action.playerId]: {
          ...player,
          hand: newHand,
          board: newBoard,
          mana: newMana,
        },
        selectedCard: null,
        selectedBoardSlot: null,
      };
    }
    
    case 'SELECT_CARD': {
      return {
        ...state,
        selectedCard: action.card,
      };
    }
    
    case 'SELECT_BOARD_SLOT': {
      return {
        ...state,
        selectedBoardSlot: action.position,
      };
    }
    
    case 'SELECT_ATTACKING_MINION': {
      return {
        ...state,
        attackingMinion: action.card,
        defendingMinion: null,
      };
    }
    
    case 'SELECT_DEFENDING_MINION': {
      return {
        ...state,
        defendingMinion: action.card,
      };
    }
    
    case 'ATTACK': {
      const { attacker, defender } = action;
      
      if ('health' in defender) { // Attacking a minion
        // Minions deal damage to each other
        const attackerNewHealth = attacker.health - defender.attack;
        const defenderNewHealth = defender.health - attacker.attack;
        
        // Update board state
        const updatedPlayerBoard = state.player.board.map(card => 
          card.id === attacker.id ? { ...card, health: attackerNewHealth } : card
        ).filter(card => card.health > 0);
        
        const updatedOpponentBoard = state.opponent.board.map(card => 
          card.id === defender.id ? { ...card, health: defenderNewHealth } : card
        ).filter(card => card.health > 0);
        
        return {
          ...state,
          player: {
            ...state.player,
            board: updatedPlayerBoard,
          },
          opponent: {
            ...state.opponent,
            board: updatedOpponentBoard,
          },
          attackingMinion: null,
          defendingMinion: null,
        };
      }
      
      return state;
    }
    
    case 'ATTACK_PLAYER': {
      const { attacker, playerId } = action;
      const target = state[playerId as 'player' | 'opponent'];
      
      // Deal damage to the player
      const newHealth = target.health - attacker.attack;
      
      // Check if game is over
      let newGameStatus = state.gameStatus;
      if (newHealth <= 0) {
        newGameStatus = playerId === 'player' ? 'opponent_won' : 'player_won';
      }
      
      return {
        ...state,
        [playerId]: {
          ...target,
          health: newHealth,
        },
        gameStatus: newGameStatus,
        attackingMinion: null,
      };
    }
    
    case 'END_GAME': {
      return {
        ...state,
        gameStatus: action.winner === 'player' ? 'player_won' : 
                    action.winner === 'opponent' ? 'opponent_won' : 'draw',
      };
    }
    
    default:
      return state;
  }
}

export function useGameState() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  
  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
    toast('Game started! You go first.');
  }, []);
  
  const endTurn = useCallback(() => {
    dispatch({ type: 'END_TURN' });
    toast('Turn ended');
    
    // Simulate opponent's turn for this demo
    if (gameState.currentTurn === 'player') {
      setTimeout(() => {
        // Simple AI: play a random card if possible
        const opponent = gameState.opponent;
        if (opponent.hand.length > 0) {
          // Find cards the opponent can play
          const playableCards = opponent.hand.filter(card => card.cost <= opponent.mana);
          if (playableCards.length > 0) {
            // Play the first playable card
            const cardToPlay = playableCards[0];
            dispatch({ type: 'PLAY_CARD', card: cardToPlay, position: opponent.board.length, playerId: 'opponent' });
            toast('Opponent played a card');
          }
        }
        
        // End opponent's turn
        setTimeout(() => {
          dispatch({ type: 'END_TURN' });
          toast('Your turn!');
        }, 1000);
      }, 1500);
    }
  }, [gameState]);
  
  const playCard = useCallback((card: Card, position: number) => {
    if (gameState.currentTurn !== 'player') {
      toast('Not your turn!');
      return;
    }
    
    if (gameState.player.mana < card.cost) {
      toast('Not enough mana!');
      return;
    }
    
    dispatch({ type: 'PLAY_CARD', card, position, playerId: 'player' });
    toast(`Played ${card.name}`);
  }, [gameState]);
  
  const selectCard = useCallback((card: Card | null) => {
    dispatch({ type: 'SELECT_CARD', card });
  }, []);
  
  const selectBoardSlot = useCallback((position: number | null) => {
    dispatch({ type: 'SELECT_BOARD_SLOT', position });
  }, []);
  
  const selectAttackingMinion = useCallback((card: Card | null) => {
    if (gameState.currentTurn !== 'player') {
      toast('Not your turn!');
      return;
    }
    
    dispatch({ type: 'SELECT_ATTACKING_MINION', card });
  }, [gameState]);
  
  const selectDefendingMinion = useCallback((card: Card | null) => {
    dispatch({ type: 'SELECT_DEFENDING_MINION', card });
  }, []);
  
  const attack = useCallback((attacker: Card, defender: Card) => {
    if (gameState.currentTurn !== 'player') {
      toast('Not your turn!');
      return;
    }
    
    dispatch({ type: 'ATTACK', attacker, defender });
    toast(`${attacker.name} attacks ${defender.name}`);
  }, [gameState]);
  
  const attackPlayer = useCallback((attacker: Card, playerId: string) => {
    if (gameState.currentTurn !== 'player') {
      toast('Not your turn!');
      return;
    }
    
    dispatch({ type: 'ATTACK_PLAYER', attacker, playerId });
    toast(`${attacker.name} attacks opponent`);
    
    // Check if game is over
    if (gameState.opponent.health - attacker.attack <= 0) {
      toast('You win!', { duration: 5000 });
    }
  }, [gameState]);
  
  // Check for game end
  useEffect(() => {
    if (gameState.player.health <= 0) {
      dispatch({ type: 'END_GAME', winner: 'opponent' });
      toast('You lose!', { duration: 5000 });
    } else if (gameState.opponent.health <= 0) {
      dispatch({ type: 'END_GAME', winner: 'player' });
      toast('You win!', { duration: 5000 });
    }
  }, [gameState.player.health, gameState.opponent.health]);
  
  return {
    gameState,
    startGame,
    endTurn,
    playCard,
    selectCard,
    selectBoardSlot,
    selectAttackingMinion,
    selectDefendingMinion,
    attack,
    attackPlayer,
  };
}
