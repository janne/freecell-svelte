<script type="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "../utils/deck";

  export let onClick: (card: CardType) => void;
  export let card: CardType | null;
</script>

<div class="space">
  {#if card != null}
    <Card {card} {onClick} />
  {/if}
</div>

<style type="scss">
  .space {
    border: 1px solid #696;
    height: 12vmax;
    width: 8vmax;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
</style>
