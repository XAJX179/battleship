import { Gameboard } from "./gameboard.js";
import { Game } from "./index.js";

export class Display {
  boardsList;
  constructor() {
    this.boardsList = document.querySelector("ul.boards");
  }

  drawBoard(board, playerType) {
    let item = document.createElement("li");
    let itemHeading = document.createElement("h2");
    let grid = document.createElement("div");
    grid.classList.add("board");
    grid.dataset.id = board.id;
    itemHeading.textContent = playerType + " player";
    item.append(itemHeading);

    this.drawNumber(item);
    this.drawNotation(item);

    item.append(grid);

    this.boardsList.append(item);

    this.fillBoardGrid(grid);
  }

  drawNumber(item) {
    let numberLine = document.createElement("div");
    numberLine.classList.add("numberLine");
    for (let i = 1; i <= 10; i++) {
      let numP = document.createElement("p");
      numP.textContent = i;
      numberLine.append(numP);
    }
    item.append(numberLine);
  }
  drawNotation(item) {
    let notationLine = document.createElement("div");
    notationLine.classList.add("notationLine");
    for (let i = 0; i < 10; i++) {
      let noteP = document.createElement("p");
      noteP.textContent = String.fromCodePoint(i + 65);
      notationLine.append(noteP);
    }
    item.append(notationLine);
  }

  drawShips(board) {
    let grid = document.querySelector(`.board[data-id="${board.id}"]`);
    let lines = grid.children;
    for (let i = 0; i < 10; i++) {
      let line = lines[i];
      let cells = line.children;
      for (let y = 0; y < 10; y++) {
        let cell = cells[y];
        if (board.data[i * 10 + y] == Gameboard.SHIP) {
          cell.style.backgroundColor = "black";
        }
      }
    }
  }

  drawHitAndMiss(board) {
    let grid = document.querySelector(`.board[data-id="${board.id}"]`);
    let lines = grid.children;
    for (let i = 0; i < 10; i++) {
      let line = lines[i];
      let cells = line.children;
      for (let y = 0; y < 10; y++) {
        let cell = cells[y];
        if (board.data[i * 10 + y] == Gameboard.MISS) {
          cell.style.backgroundColor = "blue";
        } else if (board.data[i * 10 + y] == Gameboard.HIT) {
          cell.style.backgroundColor = "red";
        }
      }
    }
  }

  fillBoardGrid(grid) {
    const noOfLines = 10;
    for (let i = 0; i < noOfLines; i++) {
      let line = document.createElement("div");
      line.classList.add("line");
      for (let y = 0; y < noOfLines; y++) {
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.style.backgroundColor = `rgba(0,0,255,${Math.random() * 0.2})`;
        cellDiv.dataset.coord = String.fromCodePoint(i + 65) + (y + 1);
        line.append(cellDiv);
      }
      grid.append(line);
    }
  }

  setBoardEvent(board) {
    let grid = document.querySelector(`.board[data-id="${board.id}"]`);
    grid.addEventListener("click", this.handleBoardClick);
  }

  handleBoardClick = (e) => {
    if (e.target.classList.contains("cell")) {
      let coord = e.target.dataset.coord;
      let index = Game.getPlayer1().gameboard.getIndex(coord);
      if (Game.getPlayer2().gameboard.canAttackAt(index)) {
        Game.getPlayer2().gameboard.receiveAttack(coord);
        this.drawHitAndMiss(Game.getPlayer2().gameboard);
        e.currentTarget.removeEventListener("click", this.handleBoardClick);
        if (!Game.getPlayer2().gameboard.allShipsSunk()) {
          Game.playComputerTurn();
        } else {
          this.declareWinner(Game.getPlayer1());
        }
      }
    }
  };

  declareWinner(player) {
    let text = player.type + " player Won!";
    this.sendMessage(text);
  }

  sendMessage(text) {
    let message = document.querySelector("#message");
    message.textContent = text;
  }

  promptShipPlacement(board, ships) {
    return new Promise((resolve) => {
      console.log(ships);
      let grid = document.querySelector(`.board[data-id="${board.id}"]`);
      console.log(grid);
      const listener = (e) => {
        this.shipPlaceInput(e, board, ships);
        if (ships.length == 0) {
          grid.removeEventListener("click", listener);
          resolve();
        }
      };
      grid.addEventListener("click", listener);
    });
  }

  shipPlaceInput = (e, board, ships) => {
    console.log(e);
    console.log(e.target.dataset.coord);
    let coord = e.target.dataset.coord;
    if (coord !== undefined) {
      let ship = ships[0];
      let index = board.getIndex(coord);
      if (board.shipPlacableAt(index, ship)) {
        board.place(ship, coord);
        ships.shift();
        this.drawShips(board);
      }
    }
  };
}
