import { createDeck, isBlack, shuffleDeck, type Card } from "./Deck";

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
  if (card.rank === 1) {
    const index = game.homeCells.findIndex((column) => column.length === 0);
    if (index != -1) {
      return (game: Game) => {
        game.homeCells[index].push(card);
        return game;
      };
    }
  }

  const index = game.homeCells.findIndex((column) => {
    if (column.length == 0) return false;
    const lastCard = column[column.length - 1];
    return lastCard.suit === card.suit && lastCard.rank + 1 === card.rank;
  });
  if (index != -1) {
    return (game: Game) => {
      game.homeCells[index].push(card);
      return game;
    };
  }
  return null;
}

export function addCardInStack(card: Card, game: Game): GameUpdater | null {
  const i = game.tableau.findIndex((column) => {
    if (column.length == 0) return false;
    const lastCard = column[column.length - 1];
    return isBlack(lastCard) !== isBlack(card) && lastCard.rank === card.rank + 1;
  });
  if (i != -1) {
    return (game: Game) => {
      game.tableau[i].push(card);
      return game;
    };
  }

  const j = game.tableau.findIndex((column) => column.length === 0);
  if (j != -1) {
    return (game: Game) => {
      game.tableau[j].push(card);
      return game;
    };
  }

  return null;
}

export function addCardInFreeCell(card: Card, game: Game): GameUpdater | null {
  const index = game.freeCells.findIndex((cell) => cell == null);
  if (index != -1) {
    return (game: Game) => {
      game.freeCells[index] = card;
      return game;
    };
  }
  return null;
}

export function addCard(card: Card, game: Game): GameUpdater | null {
  return [addCardInHome, addCardInStack, addCardInFreeCell].reduce<GameUpdater | null>((memo, fn) => {
    if (memo) return memo;
    return fn(card, game);
  }, null);
}
