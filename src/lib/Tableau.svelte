<script lang="ts">
  import Column from "./Column.svelte";

  import type { Card } from "./Deck";

  export let tableau: Card[][];
</script>

<div class="tableau">
  {#each tableau as stack}
    <Column {stack} />
  {/each}
</div>

<style type="scss">
  .tableau {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
