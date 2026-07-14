import { Gameboard } from "./gameboard.js";

export class Player {
  gameboard;
  type;

  constructor(type = "real", gameboard = new Gameboard()) {
    this.gameboard = gameboard;
    this.type = type;
  }
}
