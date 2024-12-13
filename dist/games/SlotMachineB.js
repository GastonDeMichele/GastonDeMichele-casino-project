"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotMachineB = void 0;
class SlotMachineB {
    constructor(minBet) {
        this.minBet = minBet;
    }
    // Función para jugar a la tragamonedas
    play() {
        const randomOutcome = Math.random();
        let resultMessage = "";
        if (randomOutcome < 0.2) {
            resultMessage = "¡Ganaste el premio mayor!";
        }
        else if (randomOutcome < 0.6) {
            resultMessage = "¡Ganaste algo!";
        }
        else {
            resultMessage = "¡Perdiste! Intenta de nuevo.";
        }
        return resultMessage;
    }
}
exports.SlotMachineB = SlotMachineB;
