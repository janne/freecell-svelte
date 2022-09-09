<script lang="ts">
  import Column from "./Column.svelte";

  import type { Card } from "./Deck";

  export let tableau: Card[][];
  export let onClick: (card: Card) => void;
</script>

<div class="tableau">
  {#each tableau as stack}
    <Column {stack} {onClick} />
  {/each}
</div>

<style type="scss">
  .tableau {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
