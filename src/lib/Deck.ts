export type Suit = "D" | "C" | "H" | "S";

export type Card = {
  rank: number;
  suit: Suit;
};

export function createDeck(): Card[] {
  return ["D", "C", "H", "S"]
    .map((suit) =>
      [...Array(13).keys()].map(
        (v) =>
          ({
            rank: v + 1,
            suit
          } as Card)
      )
    )
    .flat();
}

export function shuffleDeck(deck: Card[]): Card[] {
  return deck.reduce<Card[]>((deck, card, i) => {
    const pos = Math.floor(Math.random() * (i + 1));
    return [...deck.slice(0, pos), card, ...deck.slice(pos)];
  }, []);
}

export function deckToString(deck: Card[]): String {
  return deck.map((card) => `${card.rank}${card.suit}`).join(", ");
}

export function isBlack(card: Card): boolean {
  return ["C", "S"].includes(card.suit);
}
