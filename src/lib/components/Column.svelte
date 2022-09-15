<script lang="ts">
  import Card from "./Card.svelte";
  import { cardKey, type Card as CardType } from "../utils/deck";

  export let stack: CardType[];
  export let onClick: (card: CardType, count: number) => void;
</script>

<div class="column">
  {#each stack as card, index (cardKey(card))}
    <Card {card} onClick={(card) => onClick(card, stack.length - index)} {index} />
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
</style>
