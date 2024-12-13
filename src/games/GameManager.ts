// src/games/GameManager.ts
import { AbstractGame } from "../abstract/AbstractGame";

export class GameManager {
    private currentGame: AbstractGame | null = null;

    setGame(game: AbstractGame): void {
        this.currentGame = game;
    }

    getCurrentGame(): AbstractGame | null {
        return this.currentGame;
    }

    play(): string {
        if (!this.currentGame) {
            return "No se ha seleccionado un juego.";
        }
        return this.currentGame.play();
    }
}
