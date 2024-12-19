"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const FileReader_1 = require("./utils/FileReader");
const BlackJack_1 = require("./games/BlackJack");
const SlotMachineA_1 = require("./games/SlotMachineA"); // Importar SlotMachineA
const SlotMachineB_1 = require("./games/SlotMachineB"); // Importar SlotMachineB
// Inicialización de la interfaz de entrada/salida
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Preguntar al usuario y esperar una respuesta
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
// Función principal
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("¡Bienvenido al casino!");
        console.log("Juegos disponibles: \n1. Roulette\n2. Blackjack\n3. Slot Machine A\n4. Slot Machine B");
        let exit = false;
        while (!exit) {
            const gameChoice = yield askQuestion("¿Qué juego quieres jugar? (1 para Roulette, 2 para Blackjack, 3 para Slot Machine A, 4 para Slot Machine B, otra tecla para salir): ");
            switch (gameChoice) {
                case "1":
                    yield playRoulette();
                    break;
                case "2":
                    yield playBlackjack();
                    break;
                case "3":
                    yield playSlotMachine("SlotMachineA");
                    break;
                case "4":
                    yield playSlotMachine("SlotMachineB");
                    break;
                default:
                    exit = true;
                    console.log("Gracias por jugar. ¡Vuelve pronto!");
            }
        }
        rl.close();
    });
}
// Función para jugar a la Ruleta
function playRoulette() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Has elegido: Roulette");
        console.log((0, FileReader_1.readInstructions)("Roulette"));
        const minBet = 10;
        console.log(`La apuesta mínima es ${minBet}.`);
        const betAmount = parseInt(yield askQuestion("¿Cuánto deseas apostar? "), 10);
        if (isNaN(betAmount) || betAmount < minBet) {
            console.log(`Apuesta inválida. La apuesta mínima es ${minBet}.`);
            return;
        }
        const betType = (yield askQuestion("¿Qué deseas apostar? (número/color/rango): ")).toLowerCase();
        let resultMessage = "";
        if (betType === "número" || betType === "numero") {
            const number = parseInt(yield askQuestion("Elige un número entre 0 y 36: "), 10);
            if (isNaN(number) || number < 0 || number > 36) {
                console.log("Número inválido. Elige un número entre 0 y 36.");
                return;
            }
            resultMessage = playRouletteGame("number", number, betAmount);
        }
        else if (betType === "color") {
            const color = (yield askQuestion("Elige un color (rojo/negro): ")).toLowerCase();
            if (color !== "rojo" && color !== "negro") {
                console.log("Color inválido. Elige entre 'rojo' o 'negro'.");
                return;
            }
            resultMessage = playRouletteGame("color", color, betAmount);
        }
        else if (betType === "rango") {
            const range = (yield askQuestion("Elige un rango (par/impar): ")).toLowerCase();
            if (range !== "par" && range !== "impar") {
                console.log("Rango inválido. Elige entre 'par' o 'impar'.");
                return;
            }
            resultMessage = playRouletteGame("parity", range, betAmount);
        }
        else {
            console.log("Opción de apuesta no válida.");
            return;
        }
        console.log(resultMessage);
    });
}
// Simulación básica del juego de ruleta
function playRouletteGame(type, value, amount) {
    const rouletteResult = Math.floor(Math.random() * 37); // Número aleatorio entre 0 y 36
    const isRed = rouletteResult % 2 === 0 && rouletteResult !== 0; // Números pares son rojos (excepto 0)
    if (type === "number") {
        return value === rouletteResult
            ? `¡Felicidades! El número ganador es ${rouletteResult}. Has ganado ${amount * 35}.`
            : `Lo siento. El número ganador es ${rouletteResult}. Has perdido tu apuesta.`;
    }
    if (type === "color") {
        const winningColor = isRed ? "rojo" : "negro";
        return value === winningColor
            ? `¡Felicidades! El color ganador es ${winningColor}. Has ganado ${amount * 2}.`
            : `Lo siento. El color ganador es ${winningColor}. Has perdido tu apuesta.`;
    }
    if (type === "parity") {
        const winningParity = rouletteResult % 2 === 0 ? "par" : "impar";
        return value === winningParity
            ? `¡Felicidades! El rango ganador es ${winningParity}. Has ganado ${amount * 2}.`
            : `Lo siento. El rango ganador es ${winningParity}. Has perdido tu apuesta.`;
    }
    return "Opción de apuesta no válida.";
}
// Función para jugar Blackjack
function playBlackjack() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Has elegido: Blackjack");
        console.log((0, FileReader_1.readInstructions)("Blackjack"));
        const minBet = 10;
        console.log(`La apuesta mínima es ${minBet}.`);
        const betAmount = parseInt(yield askQuestion("¿Cuánto deseas apostar? "), 10);
        if (isNaN(betAmount) || betAmount < minBet) {
            console.log(`Apuesta inválida. La apuesta mínima es ${minBet}.`);
            return;
        }
        const blackjack = new BlackJack_1.Blackjack(minBet);
        const resultMessage = blackjack.play();
        console.log(resultMessage);
    });
}
// Función para jugar SlotMachine
function playSlotMachine(gameName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Has elegido: ${gameName}`);
        console.log((0, FileReader_1.readInstructions)(gameName));
        let slotMachine; // Cambia el tipo a la clase correcta
        const minBet = 10; // Apuesta mínima
        const betAmount = parseInt(yield askQuestion(`¿Cuánto deseas apostar? (La apuesta mínima es ${minBet}): `), 10);
        if (isNaN(betAmount) || betAmount < minBet) {
            console.log(`Apuesta inválida. La apuesta mínima es ${minBet}.`);
            return;
        }
        if (gameName === "SlotMachineA") {
            slotMachine = new SlotMachineA_1.SlotMachineA(minBet);
        }
        else {
            slotMachine = new SlotMachineB_1.SlotMachineB(minBet);
        }
        slotMachine.setBet(betAmount);
        const resultMessage = slotMachine.play();
        console.log(resultMessage);
    });
}
main();
