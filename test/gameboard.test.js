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
    test("place ship on valid cordinates again", () => {
      let coord = "c7";
      expect(gameboard.place(ship, coord)).toBeTruthy();
    });
    test("can receive attack and miss", () => {
      let coord = "c6";
      expect(gameboard.receiveAttack(coord)).toBeFalsy();
    });
    test("can receive attack and hit", () => {
      let coord = "c7";
      expect(gameboard.receiveAttack(coord)).toBeTruthy();
    });
    test("can receive attack and ignore if already hit", () => {
      let coord = "c7";
      expect(gameboard.receiveAttack(coord)).toBeFalsy();
    });
    test("can receive attack and capture MISS", () => {
      let coord = "c6";
      gameboard.receiveAttack(coord);
      let index = gameboard.getIndex(coord);
      expect(gameboard.data[index]).toBe(Gameboard.MISS);
    });
    test("can receive attack and capture hit", () => {
      let coord = "c7";
      gameboard.receiveAttack(coord);
      let index = gameboard.getIndex(coord);
      expect(gameboard.data[index]).toBe(Gameboard.HIT);
    });
    test("can receive attack and call hit on ship if attacked", () => {
      let coord = "c7";
      gameboard.receiveAttack(coord);
      let index = gameboard.getIndex(coord);
      expect(gameboard.getShipAt(index).hitsTaken).toBe(1);
    });
  });
});
