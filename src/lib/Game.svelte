<script lang="ts">
  import FreeCell from "./FreeCell.svelte";
  import { createGame } from "./Game";
  import HomeCell from "./HomeCell.svelte";
  import Tableau from "./Tableau.svelte";

  const game = createGame();
</script>

<div class="game">
  <div class="top">
    <div class="freecells">
      {#each game.freeCells as card}
        <FreeCell {card} />
      {/each}
    </div>

    <div class="homecells">
      {#each game.homeCells as stack}
        <HomeCell {stack} />
      {/each}
    </div>
  </div>
  <Tableau tableau={game.tableau} />
</div>

<style type="scss">
  .game {
    display: flex;
    background-color: #131;
    width: 100vw;
    height: 100vh;
    flex-direction: column;

    .top {
      padding: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .freecells {
        display: flex;
        gap: 20px;
      }

      .homecells {
        display: flex;
        gap: 20px;
      }
    }
  }
</style>
