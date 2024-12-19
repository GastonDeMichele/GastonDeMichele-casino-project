import readline from "readline";
import { readInstructions } from "./utils/FileReader";
import { Blackjack } from "./games/BlackJack";
import { Roulette } from "./games/Roulette";
import { SlotMachineA } from "./games/SlotMachineA"; // Importar SlotMachineA
import { SlotMachineB } from "./games/SlotMachineB"; // Importar SlotMachineB

// Inicialización de la interfaz de entrada/salida
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Preguntar al usuario y esperar una respuesta
function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Función principal
async function main() {
  console.log("¡Bienvenido al casino!");
  console.log("Juegos disponibles: \n1. Roulette\n2. Blackjack\n3. Slot Machine A\n4. Slot Machine B");

  let exit = false;

  while (!exit) {
    const gameChoice = await askQuestion("¿Qué juego quieres jugar? (1 para Roulette, 2 para Blackjack, 3 para Slot Machine A, 4 para Slot Machine B, otra tecla para salir): ");

    switch (gameChoice) {
      case "1":
        await playRoulette();
        break;
      case "2":
        await playBlackjack();
        break;
      case "3":
        await playSlotMachine("SlotMachineA");
        break;
      case "4":
        await playSlotMachine("SlotMachineB");
        break;
      default:
        exit = true;
        console.log("Gracias por jugar. ¡Vuelve pronto!");
    }
  }

  rl.close();
}

// Función para jugar a la Ruleta
async function playRoulette() {
  console.log("Has elegido: Roulette");
  console.log(readInstructions("Roulette"));

  const minBet = 10;
  console.log(`La apuesta mínima es ${minBet}.`);
  const betAmount = parseInt(await askQuestion("¿Cuánto deseas apostar? "), 10);

  if (isNaN(betAmount) || betAmount < minBet) {
    console.log(`Apuesta inválida. La apuesta mínima es ${minBet}.`);
    return;
  }

  const betType = (await askQuestion("¿Qué deseas apostar? (número/color/rango): ")).toLowerCase();

  let resultMessage = "";

  if (betType === "número" || betType === "numero") {
    const number = parseInt(await askQuestion("Elige un número entre 0 y 36: "), 10);
    if (isNaN(number) || number < 0 || number > 36) {
      console.log("Número inválido. Elige un número entre 0 y 36.");
      return;
    }
    resultMessage = playRouletteGame("number", number, betAmount);
  } else if (betType === "color") {
    const color = (await askQuestion("Elige un color (rojo/negro): ")).toLowerCase();
    if (color !== "rojo" && color !== "negro") {
      console.log("Color inválido. Elige entre 'rojo' o 'negro'.");
      return;
    }
    resultMessage = playRouletteGame("color", color, betAmount);
  } else if (betType === "rango") {
    const range = (await askQuestion("Elige un rango (par/impar): ")).toLowerCase();
    if (range !== "par" && range !== "impar") {
      console.log("Rango inválido. Elige entre 'par' o 'impar'.");
      return;
    }
    resultMessage = playRouletteGame("parity", range, betAmount);
  } else {
    console.log("Opción de apuesta no válida.");
    return;
  }

  console.log(resultMessage);
}

// Simulación básica del juego de ruleta
function playRouletteGame(type: string, value: number | string, amount: number): string {
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
async function playBlackjack() {
  console.log("Has elegido: Blackjack");
  console.log(readInstructions("Blackjack"));

  const minBet = 10;
  console.log(`La apuesta mínima es ${minBet}.`);

  const blackjack = new Blackjack(minBet);
  

  const resultMessage = blackjack.play();
  console.log(resultMessage);
}

// Función para jugar SlotMachine
async function playSlotMachine(gameName: string) {
  console.log(`Has elegido: ${gameName}`);
  console.log(readInstructions(gameName));

  let slotMachine: SlotMachineA | SlotMachineB; // Cambia el tipo a la clase correcta
  const minBet = 10; // Apuesta mínima

  const betAmount = parseInt(await askQuestion(`¿Cuánto deseas apostar? (La apuesta mínima es ${minBet}): `), 10);

  if (isNaN(betAmount) || betAmount < minBet) {
    console.log(`Apuesta inválida. La apuesta mínima es ${minBet}.`);
    return;
  }

  if (gameName === "SlotMachineA") {
    slotMachine = new SlotMachineA(minBet);
  } else {
    slotMachine = new SlotMachineB(minBet);
  }

  slotMachine.setBet(betAmount);

  const resultMessage = slotMachine.play();
  console.log(resultMessage);
}

main();
