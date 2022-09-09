<script lang="ts">
  import type { Card, Suit } from "./Deck";

  export let card: Card;

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

<div class={["card", ["C", "S"].includes(card.suit) ? "black" : "red"].join(" ")}>
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
    display: flex;
    width: 6vw;
    height: 9vw;
    background-color: white;
    font-size: 24px;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px;
  }
</style>
