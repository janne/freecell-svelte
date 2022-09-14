<script lang="ts">
  import { isBlack, type Card, type Suit } from "../utils/deck";

  export let card: Card;
  export let onClick: (card: Card) => void;

  function rank(rank: number): String {
    switch (rank) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
    }
    return rank.toString();
  }

  function handleClick(e: MouseEvent) {
    onClick(card);
  }
</script>

<div class={["card", isBlack(card) ? "black" : "red"].join(" ")} on:click|stopPropagation={handleClick}>
  <img
    alt={`${rank(card.rank)}${card.suit}`}
    class="img"
    src={`/images/cards/small/${rank(card.rank)}${card.suit}.svg`}
  />
</div>

<style type="scss">
  .card {
    display: flex;
    height: calc(var(--window-width) * 16);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    cursor: pointer;
    position: relative;
  }
</style>
