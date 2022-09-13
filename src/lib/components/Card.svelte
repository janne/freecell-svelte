<script lang="ts">
  import { isBlack, type Card, type Suit } from "../utils/deck";

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
  <div class="rank">{rank(card.rank)}</div>
  <div class="suit">{suit(card.suit)}</div>
</div>

<style type="scss">
  .card {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    background-color: #eee;
    width: calc(var(--window-width) * 8);
    height: calc(var(--window-width) * 12);
    padding: calc(var(--window-width)) / 4;
    border: 1px solid black;
    border-radius: calc(var(--window-width));
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    cursor: pointer;
    position: relative;

    &.black {
      color: black;
    }

    &.red {
      color: red;
    }

    .rank {
      position: absolute;
      font-size: 2em;
      line-height: calc(var(--window-width) * 4);
      font-weight: bold;
      min-height: 0vw;
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
    }

    .suit {
      padding-top: calc(var(--window-width) * 1.5);
      width: 100%;
      align-self: center;
      justify-self: center;
      font-size: 5em;
    }
  }
</style>
