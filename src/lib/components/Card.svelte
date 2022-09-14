<script lang="ts">
  import type { Card } from "../utils/deck";

  export let card: Card;
  export let onClick: (card: Card) => void;
  export let index: number = 0;

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

<div class={`card L${rank(card.rank)}${card.suit}`} on:click|stopPropagation={() => onClick(card)} />

<style type="scss">
  .card {
    display: flex;
    height: 12vmax;
    width: 8vmax;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
