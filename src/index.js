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
    display = new Display();

    display.drawBoard(player1.gameboard, player1.type);
    display.drawBoard(player2.gameboard, player2.type);

    let ship11 = new Ship(5);
    player2.gameboard.place(
      ship11,
      player2.gameboard.randomCoordForShipPlacement(ship11),
    );
    let ship12 = new Ship(4);
    player2.gameboard.place(
      ship12,
      player2.gameboard.randomCoordForShipPlacement(ship12),
    );
    let ship13 = new Ship(3);
    player2.gameboard.place(
      ship13,
      player2.gameboard.randomCoordForShipPlacement(ship13),
    );
    let ship14 = new Ship(3);
    player2.gameboard.place(
      ship14,
      player2.gameboard.randomCoordForShipPlacement(ship14),
    );
    let ship15 = new Ship(2);
    player2.gameboard.place(
      ship15,
      player2.gameboard.randomCoordForShipPlacement(ship15),
    );

    let ships = [];
    ships.push(new Ship(5));
    ships.push(new Ship(4));
    ships.push(new Ship(3));
    ships.push(new Ship(3));
    ships.push(new Ship(2));

    const shipPlacedPromise = display.promptShipPlacement(
      player1.gameboard,
      ships,
    );

    shipPlacedPromise.then(() => {
      display.drawShips(player1.gameboard);

      display.setBoardEvent(player2.gameboard);
    });
  }

  function playComputerTurn() {
    player2.autoPlayTurn(player1);
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
