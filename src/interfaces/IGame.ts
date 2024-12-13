// src/interfaces/IGame.ts
export interface IGame {
    setBet(amount: number, type: string, value: number | string): string;
    getBet(): { amount: number; type: string; value: number | string };
    getMinBet(): number;
    play(): string;
}
