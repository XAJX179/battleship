import { hi } from "../src/index.js";

test("says hi", () => {
  expect(hi()).toMatch("Hi!");
});
