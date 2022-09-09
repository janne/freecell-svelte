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
  const newGame = { ...game };
  newGame.homeCells.forEach((stack, i) => {
    newGame.homeCells[i] = stack.filter((card) => card != newCard);
  });
  newGame.tableau.forEach((stack, i) => {
    newGame.tableau[i] = stack.filter((card) => card != newCard);
  });
  newGame.freeCells.forEach((card, i) => {
    if (card == newCard) {
      newGame.freeCells[i] = null;
    }
  });
  return newGame;
}

type GameUpdater = (game: Game) => Game;

export function addCardInHome(card: Card, game: Game): GameUpdater | null {
  const newGame = { ...game };
  if (card.rank === 1) {
    const index = newGame.homeCells.findIndex((column) => column.length === 0);
    if (index != -1) {
      return (game: Game) => {
        const cell = game.homeCells[index];
        cell.push(card);
        return game;
      };
    }
  }

  const target = newGame.homeCells.find((column) => {
    const lastCard = column[column.length - 1];
    return lastCard.suit === card.suit && lastCard.rank + 1 === card.rank;
  });
  if (target) {
    return (game: Game) => {
      target.push(card);
      return newGame;
    };
  }

  return null;
}
