import { createGenerator } from "./randomGenerator";

test("returns a function", () => {
  expect(typeof createGenerator(1)).toBe("function");
});

const random = [41, 18467, 6334, 26500, 19169];
const generator = createGenerator(1);

random.forEach((random) => {
  test(`generates number ${random}`, () => {
    expect(generator()).toBe(random);
  });
});
