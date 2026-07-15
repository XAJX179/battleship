import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { Display } from "./display.js";
import "./style.css";

export const Game = (() => {
  let player1;
  let player2;
  let display;

  function start() {
    player1 = new Player();
    player2 = new Player("computer");

    let ship1 = new Ship(4);
    player1.gameboard.place(ship1, "a1");
    let ship2 = new Ship(3);
    player1.gameboard.place(ship2, "c1");

    let ship3 = new Ship(4);
    player2.gameboard.place(ship3, "a1");
    let ship4 = new Ship(3);
    player2.gameboard.place(ship4, "c1");

    display = new Display();

    display.drawBoard(player1.gameboard, player1.type);
    display.drawBoard(player2.gameboard, player2.type);

    display.drawShips(player1.gameboard);

    player1.gameboard.receiveAttack("a1");
    player1.gameboard.receiveAttack("b1");
    player1.gameboard.receiveAttack("c1");
    player1.gameboard.receiveAttack("d1");
    player1.gameboard.receiveAttack("d2");

    display.drawHitAndMiss(player1.gameboard);
    display.drawHitAndMiss(player2.gameboard);

    display.setBoardEvent(player2.gameboard);
  }

  function playComputerTurn() {
    player2.autoPlayTurn();
    display.drawHitAndMiss(player1.gameboard);
    if (!player1.gameboard.allShipsSunk()) {
      display.setBoardEvent(player2.gameboard);
    } else {
      display.declareWinner(player2);
    }
  }

  function getPlayer1() {
    return player1;
  }
  function getPlayer2() {
    return player2;
  }

  return { start, playComputerTurn, getPlayer1, getPlayer2 };
})();

Game.start();
