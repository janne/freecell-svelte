<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "./Deck";

  export let stack: CardType[];
  export let onClick: (card: CardType) => void;
</script>

<div class="column">
  {#each stack as card}
    <div class="card-wrapper">
      <Card {card} {onClick} />
    </div>
  {/each}
</div>

<style>
  .column {
    margin-top: 10vw;
  }

  .card-wrapper {
    margin-top: -100%;
  }
</style>
