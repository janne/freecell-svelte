import { createDeck, isBlack, shuffleDeck, type Card } from "./deck";

export type Game = {
  seed: number;
  freeCells: (Card | null)[];
  homeCells: Card[][];
  tableau: Card[][];
};

type GameUpdater = (game: Game) => Game;

export function createGame(seed: number): Game {
  const deck = shuffleDeck(createDeck(), seed);
  const tableau: Card[][] = [[], [], [], [], [], [], [], []];
  deck.forEach((card, i) => {
    tableau[i % 8].push(card);
  });

  return {
    seed,
    freeCells: [null, null, null, null],
    homeCells: [[], [], [], []],
    tableau
  };
}

export function removeCardFromGame(newCard: Card, game: Game): Game {
  return {
    ...game,
    homeCells: game.homeCells.map((stack) => stack.filter((card) => card != newCard)),
    freeCells: game.freeCells.map((card) => (card != newCard ? card : null)),
    tableau: game.tableau.map((stack) => stack.filter((card) => card != newCard))
  };
}

function setAtIndex<T>(item: T, index: number, list: T[]) {
  const pre = list.slice(0, index);
  const post = list.slice(index + 1);
  return [...pre, item, ...post];
}

function pushToListOfStacks<T>(item: T, index: number, list: T[][]): T[][] {
  return setAtIndex([...list[index], item], index, list);
}

function deleteFromListOfStacks<T>(column: number, index: number, list: T[][]): T[][] {
  const pre = list.slice(0, column);
  const stack = list[column].slice(0, index);
  const post = list.slice(column + 1);
  return [...pre, stack, ...post];
}

export function addCardInHome(card: Card, game: Game): GameUpdater | null {
  if (card.rank === 1) {
    const index = game.homeCells.findIndex((column) => column.length === 0);
    if (index != -1) {
      return (game: Game) => ({ ...game, homeCells: pushToListOfStacks(card, index, game.homeCells) });
    }
  }

  const index = game.homeCells.findIndex((column) => {
    if (column.length == 0) return false;
    const lastCard = column[column.length - 1];
    return lastCard.suit === card.suit && lastCard.rank + 1 === card.rank;
  });
  if (index != -1) {
    return (game: Game) => ({ ...game, homeCells: pushToListOfStacks(card, index, game.homeCells) });
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
    return (game: Game) => ({ ...game, tableau: pushToListOfStacks(card, i, game.tableau) });
  }

  const j = game.tableau.findIndex((column) => column.length === 0);
  if (j != -1) {
    return (game: Game) => ({ ...game, tableau: pushToListOfStacks(card, j, game.tableau) });
  }

  return null;
}

export function addCardInFreeCell(card: Card, game: Game): GameUpdater | null {
  const index = game.freeCells.findIndex((cell) => cell == null);
  if (index != -1) {
    return (game: Game) => ({ ...game, freeCells: setAtIndex(card, index, game.freeCells) });
  }
  return null;
}

export function addCard(card: Card, game: Game): GameUpdater | null {
  return [addCardInHome, addCardInStack, addCardInFreeCell].reduce<GameUpdater | null>((memo, fn) => {
    if (memo) return memo;
    return fn(card, game);
  }, null);
}

export function moveStack(card: Card, game: Game, count: number): GameUpdater | null {
  const free_columns = game.tableau.filter((column) => column.length === 0).length;
  const free_cells = game.freeCells.filter((cell) => cell === null).length;
  const max_moved = (2 ^ free_columns) * (free_cells + 1);

  if (count > max_moved) return null;

  const column = game.tableau.findIndex((column) => column.includes(card))!;
  const index = game.tableau[column].findIndex((c) => c == card);
  const cards = game.tableau[column].slice(index, index + count);

  for (let i = 1; i < cards.length; i++) {
    if (isBlack(cards[i]) === isBlack(cards[i - 1])) return null;
    if (cards[i].rank !== cards[i - 1].rank - 1) return null;
  }

  const i = game.tableau.findIndex((column) => {
    if (column.length == 0) return false;
    const lastCard = column[column.length - 1];
    return isBlack(lastCard) !== isBlack(card) && lastCard.rank === card.rank + 1;
  });
  if (i != -1) {
    return (game: Game) => {
      const cards = game.tableau[column].slice(index, index + count);
      const tableau = cards.reduce((memo, card) => pushToListOfStacks(card, i, memo), game.tableau);
      return { ...game, tableau: deleteFromListOfStacks(column, index, tableau) };
    };
  }

  const max_moved_to_column = (2 ^ (free_columns - 1)) * (free_cells + 1);
  if (count > max_moved_to_column) return null;

  const j = game.tableau.findIndex((column) => column.length === 0);
  if (j != -1) {
    return (game: Game) => {
      const cards = game.tableau[column].slice(index, index + count);
      const tableau = cards.reduce((memo, card) => pushToListOfStacks(card, j, memo), game.tableau);
      return { ...game, tableau: deleteFromListOfStacks(column, index, tableau) };
    };
  }

  return null;
}
