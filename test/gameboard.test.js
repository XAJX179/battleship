import { Ship } from "../src/ship.js";
import { Gameboard } from "../src/gameboard.js";

describe("gameboard", () => {
  let gameboard;
  beforeAll(() => {
    gameboard = new Gameboard();
  });

  test("can create gameboard objects", () => {
    expect(gameboard).toBeInstanceOf(Gameboard);
  });
  test("initializes an 100 items array with 0", () => {
    expect(gameboard.data).toContain(0);
  });
  describe("ship", () => {
    let ship;
    beforeAll(() => {
      ship = new Ship("4");
    });
    test("place ship on valid cordinates", () => {
      let coord = "b7";
      expect(gameboard.place(ship, coord)).toBeTruthy();
    });
    test("don't place ship on invalid cordinates", () => {
      let coord = "b7";
      // already placed a ship
      expect(gameboard.place(ship, coord)).toBeFalsy();
    });
    test("don't place ship on invalid cordinates", () => {
      let coord = "c8";
      // wrapping to next line since ship length is 4
      expect(gameboard.place(ship, coord)).toBeFalsy();
    });
    test("place ship on valid cordinates", () => {
      let coord = "c7";
      expect(gameboard.place(ship, coord)).toBeTruthy();
    });
  });
});
