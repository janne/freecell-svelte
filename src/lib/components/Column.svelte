<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "../utils/deck";

  export let stack: CardType[];
  export let onClick: (card: CardType, count: number) => void;
</script>

<div class="column">
  {#each stack as card, i}
    <div class="card-wrapper" style={`top: calc(5vh * ${i})`}>
      <Card {card} index={i} onClick={(card) => onClick(card, stack.length - i)} />
    </div>
  {/each}
</div>

<style type="scss">
  .column {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .card-wrapper {
    position: absolute;
  }
</style>
