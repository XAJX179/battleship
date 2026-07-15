import { Gameboard } from "./gameboard.js";

export class Player {
  gameboard;
  type;

  constructor(type = "real", gameboard = new Gameboard()) {
    this.gameboard = gameboard;
    this.type = type;
  }

  autoPlayTurn(enemy) {
    const data = this.gameboard.data;
    let randomIndex;
    let attempt = 0;
    do {
      attempt++;
      if (attempt > 1000) {
        throw Error(
          "Exiting early cause could not find random valid value after many tries, refresh.",
        );
      }
      randomIndex = Math.floor(Math.random() * data.length);
    } while (!enemy.gameboard.canAttackAt(randomIndex));

    let coord =
      String.fromCodePoint(
        Math.floor((randomIndex - (randomIndex % 10)) / 10) + 65,
      ) + String((randomIndex % 10) + 1);
    enemy.gameboard.receiveAttack(coord);
  }
}
