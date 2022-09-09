<script lang="ts">
  import type { Card, Suit } from "./Deck";

  export let card: Card;
  export let onClick: ((card: Card) => void) | null;

  function rank(rank: number): String {
    switch (rank) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
    }
    return rank.toString();
  }

  function suit(suit: Suit): String {
    switch (suit) {
      case "C":
        return "♣️";
      case "D":
        return "️♦️";
      case "H":
        return "️♥️";
      case "S":
        return "♠️";
    }
  }
</script>

<div
  class={["card", ["C", "S"].includes(card.suit) ? "black" : "red", ...[onClick == null ? [] : ["clickable"]]].join(
    " "
  )}
  on:click={() => onClick && onClick(card)}
>
  {rank(card.rank)}
  {suit(card.suit)}
</div>

<style type="scss">
  .black {
    color: black;
  }

  .red {
    color: red;
  }
  .card {
    overflow: hidden;
    display: flex;
    width: 6vw;
    height: 10vw;
    background-color: white;
    font-size: 2.2vw;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 0.5vw;
    padding: 0.5vw;
  }

  .clickable {
    cursor: pointer;
  }
</style>
