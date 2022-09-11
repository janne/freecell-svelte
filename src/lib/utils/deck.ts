import { createGenerator } from "./randomGenerator";

export type Suit = "D" | "C" | "H" | "S";

export type Card = {
  rank: number;
  suit: Suit;
};

export function createDeck(): Card[] {
  return [...Array(13).keys()]
    .map((rank) =>
      ["C", "D", "H", "S"].map(
        (suit) =>
          ({
            rank: rank + 1,
            suit
          } as Card)
      )
    )
    .flat();
}

export function shuffleDeck(deck: Card[], seed: number): Card[] {
  const fromDeck = [...deck];
  const shuffledDeck: Card[] = [];
  const generator = createGenerator(seed);

  while (fromDeck.length > 0) {
    const index = generator() % fromDeck.length;
    shuffledDeck.push(fromDeck[index]);
    fromDeck.splice(index, 1, fromDeck[fromDeck.length - 1]);
    fromDeck.splice(fromDeck.length - 1);
  }

  return shuffledDeck;
}

export function deckToString(deck: Card[]): String {
  return deck.map((card) => `${card.rank}${card.suit}`).join(", ");
}

export function isBlack(card: Card): boolean {
  return ["C", "S"].includes(card.suit);
}
