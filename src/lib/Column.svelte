<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "./utils/deck";

  export let stack: CardType[];
  export let onClick: (card: CardType, count: number) => void;
  export let column: number;
</script>

<div class="column">
  {#each stack as card, i}
    <div class="card-wrapper" style={`top: ${i * 5}vh; left: calc(var(--window-width)*${column}*13);`}>
      <Card {card} onClick={(card) => onClick(card, stack.length - i)} />
    </div>
  {/each}
</div>

<style type="scss">
  .column {
    position: relative;
  }

  .card-wrapper {
    position: absolute;
  }
</style>
