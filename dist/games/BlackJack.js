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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blackjack = void 0;
const readlineSync = __importStar(require("readline-sync"));
class Blackjack {
    constructor(minBet) {
        this.minBet = minBet;
        this.betAmount = 0;
        this.playerHand = [];
        this.dealerHand = [];
    }
    drawCard() {
        return Math.floor(Math.random() * 13) + 1;
    }
    calculateHandTotal(hand) {
        let total = 0;
        let aces = 0;
        for (const card of hand) {
            if (card > 10) {
                total += 10;
            }
            else if (card === 1) {
                aces++;
                total += 11;
            }
            else {
                total += card;
            }
        }
        while (total > 21 && aces > 0) {
            total -= 10;
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
            const choice = readlineSync.question("¿Quieres pedir carta (hit) o plantarte (stand)? (h/s): ").toLowerCase();
            if (choice === "h") {
                this.playerHand.push(this.drawCard());
                playerTotal = this.calculateHandTotal(this.playerHand);
            }
            else if (choice === "s") {
                break;
            }
            else {
                console.log("Opción no válida. Por favor, ingresa 'h' para pedir carta o 's' para plantarte.");
            }
        }
    }
    dealerTurn() {
        let dealerTotal = this.calculateHandTotal(this.dealerHand);
        console.log(`Cartas del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal})`);
        while (dealerTotal < 17) {
            console.log("El dealer pide carta...");
            this.dealerHand.push(this.drawCard());
            dealerTotal = this.calculateHandTotal(this.dealerHand);
            console.log(`Cartas del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal})`);
        }
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Comienza el juego de Blackjack.");
            this.getBet();
            this.playerHand = [this.drawCard(), this.drawCard()];
            this.dealerHand = [this.drawCard(), this.drawCard()];
            console.log(`Tus cartas: ${this.playerHand.join(", ")}`);
            console.log(`Carta visible del dealer: ${this.dealerHand[0]}`);
            yield this.playerTurn();
            yield this.dealerTurn();
            const playerTotal = this.calculateHandTotal(this.playerHand);
            const dealerTotal = this.calculateHandTotal(this.dealerHand);
            console.log(`Tus cartas finales: ${this.playerHand.join(", ")} (Total: ${playerTotal})`);
            console.log(`Cartas finales del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal})`);
            if (playerTotal > 21) {
                return "Te has pasado de 21. Has perdido.";
            }
            if (dealerTotal > 21) {
                return `El dealer se pasó de 21. Has ganado ${this.betAmount * 2}.`;
            }
            if (playerTotal > dealerTotal) {
                return `¡Felicidades! Has ganado ${this.betAmount * 2}.`;
            }
            else if (playerTotal < dealerTotal) {
                return `Lo siento, has perdido.`;
            }
            else {
                return "Empate.";
            }
        });
    }
}
exports.Blackjack = Blackjack;
