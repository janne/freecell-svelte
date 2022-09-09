<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "./Deck";

  export let stack: CardType[];
</script>

<div class="column">
  {#each stack as card}
    <Card {card} />
  {/each}
</div>
