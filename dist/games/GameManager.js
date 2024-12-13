"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
class GameManager {
    constructor() {
        this.currentGame = null;
    }
    setGame(game) {
        this.currentGame = game;
    }
    getCurrentGame() {
        return this.currentGame;
    }
    play() {
        if (!this.currentGame) {
            return "No se ha seleccionado un juego.";
        }
        return this.currentGame.play();
    }
}
exports.GameManager = GameManager;
