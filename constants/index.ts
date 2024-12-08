// types.ts
export interface Symbol {
    id: string;
    icon: string;
    color: string;
    value: number;
    svg: string;
  }
  
  export interface WinPattern {
    readonly pattern: readonly [number, number][];
    readonly multiplier: number;
    readonly name: string;
  }
  
  export interface WinResult {
    pattern?: WinPattern;
    winAmount: number;
    matches: number[][];
  }
  
  export const SYMBOLS = [
    { id: 'seven', icon: '7️⃣', color: '#FF0000', value: 100, svg: '<svg>...</svg>' },
    { id: 'cherry', icon: '🍒', color: '#FF0000', value: 50, svg: '<svg>...</svg>' },
    { id: 'lemon', icon: '🍋', color: '#FFD700', value: 30, svg: '<svg>...</svg>' },
    { id: 'grape', icon: '🍇', color: '#800080', value: 20, svg: '<svg>...</svg>' },
    { id: 'bell', icon: '🔔', color: '#FFD700', value: 40, svg: '<svg>...</svg>' },
    { id: 'diamond', icon: '💎', color: '#00FFFF', value: 75, svg: '<svg>...</svg>' },
    { id: 'star', icon: '⭐', color: '#FFD700', value: 60, svg: '<svg>...</svg>' },
  ] as const;
  
  export const WIN_PATTERNS: readonly WinPattern[] = [
    { pattern: [[0, 0], [0, 1], [0, 2]], multiplier: 2, name: 'Top Row Mini' },
    { pattern: [[2, 2], [2, 3], [2, 4]], multiplier: 2, name: 'Bottom Row Mini' },
    { pattern: [[0, 2], [1, 2], [2, 2]], multiplier: 3, name: 'Middle Column Mini' },
    { pattern: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], multiplier: 5, name: 'Top Line' },
    { pattern: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], multiplier: 5, name: 'Bottom Line' },
    { pattern: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], multiplier: 10, name: 'Middle Line' },
    { pattern: [[0, 0], [1, 1], [2, 2]], multiplier: 5, name: 'Mini V' },
    { pattern: [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]], multiplier: 10, name: 'Zigzag' },
    { pattern: [[0, 0], [1, 1], [2, 2], [1, 3], [0, 4]], multiplier: 15, name: 'V Pattern' },
    { pattern: [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]], multiplier: 15, name: 'Inverted V' },
    { pattern: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]], multiplier: 20, name: 'L Pattern' },
    { pattern: [[0, 0], [1, 0], [2, 0], [1, 1], [0, 2]], multiplier: 25, name: 'Z Pattern' },
    { pattern: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], multiplier: 20, name: 'Reverse L' },
    { pattern: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]], multiplier: 25, name: 'Lightning' },
  ];
  
  
  export const REEL_COUNT = 5;
  export const ROW_COUNT = 3;
  export const DEFAULT_BET = 10;
  export const MAX_BET = 100;
  export const MIN_BET = 10;
  export const BET_INCREMENT = 10;
  
  // Add new special symbols
  export const SPECIAL_SYMBOLS = {
    WILD: {
      id: 'wild',
      icon: '🃏',
      color: '#ff00ff',
      value: 200,
      isWild: true
    },
    SCATTER: {
      id: 'scatter',
      icon: '⭐',
      color: '#ffff00',
      value: 0,
      isScatter: true
    }
  } as const;
  
  // Add progressive jackpot conditions
  export const JACKPOT_PATTERNS = {
    MEGA: {
      pattern: [[1,0], [1,1], [1,2], [1,3], [1,4]],
      symbols: ['seven'],
      multiplier: 100
    },
    MAJOR: {
      pattern: [[0,0], [1,1], [2,2], [1,3], [0,4]],
      symbols: ['seven', 'diamond'],
      multiplier: 50
    }
  } as const;
  
  // Add free spins rules
  export const FREE_SPINS_RULES = {
    TRIGGER_COUNT: 3, // Number of scatters needed
    SPINS_AWARDED: 10,
    MULTIPLIER: 2
  } as const;
  