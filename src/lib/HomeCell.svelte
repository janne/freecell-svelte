<script lang="ts">
  import type { Card } from "./Deck";

  export let stack: Card[];
</script>

<div class={stack.length == 0 ? "empty" : "stack"} />

<style type="scss">
  div {
    display: flex;
    width: 7vw;
    height: 10vw;
  }

  .empty {
    border: 2px solid grey;
  }
</style>
