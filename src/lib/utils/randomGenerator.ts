// Implementation of a linear congruential generator
// https://rosettacode.org/wiki/Linear_congruential_generator

export function createGenerator(seed: number) {
  let state = seed;
  return function (): number {
    state = (214013 * state + 2531011) & 0x7fffffff;
    return state >> 16;
  };
}
