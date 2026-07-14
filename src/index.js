import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { Display } from "./display.js";
import "./style.css";

const Game = (() => {
  function start() {
    let player1 = new Player();
    let player2 = new Player("computer");

    let ship1 = new Ship(4);
    player1.gameboard.place(ship1, "a1");
    let ship2 = new Ship(3);
    player1.gameboard.place(ship2, "c1");

    let ship3 = new Ship(4);
    player2.gameboard.place(ship3, "a1");
    let ship4 = new Ship(3);
    player2.gameboard.place(ship4, "c1");

    let display = new Display();

    display.drawBoard(player1.gameboard, player1.type);
    display.drawBoard(player2.gameboard, player2.type);

    display.drawShips(player1.gameboard);

    player1.gameboard.receiveAttack("a1");
    player1.gameboard.receiveAttack("b1");
    player1.gameboard.receiveAttack("c1");
    player1.gameboard.receiveAttack("d1");
    player1.gameboard.receiveAttack("d2");

    display.drawHitAndMiss(player1.gameboard);
  }

  return { start };
})();

Game.start();
