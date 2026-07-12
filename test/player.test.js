import { Gameboard } from "../src/gameboard.js";
import { Player } from "../src/player.js";

describe("player", () => {
  let player;
  beforeAll(() => {
    player = new Player();
  });
  test("can create player objects", () => {
    expect(player).toBeInstanceOf(Player);
  });
  test("has gameboard", () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });
  test("has type", () => {
    expect(player.type).toBe("real");
  });
});
