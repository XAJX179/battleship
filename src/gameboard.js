export class Gameboard {
  static EMPTY = 0;
  static SHIP = 1;
  static MISS = 2;
  static HIT = 3;

  id;
  data;
  allShips;

  constructor() {
    this.id = crypto.randomUUID();
    this.data = new Array(100).fill(Gameboard.EMPTY);
    this.allShips = [];
  }

  place(ship, coord) {
    let index = this.getIndex(coord);
    let valid = this.isIndexValid(index, ship);
    if (valid) {
      this.placeShip(index, ship);
      this.allShips.push(ship);

      return true;
    } else {
      return false;
    }
  }

  // yAxis: A-J horizontal lanes
  // xAxis: 1-10 vertical columns
  getIndex(coord) {
    let yAxis = coord.charAt(0).toUpperCase();
    let xAxis = Number(coord.slice(1));

    let code = yAxis.codePointAt(0);

    let yAxisIndex = code - 65; // read ASCII table  A's value is 65
    yAxisIndex = yAxisIndex * 10;

    // shift for 0 start index in arr
    let xAxisIndex = xAxis - 1;

    return yAxisIndex + xAxisIndex;
  }

  isIndexValid(index, ship) {
    if (this.indexOutside(index)) {
      return false;
    } else {
      if (this.shipPlacableAt(index, ship)) {
        return true;
      } else {
        return false;
      }
    }
  }

  indexOutside(index) {
    return index < 0 || index > 99;
  }

  shipPlacableAt(index, ship) {
    let invalid = false;
    for (let i = 0; i < ship.length; i++) {
      if (invalid) {
        return false;
      }
      if ((index + i) % 10 === 9) {
        // reached end
        invalid = true;
      }
      if (this.data[index + i] !== 0) {
        // index is not empty
        invalid = true;
      }
    }
    return true;
  }

  placeShip(index, ship) {
    if (ship.placedAt !== undefined) {
      // removing ship from it's prev position if placed somewhere else
      for (let i = 0; i < ship.length; i++) {
        this.data[ship.placedAt + i] = Gameboard.EMPTY;
      }
      this.allShips.splice(this.allShips.indexOf(ship), 1);
    }

    for (let i = 0; i < ship.length; i++) {
      this.data[index + i] = Gameboard.SHIP;
    }
    ship.placedAt = index;
  }

  receiveAttack(coord) {
    let index = this.getIndex(coord);
    if (this.indexOutside(index)) {
      throw Error("Index outside of board!");
    }

    let value = this.data[index];

    if (value == Gameboard.SHIP) {
      this.data[index] = Gameboard.HIT;
      let attackedShip = this.getShipAt(index);
      attackedShip.hit();
      return true;
    } else if (value == Gameboard.EMPTY) {
      this.data[index] = Gameboard.MISS;
    }
    return false;
  }

  getShipAt(index) {
    let value;
    this.allShips.forEach((ship) => {
      for (let i = 0; i < ship.length; i++) {
        if (ship.placedAt + i == index) {
          value = ship;
        }
      }
    });
    return value;
  }

  allShipsSunk() {
    return !this.allShips.some((ship) => !ship.isSunk());
  }

  canAttackAt(index) {
    if (
      this.data[index] !== Gameboard.HIT &&
      this.data[index] !== Gameboard.MISS
    ) {
      return true;
    }
    return false;
  }

  randomCoordForShipPlacement(ship) {
    let randomIndex;
    let attempt = 0;
    do {
      attempt++;
      if (attempt > 1000) {
        throw Error(
          "Exiting early cause could not find random valid value after many tries, refresh.",
        );
      }
      randomIndex = Math.floor(Math.random() * this.data.length);
    } while (!this.shipPlacableAt(randomIndex, ship));
    return this.getCoord(randomIndex);
  }

  getCoord(index) {
    return (
      String.fromCodePoint(Math.floor((index - (index % 10)) / 10) + 65) +
      String((index % 10) + 1)
    );
  }
}
