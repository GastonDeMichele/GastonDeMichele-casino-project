import { AbstractGame } from "../abstract/AbstractGame";

export class SlotMachineB extends AbstractGame {
  private symbols: string[] = ["🍒", "🍇", "🍉", "🍊", "🍋"];

  constructor(minBet: number) {
    super(minBet); // Pasamos el minBet al constructor de la clase base AbstractGame
  }

  // Método play que no recibe parámetros. La apuesta se usa desde la propiedad 'bet' en AbstractGame.
  play(): string {
    if (this.bet.amount < this.minBet) {
      return `La apuesta mínima es ${this.minBet}.`;
    }

    const result = this.spinReels();
    const win = this.checkWin(result);
    const payout = this.calculatePayout(win);
    return this.buildResultMessage(result, win, payout);
  }

  private spinReels(): string[] {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * this.symbols.length);
      result.push(this.symbols[randomIndex]);
    }
    return result;
  }

  private checkWin(result: string[]): boolean {
    return result[0] === result[1] || result[1] === result[2] || result[0] === result[2];
  }

  private calculatePayout(win: boolean): number {
    return win ? this.bet.amount * 5 : 0;
  }

  private buildResultMessage(result: string[], win: boolean, payout: number): string {
    const resultDescription = `Resultados de la tirada: ${result.join(" | ")}.`;
    return win
      ? `${resultDescription} ¡Ganaste! Has ganado ${payout}.`
      : `${resultDescription} Lo siento, no has ganado esta vez.`;
  }
}
