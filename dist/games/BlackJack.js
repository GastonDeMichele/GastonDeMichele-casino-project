"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blackjack = void 0;
const readlineSync = __importStar(require("readline-sync"));
// Asegúrate de exportar la clase Blackjack// Asegúrate de exportar la clase Blackjack
class Blackjack {
    constructor(minBet) {
        this.minBet = minBet;
        this.betAmount = 0;
        this.playerHand = [];
        this.dealerHand = [];
    }
    drawCard() {
        return Math.floor(Math.random() * 13) + 1; // Cartas de 1 a 13 (1 = As, 11 = J, 12 = Q, 13 = K)
    }
    calculateHandTotal(hand) {
        let total = 0;
        let aces = 0;
        for (const card of hand) {
            if (card > 10) {
                total += 10; // J, Q, K valen 10
            }
            else if (card === 1) {
                aces++;
                total += 11; // As inicialmente cuenta como 11
            }
            else {
                total += card;
            }
        }
        // Ajustar valor de los Ases si el total supera 21
        while (total > 21 && aces > 0) {
            total -= 10; // Cambia un As de 11 a 1
            aces--;
        }
        return total;
    }
    getBet() {
        let bet = 0;
        while (bet < this.minBet) {
            bet = parseInt(readlineSync.question(`Tu apuesta mínima es ${this.minBet}. Ingresa la cantidad a apostar: `), 10);
            if (bet < this.minBet) {
                console.log(`La apuesta mínima es ${this.minBet}. Por favor, ingresa una cantidad válida.`);
            }
        }
        this.betAmount = bet;
    }
    playerTurn() {
        let playerTotal = this.calculateHandTotal(this.playerHand);
        while (playerTotal < 21) {
            console.log(`Tus cartas: ${this.playerHand.join(", ")} (Total: ${playerTotal})`);
            console.log(`Carta visible del dealer: ${this.dealerHand[0]}`);
            const action = readlineSync.question("¿Qué deseas hacer? (hit = pedir carta / stand = plantarte): ").trim().toLowerCase();
            if (action === "hit") {
                const newCard = this.drawCard();
                this.playerHand.push(newCard);
                playerTotal = this.calculateHandTotal(this.playerHand);
                console.log(`Recibiste: ${newCard}. Total actual: ${playerTotal}`);
            }
            else if (action === "stand") {
                break;
            }
            else {
                console.log("Opción no válida. Por favor, escribe 'hit' o 'stand'.");
            }
        }
        if (playerTotal > 21) {
            console.log("¡Te has pasado de 21! Has perdido.");
        }
    }
    dealerTurn() {
        let dealerTotal = this.calculateHandTotal(this.dealerHand);
        console.log(`Cartas del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal})`);
        while (dealerTotal < 17) {
            const newCard = this.drawCard();
            this.dealerHand.push(newCard);
            dealerTotal = this.calculateHandTotal(this.dealerHand);
            console.log(`El dealer recibe: ${newCard}. Total actual: ${dealerTotal}`);
        }
        if (dealerTotal > 21) {
            console.log("El dealer se pasó de 21. ¡Has ganado!");
        }
    }
    play() {
        console.log("¡Bienvenido al Blackjack!");
        this.getBet(); // Obtener apuesta inicial
        // Repartir cartas iniciales
        this.playerHand = [this.drawCard(), this.drawCard()];
        this.dealerHand = [this.drawCard(), this.drawCard()];
        // Mostrar cartas iniciales
        console.log(`Tus cartas: ${this.playerHand.join(", ")} (Total: ${this.calculateHandTotal(this.playerHand)})`);
        console.log(`Carta visible del dealer: ${this.dealerHand[0]}`);
        // Turno del jugador
        this.playerTurn();
        if (this.calculateHandTotal(this.playerHand) > 21) {
            return; // El jugador ya perdió, no continuamos con el dealer
        }
        // Turno del dealer
        this.dealerTurn();
        // Determinar el resultado final
        const playerTotal = this.calculateHandTotal(this.playerHand);
        const dealerTotal = this.calculateHandTotal(this.dealerHand);
        if (dealerTotal > 21 || playerTotal > dealerTotal) {
            const payout = this.betAmount * 2;
            console.log(`¡Ganaste ${payout}!`);
        }
        else if (playerTotal === dealerTotal) {
            console.log("Es un empate. Recuperas tu apuesta.");
        }
        else {
            console.log("Perdiste. Mejor suerte la próxima vez.");
        }
    }
}
exports.Blackjack = Blackjack;
