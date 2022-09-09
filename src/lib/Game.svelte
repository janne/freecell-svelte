<script lang="ts">
  import type { Card } from "./Deck";

  import FreeCell from "./FreeCell.svelte";
  import { createGame } from "./Game";
  import HomeCell from "./HomeCell.svelte";
  import Tableau from "./Tableau.svelte";

  let game = createGame();

  function onClick(newCard: Card) {
    game.tableau.forEach((stack, i) => {
      game.tableau[i] = stack.filter((card) => card != newCard);
    });
    const stack = Math.floor(Math.random() * 4);
    game.homeCells[stack].push(newCard);
    game = game;
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
