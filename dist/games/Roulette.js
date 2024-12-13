"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roulette = void 0;
const AbstractGame_1 = require("../abstract/AbstractGame");
class Roulette extends AbstractGame_1.AbstractGame {
    constructor(minBet) {
        super(minBet);
        this.userBetNumber = null;
    }
    // Método para configurar la apuesta
    setBet(amount, type, value) {
        if (amount < this.minBet) {
            return `La apuesta mínima es ${this.minBet}.`;
        }
        if (type === "number") {
            if (typeof value !== "number" || value < 0 || value > 36) {
                return "El número debe estar entre 0 y 36.";
            }
            this.userBetNumber = value;
        }
        if (type === "color" && !["rojo", "negro"].includes(value)) {
            return "El color debe ser 'rojo' o 'negro'.";
        }
        if (type === "parity" && !["par", "impar"].includes(value)) {
            return "La opción debe ser 'par' o 'impar'.";
        }
        // Establecer la apuesta correctamente
        this.bet.amount = amount;
        this.bet.type = type;
        this.bet.value = value;
        return `Apuesta establecida: ${type} = ${value}, Monto: ${amount}.`;
    }
    // Método para jugar
    play() {
        if (this.bet.amount === 0) {
            return "No hay una apuesta configurada.";
        }
        // Generar resultado aleatorio de la tirada
        const resultNumber = Math.floor(Math.random() * 37);
        const resultColor = resultNumber === 0 ? "verde" : resultNumber % 2 === 0 ? "negro" : "rojo";
        const resultParity = resultNumber === 0 ? "ninguno" : resultNumber % 2 === 0 ? "par" : "impar";
        // Verificar si el jugador ganó
        const win = this.checkWin(resultNumber, resultColor, resultParity);
        const payout = this.calculatePayout(win);
        // Construir mensaje de resultado
        return this.buildResultMessage(resultNumber, resultColor, resultParity, win, payout);
    }
    // Verificar si el jugador ganó
    checkWin(resultNumber, resultColor, resultParity) {
        switch (this.bet.type) {
            case "number":
                return resultNumber === this.userBetNumber;
            case "color":
                return resultColor === this.bet.value;
            case "parity":
                return resultParity === this.bet.value;
            default:
                return false;
        }
    }
    // Calcular la ganancia
    calculatePayout(win) {
        if (!win)
            return 0;
        switch (this.bet.type) {
            case "number":
                return this.bet.amount * 35;
            case "color":
            case "parity":
                return this.bet.amount * 2;
            default:
                return 0;
        }
    }
    // Construir el mensaje con los resultados
    buildResultMessage(resultNumber, resultColor, resultParity, win, payout) {
        const resultDescription = `Resultado: ${resultNumber} (${resultColor}, ${resultParity}).`;
        return win
            ? `${resultDescription} ¡Ganaste! Has ganado ${payout}.`
            : `${resultDescription} Perdiste. Apostaste al número ${this.userBetNumber}. Tu ganancia es: 0.`;
    }
}
exports.Roulette = Roulette;
