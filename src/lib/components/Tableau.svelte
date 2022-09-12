<script lang="ts">
  import Column from "./Column.svelte";

  import type { Card } from "../utils/deck";

  export let tableau: Card[][];
  export let onClick: (card: Card) => void;
</script>

<div class="tableau">
  {#each tableau as stack, column}
    <Column {stack} {onClick} {column} />
  {/each}
</div>
