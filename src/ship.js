export class Ship {
  length;
  hitsTaken;
  placedAt;

  constructor(length) {
    this.length = Number(length);
    this.hitsTaken = 0;
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
