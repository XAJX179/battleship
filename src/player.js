import { Gameboard } from "./gameboard";

export class Player {
  gameboard;
  type;

  constructor(gameboard = new Gameboard(), type = "real") {
    this.gameboard = gameboard;
    this.type = type;
  }
}
