export class Ship {
  length;
  hitsTaken = 0;

  constructor(length) {
    this.length = Number(length);
  }

  hit() {
    if (this.length > this.hitsTaken && this.hitsTaken >= 0) {
      this.hitsTaken++;
      return true;
    } else {
      throw Error("Ship is already destroyed!");
    }
  }

  isSunk() {
    return this.hitsTaken >= this.length;
  }
}
