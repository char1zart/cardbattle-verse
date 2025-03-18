
import { Card, CardRarity, CardType, EffectType, EffectTarget } from '../types';

export const CARD_LIBRARY: Card[] = [
  {
    id: 1,
    name: 'Stalwart Defender',
    cost: 2,
    attack: 2,
    health: 3,
    description: 'Taunt',
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
  },
  {
    id: 2,
    name: 'Swift Striker',
    cost: 1,
    attack: 2,
    health: 1,
    description: 'Charge',
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
  },
  {
    id: 3,
    name: 'Arcane Missile',
    cost: 1,
    attack: 0,
    health: 0,
    description: 'Deal 3 damage to a random enemy minion.',
    type: CardType.SPELL,
    rarity: CardRarity.COMMON,
    effects: [
      {
        type: EffectType.DEAL_DAMAGE,
        value: 3,
        target: EffectTarget.ENEMY_MINIONS,
      },
    ],
  },
  {
    id: 4,
    name: 'Healing Touch',
    cost: 2,
    attack: 0,
    health: 0,
    description: 'Restore 4 health to your hero.',
    type: CardType.SPELL,
    rarity: CardRarity.COMMON,
    effects: [
      {
        type: EffectType.HEAL,
        value: 4,
        target: EffectTarget.FRIENDLY,
      },
    ],
  },
  {
    id: 5,
    name: 'War Golem',
    cost: 7,
    attack: 7,
    health: 7,
    description: '',
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
  },
  {
    id: 6,
    name: 'Fireball',
    cost: 4,
    attack: 0,
    health: 0,
    description: 'Deal 6 damage to any target.',
    type: CardType.SPELL,
    rarity: CardRarity.COMMON,
    effects: [
      {
        type: EffectType.DEAL_DAMAGE,
        value: 6,
        target: EffectTarget.TARGETED,
      },
    ],
  },
  {
    id: 7,
    name: 'Elven Archer',
    cost: 1,
    attack: 1,
    health: 1,
    description: 'Battlecry: Deal 1 damage.',
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
    effects: [
      {
        type: EffectType.DEAL_DAMAGE,
        value: 1,
        target: EffectTarget.TARGETED,
      },
    ],
  },
  {
    id: 8,
    name: 'Novice Engineer',
    cost: 2,
    attack: 1,
    health: 1,
    description: 'Battlecry: Draw a card.',
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
    effects: [
      {
        type: EffectType.DRAW,
        value: 1,
        target: EffectTarget.FRIENDLY,
      },
    ],
  },
  {
    id: 9,
    name: 'Arcane Intellect',
    cost: 3,
    attack: 0,
    health: 0,
    description: 'Draw 2 cards.',
    type: CardType.SPELL,
    rarity: CardRarity.COMMON,
    effects: [
      {
        type: EffectType.DRAW,
        value: 2,
        target: EffectTarget.FRIENDLY,
      },
    ],
  },
  {
    id: 10,
    name: 'Chillwind Yeti',
    cost: 4,
    attack: 4,
    health: 5,
    description: '',
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
  },
];

export const createDeck = (size = 30): Card[] => {
  const deck: Card[] = [];
  // Ensure we have a full deck by repeating cards if necessary
  for (let i = 0; i < size; i++) {
    // Get a random card from the library and clone it with a unique instance id
    const randomCard = CARD_LIBRARY[Math.floor(Math.random() * CARD_LIBRARY.length)];
    deck.push({ ...randomCard, id: i + 1000 }); // Use a new id to ensure uniqueness
  }
  return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  // Fisher-Yates shuffle algorithm
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
