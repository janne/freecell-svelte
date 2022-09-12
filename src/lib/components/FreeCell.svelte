<script lang="ts">
  import Card from "./Card.svelte";
  import Space from "./Space.svelte";

  import type { Card as CardType } from "../utils/deck";

  export let card: CardType | null;
  export let onClick: (card: CardType) => void;
</script>

{#if !card}
  <Space />
{/if}

{#if card}
  <Card {card} {onClick} />
{/if}
