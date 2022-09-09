<script lang="ts">
  import Card from "./Card.svelte";

  import type { Card as CardType } from "./Deck";
  import Space from "./Space.svelte";

  export let card: CardType | null;
</script>

{#if !card}
  <Space />
{/if}

{#if card}
  <Card {card} />
{/if}
