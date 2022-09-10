<script lang="ts">
  import { isBlack, type Card, type Suit } from "./Deck";

  export let card: Card;
  export let onClick: (card: Card) => void;

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

  function handleClick(e: MouseEvent) {
    onClick(card);
  }
</script>

<div class={["card", isBlack(card) ? "black" : "red"].join(" ")} on:click|stopPropagation={handleClick}>
  <span>{rank(card.rank)}</span>
  <span>{suit(card.suit)}</span>
</div>

<style type="scss">
  .card {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 7vw;
    height: 10vw;
    background-color: #eee;
    font-size: 3.5vw;
    line-height: 3.5vw;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 0.5vw;
    padding: 0.5vw;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    cursor: pointer;

    &.black {
      color: black;
    }

    &.red {
      color: red;
    }
  }
</style>
