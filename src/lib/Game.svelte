<script lang="ts">
  import type { Card } from "./Deck";
  import FreeCell from "./FreeCell.svelte";
  import { addCard, createGame, moveStack, removeCardFromGame, type Game } from "./Game";
  import HomeCell from "./HomeCell.svelte";
  import Tableau from "./Tableau.svelte";
  import Toolbar from "./Toolbar.svelte";

  let game = createGame();
  let undoState: Game[] = [];

  function onClick(card: Card, count = 1) {
    if (count > 1) {
      const updateGame = moveStack(card, structuredClone(game), count);
      if (updateGame) {
        undoState = [...undoState, structuredClone(game)];
        game = updateGame(game);
      }
      return;
    }
    const updateGame = addCard(card, structuredClone(game));
    if (updateGame) {
      undoState = [...undoState, structuredClone(game)];
      game = updateGame(removeCardFromGame(card, game));
    }
  }

  function undo() {
    if (undoState.length > 0) {
      game = undoState.pop()!;
      undoState = undoState;
    }
  }
</script>

<div class="game">
  <Toolbar {undo} undoDisabled={undoState.length == 0} />
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
