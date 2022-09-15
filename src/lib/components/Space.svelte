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
    outline: 1px solid #696;
    width: 12vw;
    height: 16vw;
    @media (min-width: 1000px) {
      width: 125px;
      height: 180px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
</style>
