<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "./Deck";
  import Space from "./Space.svelte";

  export let stack: CardType[];
  export let onClick: (card: CardType, count: number) => void;
</script>

<div class="column">
  {#if stack.length == 0}
    <div class="card-wrapper">
      <Space />
    </div>
  {/if}
  {#each stack as card, i}
    <div class="card-wrapper">
      <Card {card} onClick={(card) => onClick(card, stack.length - i)} />
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
