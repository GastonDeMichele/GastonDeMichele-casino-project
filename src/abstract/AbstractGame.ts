// src/abstract/AbstractGame.ts
import { IGame } from "../interfaces/IGame";

export abstract class AbstractGame implements IGame {
  protected bet: { amount: number; type: string; value: number | string };
  protected minBet: number;

  constructor(minBet: number) {
    this.minBet = minBet;
    this.bet = { amount: 0, type: "", value: "" };
  }

  // Este es el método abstracto que debe ser implementado en las clases que heredan de AbstractGame
  abstract play(): string;

  // Este es el método setBet que es común a todas las clases que heredan de AbstractGame
  setBet(amount: number, type: string = "", value: string | number = ""): string {
    if (amount < this.minBet) {
      return `La apuesta mínima es ${this.minBet}.`;
    }
    this.bet = { amount, type, value };
    return `Apuesta establecida: Monto = ${amount}, Tipo = ${type}, Valor = ${value}.`;
  }

  getBet(): { amount: number; type: string; value: number | string } {
    return this.bet;
  }

  getMinBet(): number {
    return this.minBet;
  }
}
