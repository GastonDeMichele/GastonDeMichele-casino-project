// src/utils/FileReader.ts
import * as fs from "fs";
import * as path from "path";

// Función para leer el archivo de instrucciones
export function readInstructions(gameName: string): string {
    const filePath = path.join(__dirname, `../../assets/game-instructions/${gameName}.txt`);
    try {
        return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
        console.error("Error al leer el archivo de instrucciones:", error);
        return "No se pudo cargar las instrucciones del juego.";
    }
}
