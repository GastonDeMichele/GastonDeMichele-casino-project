"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blackjack = void 0;
// src/games/Blackjack.ts
const AbstractGame_1 = require("../abstract/AbstractGame");
class Blackjack extends AbstractGame_1.AbstractGame {
    constructor(minBet) {
        super(minBet);
        this.playerHand = [];
        this.dealerHand = [];
    }
    // Genera una carta aleatoria (1 a 11)
    drawCard() {
        return Math.floor(Math.random() * 11) + 1;
    }
    calculateHandTotal(hand) {
        return hand.reduce((total, card) => total + card, 0);
    }
    setBet(amount, type, value) {
        if (amount < this.minBet) {
            return `La apuesta mínima es ${this.minBet}.`;
        }
        this.bet = { amount, type, value };
        return `Apuesta de ${amount} registrada para Blackjack.`;
    }
    play() {
        if (this.bet.amount === 0) {
            return "No hay una apuesta configurada.";
        }
        // Repartir cartas iniciales
        this.playerHand = [this.drawCard(), this.drawCard()];
        this.dealerHand = [this.drawCard(), this.drawCard()];
        const playerTotal = this.calculateHandTotal(this.playerHand);
        const dealerTotal = this.calculateHandTotal(this.dealerHand);
        // Evaluar resultado del juego
        if (playerTotal > 21) {
            return this.buildResultMessage(playerTotal, dealerTotal, "Perdiste por pasarte de 21.");
        }
        if (dealerTotal > 21 || playerTotal > dealerTotal) {
            const payout = this.bet.amount * 2;
            return this.buildResultMessage(playerTotal, dealerTotal, `¡Ganaste ${payout}!`);
        }
        return this.buildResultMessage(playerTotal, dealerTotal, "Perdiste. Mejor suerte la próxima vez.");
    }
    buildResultMessage(playerTotal, dealerTotal, result) {
        return `Tus cartas: ${this.playerHand.join(", ")} (Total: ${playerTotal}).\n` +
            `Cartas del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal}).\n` +
            `${result}`;
    }
}
exports.Blackjack = Blackjack;
