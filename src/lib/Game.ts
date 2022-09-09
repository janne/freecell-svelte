import { createDeck, shuffleDeck, type Card } from "./Deck";

type Game = {
  freeCells: (Card | null)[];
  homeCells: Card[][];
  tableau: Card[][];
};

export function createGame(): Game {
  const deck = shuffleDeck(createDeck());

  return {
    freeCells: [null, null, null, null],
    homeCells: [[], [], [], []],
    tableau: [...Array(8).keys()].map((col) => {
      const count = col < 4 ? 7 : 6;
      const index = col < 4 ? col * 7 : 7 * 4 + (col - 4) * 6;
      return deck.slice(index, index + count);
    })
  };
}

export function removeCardFromGame(newCard: Card, game: Game): Game {
  game.homeCells.forEach((stack, i) => {
    game.homeCells[i] = stack.filter((card) => card != newCard);
  });
  game.tableau.forEach((stack, i) => {
    game.tableau[i] = stack.filter((card) => card != newCard);
  });
  game.freeCells.forEach((card, i) => {
    if (card == newCard) {
      game.freeCells[i] = null;
    }
  });
  return game;
}
