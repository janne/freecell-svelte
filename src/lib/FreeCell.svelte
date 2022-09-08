<script lang="ts">
  import type { Card } from "./Deck";

  export let card: Card | null;
</script>

<div class={card ? "card" : "empty"}>{card ? `${card.rank} of ${card.suit}` : ""}</div>

<style type="scss">
  div {
    display: flex;
    width: 6vw;
    height: 9vw;
  }

  .empty {
    border: 2px solid grey;
  }
</style>
