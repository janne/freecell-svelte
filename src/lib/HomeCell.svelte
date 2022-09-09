<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "./Deck";
  import Space from "./Space.svelte";

  export let stack: CardType[];
</script>

{#if stack.length == 0}
  <Space />
{/if}

{#if stack.length > 0}
  <Card card={stack[stack.length - 1]} />
{/if}
