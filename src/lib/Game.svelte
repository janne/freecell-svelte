<script lang="ts">
  import type { Card } from "./Deck";
  import FreeCell from "./FreeCell.svelte";
  import { addCardInHome, createGame, removeCardFromGame } from "./Game";
  import HomeCell from "./HomeCell.svelte";
  import Tableau from "./Tableau.svelte";

  let game = createGame();

  function onClick(card: Card) {
    const updateGame = addCardInHome(card, game);
    if (updateGame) {
      game = updateGame(removeCardFromGame(card, game));
    }
  }
</script>

<div class="game">
  <div class="top">
    <div class="freecells">
      {#each game.freeCells as card}
        <FreeCell {card} {onClick} />
      {/each}
    </div>

    <div class="homecells">
      {#each game.homeCells as stack}
        <HomeCell {stack} {onClick} />
      {/each}
    </div>
  </div>
  <Tableau tableau={game.tableau} {onClick} />
</div>

<style type="scss">
  .game {
    display: flex;
    max-width: 1280px;
    height: 100vh;
    flex-direction: column;

    .top {
      padding: 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 40px;

      .freecells {
        display: flex;
        gap: 10px;
      }

      .homecells {
        display: flex;
        gap: 10px;
      }
    }
  }
</style>
