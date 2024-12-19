import * as readlineSync from "readline-sync";

// Asegúrate de exportar la clase Blackjack
export class Blackjack {
    private playerHand: number[];
    private dealerHand: number[];
    private minBet: number;
    private betAmount: number;

    constructor(minBet: number) {
        this.minBet = minBet;
        this.betAmount = 0;
        this.playerHand = [];
        this.dealerHand = [];
    }

    private drawCard(): number {
        return Math.floor(Math.random() * 13) + 1; // Cartas de 1 a 13 (1 = As, 11 = J, 12 = Q, 13 = K)
    }

    private calculateHandTotal(hand: number[]): number {
        let total = 0;
        let aces = 0;

        for (const card of hand) {
            if (card > 10) {
                total += 10; // J, Q, K valen 10
            } else if (card === 1) {
                aces++;
                total += 11; // As inicialmente cuenta como 11
            } else {
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

    private getBet(): void {
        let bet: number = 0;
        while (bet < this.minBet) {
            bet = parseInt(readlineSync.question(`Tu apuesta mínima es ${this.minBet}. Ingresa la cantidad a apostar: `), 10);
            if (bet < this.minBet) {
                console.log(`La apuesta mínima es ${this.minBet}. Por favor, ingresa una cantidad válida.`);
            }
        }
        this.betAmount = bet;
    }

    private playerTurn(): void {
        let playerTotal = this.calculateHandTotal(this.playerHand);
        while (playerTotal < 21) {
            console.log(`Tus cartas: ${this.playerHand.join(", ")} (Total: ${playerTotal})`);
            console.log(`Carta visible del dealer: ${this.dealerHand[0]}`);
            const choice = readlineSync.question("¿Quieres pedir carta (hit) o plantarte (stand)? (h/s): ");
            if (choice === "h") {
                this.playerHand.push(this.drawCard());
                playerTotal = this.calculateHandTotal(this.playerHand);
            } else if (choice === "s") {
                break;
            } else {
                console.log("Opción no válida.");
            }
        }
    }

    private dealerTurn(): void {
        let dealerTotal = this.calculateHandTotal(this.dealerHand);
        console.log(`Cartas del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal})`);

        while (dealerTotal < 17) {
            console.log("El dealer pide carta...");
            this.dealerHand.push(this.drawCard());
            dealerTotal = this.calculateHandTotal(this.dealerHand);
            console.log(`Cartas del dealer: ${this.dealerHand.join(", ")} (Total: ${dealerTotal})`);
        }
    }

    public play(): string {
        console.log("Comienza el juego de Blackjack.");

        // Pedir la apuesta
        this.getBet();

        // Repartir las cartas
        this.playerHand = [this.drawCard(), this.drawCard()];
        this.dealerHand = [this.drawCard(), this.drawCard()];

        // Mostrar las cartas
        console.log(`Tus cartas: ${this.playerHand.join(", ")}`);
        console.log(`Carta visible del dealer: ${this.dealerHand[0]}`);

        // Turno del jugador
        this.playerTurn();

        // Turno del dealer
        this.dealerTurn();

        // Mostrar los resultados
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
        } else if (playerTotal < dealerTotal) {
            return `Lo siento, has perdido.`;
        } else {
            return "Empate.";
        }
    }
}
