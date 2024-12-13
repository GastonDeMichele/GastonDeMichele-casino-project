"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotMachineA = void 0;
class SlotMachineA {
    constructor(minBet) {
        this.minBet = minBet;
    }
    // Función para jugar a la tragamonedas
    play() {
        const randomOutcome = Math.random();
        let resultMessage = "";
        if (randomOutcome < 0.1) {
            resultMessage = "¡Ganaste el premio mayor!";
        }
        else if (randomOutcome < 0.5) {
            resultMessage = "¡Ganaste algo!";
        }
        else {
            resultMessage = "¡Perdiste! Intenta de nuevo.";
        }
        return resultMessage;
    }
}
exports.SlotMachineA = SlotMachineA;
