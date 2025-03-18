
export interface Card {
  id: number;
  name: string;
  cost: number;
  attack: number;
  health: number;
  description: string;
  type: CardType;
  rarity: CardRarity;
  image?: string;
  effects?: CardEffect[];
}

export enum CardType {
  MINION = 'minion',
  SPELL = 'spell',
  WEAPON = 'weapon',
}

export enum CardRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export interface CardEffect {
  type: EffectType;
  value: number;
  target?: EffectTarget;
}

export enum EffectType {
  DEAL_DAMAGE = 'deal_damage',
  HEAL = 'heal',
  DRAW = 'draw',
  BUFF_ATTACK = 'buff_attack',
  BUFF_HEALTH = 'buff_health',
}

export enum EffectTarget {
  ALL = 'all',
  ALL_MINIONS = 'all_minions',
  ENEMY = 'enemy',
  ENEMY_MINIONS = 'enemy_minions',
  FRIENDLY = 'friendly',
  FRIENDLY_MINIONS = 'friendly_minions',
  RANDOM = 'random',
  TARGETED = 'targeted',
}

export interface Player {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  deck: Card[];
  hand: Card[];
  board: Card[];
  graveyard: Card[];
}

export interface GameState {
  player: Player;
  opponent: Player;
  currentTurn: 'player' | 'opponent';
  turnNumber: number;
  gameStatus: 'not_started' | 'in_progress' | 'player_won' | 'opponent_won' | 'draw';
  selectedCard: Card | null;
  selectedBoardSlot: number | null;
  attackingMinion: Card | null;
  defendingMinion: Card | null;
}

export type GameAction = 
  | { type: 'START_GAME' }
  | { type: 'END_TURN' }
  | { type: 'DRAW_CARD', playerId: string }
  | { type: 'PLAY_CARD', card: Card, position: number, playerId: string }
  | { type: 'SELECT_CARD', card: Card | null }
  | { type: 'SELECT_BOARD_SLOT', position: number | null }
  | { type: 'SELECT_ATTACKING_MINION', card: Card | null }
  | { type: 'SELECT_DEFENDING_MINION', card: Card | null }
  | { type: 'ATTACK', attacker: Card, defender: Card | Player }
  | { type: 'ATTACK_PLAYER', attacker: Card, playerId: string }
  | { type: 'END_GAME', winner: 'player' | 'opponent' | 'draw' };
