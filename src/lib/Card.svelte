<script lang="ts">
  import type { Card } from "./Deck";

  export let card: Card;
</script>

<div class="card">
  {card.rank}
  {card.suit}
</div>

<style type="scss">
  div {
    display: flex;
    width: 7vw;
    height: 10vw;
  }

  .card {
    border: 2px solid grey;
  }
</style>
