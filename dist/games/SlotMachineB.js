"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotMachineB = void 0;
const AbstractGame_1 = require("../abstract/AbstractGame");
class SlotMachineB extends AbstractGame_1.AbstractGame {
    constructor(minBet) {
        super(minBet); // Pasamos el minBet al constructor de la clase base AbstractGame
        this.symbols = ["🍒", "🍇", "🍉", "🍊", "🍋"];
    }
    // Método play que no recibe parámetros. La apuesta se usa desde la propiedad 'bet' en AbstractGame.
    play() {
        if (this.bet.amount < this.minBet) {
            return `La apuesta mínima es ${this.minBet}.`;
        }
        const result = this.spinReels();
        const win = this.checkWin(result);
        const payout = this.calculatePayout(win);
        return this.buildResultMessage(result, win, payout);
    }
    spinReels() {
        const result = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * this.symbols.length);
            result.push(this.symbols[randomIndex]);
        }
        return result;
    }
    checkWin(result) {
        return result[0] === result[1] || result[1] === result[2] || result[0] === result[2];
    }
    calculatePayout(win) {
        return win ? this.bet.amount * 5 : 0;
    }
    buildResultMessage(result, win, payout) {
        const resultDescription = `Resultados de la tirada: ${result.join(" | ")}.`;
        return win
            ? `${resultDescription} ¡Ganaste! Has ganado ${payout}.`
            : `${resultDescription} Lo siento, no has ganado esta vez.`;
    }
}
exports.SlotMachineB = SlotMachineB;
