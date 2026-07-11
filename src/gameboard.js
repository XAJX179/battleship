export class Gameboard {
  data;

  constructor() {
    this.data = new Array(100).fill(0);
  }

  place(ship, coord) {
    let index = this.getIndex(coord);
    let valid = this.isIndexValid(index, ship);
    if (valid) {
      this.placeShip(index, ship);
      console.log(this.data);
      return true;
    } else {
      return false;
    }
  }

  // xAxis: A-J horizontal lanes
  // yAxis: 1-10 vertical columns
  getIndex(coord) {
    let xAxis = coord.charAt(0).toUpperCase();
    let yAxis = Number(coord.slice(1));

    let code = xAxis.codePointAt(0);

    let xAxisIndex = code - 65; // read ASCII table  A's value is 65
    xAxisIndex = xAxisIndex * 10;

    // shift for 0 start index in arr
    let yAxisIndex = yAxis - 1;

    // console.log(xAxisIndex + yAxisIndex);
    // console.log(this.data[xAxisIndex + yAxisIndex]);
    return xAxisIndex + yAxisIndex;
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
    for (let i = 0; i < ship.length; i++) {
      this.data[index + i] = 1;
    }
  }
}
