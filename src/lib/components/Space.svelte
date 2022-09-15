<script type="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "../utils/deck";

  export let onClick: (card: CardType) => void;
  export let card: CardType | null;
</script>

<div class="space">
  {#if card != null}
    <Card {card} {onClick} index={null} />
  {/if}
</div>

<style type="scss">
  .space {
    outline: 2px solid #696;
    width: 11vw;
    height: 16vw;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 800px) {
      width: 100px;
      height: 140px;
      border-radius: 8px;
    }
  }
</style>
