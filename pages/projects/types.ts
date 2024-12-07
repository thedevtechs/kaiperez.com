// types.ts
export interface Symbol {
    id: string;
    icon: string;
    color: string;
    value: number;
    svg: string;
  }
  
  export interface WinPattern {
    pattern: number[][];
    multiplier: number;
    name: string;
  }
  
  export interface WinResult {
    pattern?: WinPattern;
    winAmount: number;
    matches: number[][];
  }