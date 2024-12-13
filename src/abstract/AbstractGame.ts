// src/abstract/AbstractGame.ts
import { IGame } from "../interfaces/IGame";

export abstract class AbstractGame implements IGame {
    protected bet: { amount: number; type: string; value: number | string };
    protected minBet: number;

    constructor(minBet: number) {
        this.minBet = minBet;
        this.bet = { amount: 0, type: "", value: "" };
    }

    abstract play(): string;

    // Método modificado para Blackjack, ahora solo se usa amount
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
