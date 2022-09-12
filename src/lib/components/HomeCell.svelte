<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "../utils/deck";
  import Space from "./Space.svelte";

  export let stack: CardType[];
  export let onClick: (card: CardType) => void;
</script>

{#if stack.length == 0}
  <Space />
{/if}

{#if stack.length > 0}
  <Card card={stack[stack.length - 1]} {onClick} />
{/if}
