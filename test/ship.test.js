import { Ship } from "../src/ship.js";

describe("ship", () => {
  let ship;
  beforeAll(() => {
    ship = new Ship("2");
  });

  test("can create ship objects", () => {
    expect(ship).toBeInstanceOf(Ship);
  });
  test("ship objects have length", () => {
    expect(ship.length).toBe(2);
  });
  test("ship objects have hitsTaken default 0", () => {
    expect(ship.hitsTaken).toBe(0);
  });
  test("can get hit()", () => {
    ship.hit();
    expect(ship.hitsTaken).toBe(1);
  });
  test("when ship is not destroyed calling isSunk() returns false", () => {
    expect(ship.isSunk()).toBeFalsy();
  });
  test("hit() increases hitsTaken till length", () => {
    ship.hit();
    expect(ship.hitsTaken).toBe(2);
  });
  test("once ship is destroyed calling hit() throws error", () => {
    expect(() => ship.hit()).toThrow("Ship is already destroyed!");
  });
  test("once ship is destroyed calling isSunk() returns true", () => {
    expect(ship.isSunk()).toBeTruthy();
  });
});
