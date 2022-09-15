<script lang="ts">
  import { cardKey, type Card } from "../utils/deck";

  export let card: Card;
  export let onClick: (card: Card) => void;
  export let index: number | null;
</script>

<div
  style={index == null ? "" : `position: absolute; top: calc(5vh * ${index})`}
  class={`card L${cardKey(card)}`}
  on:click|stopPropagation={() => onClick(card)}
/>

<style type="scss">
  .card {
    z-index: 1;
    display: flex;
    width: 11vw;
    height: 16vw;
    @media (min-width: 800px) {
      width: 100px;
      height: 140px;
    }

    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
