// src/games/Blackjack.ts
import { AbstractGame } from "../abstract/AbstractGame";

export class Blackjack extends AbstractGame {
    private playerHand: number[];
    private dealerHand: number[];

    constructor(minBet: number) {
        super(minBet);
        this.playerHand = [];
        this.dealerHand = [];
    }

    // Genera una carta aleatoria (1 a 11)
    private drawCard(): number {
        return Math.floor(Math.random() * 11) + 1;
    }

    private calculateHandTotal(hand: number[]): number {
        return hand.reduce((total, card) => total + card, 0);
    }

    setBet(amount: number, type: string, value: number | string): string {
        if (amount < this.minBet) {
            return `La apuesta mínima es ${this.minBet}.`;
        }

        this.bet = { amount, type, value };
        return `Apuesta de ${amount} registrada para Blackjack.`;
    }

    play(): string {
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

    private buildResultMessage(playerTotal: number, dealerTotal: number, result: string): string {
        return `Tus cartas: ${this.playerHand.join(", ")} (Total: ${playerTotal}).\n` +
               `Cartas del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal}).\n` +
               `${result}`;
    }
}
