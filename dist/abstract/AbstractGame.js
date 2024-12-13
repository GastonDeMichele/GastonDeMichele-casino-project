"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGame = void 0;
class AbstractGame {
    constructor(minBet) {
        this.minBet = minBet;
        this.bet = { amount: 0, type: "", value: "" };
    }
    // Método modificado para Blackjack, ahora solo se usa amount
    setBet(amount, type = "", value = "") {
        if (amount < this.minBet) {
            return `La apuesta mínima es ${this.minBet}.`;
        }
        this.bet = { amount, type, value };
        return `Apuesta establecida: Monto = ${amount}, Tipo = ${type}, Valor = ${value}.`;
    }
    getBet() {
        return this.bet;
    }
    getMinBet() {
        return this.minBet;
    }
}
exports.AbstractGame = AbstractGame;
