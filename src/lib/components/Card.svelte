<script lang="ts">
  import type { Card } from "../utils/deck";

  export let card: Card;
  export let onClick: (card: Card) => void;
  export let index: number | null;

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
</script>

<div
  style={index == null ? "" : `position: absolute; top: calc(5vh * ${index})`}
  class={`card L${rank(card.rank)}${card.suit}`}
  on:click|stopPropagation={() => onClick(card)}
/>

<style type="scss">
  .card {
    display: flex;
    width: 12vw;
    height: 16vw;
    @media (min-width: 1000px) {
      width: 125px;
      height: 180px;
    }

    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
