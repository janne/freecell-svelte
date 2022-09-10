<script lang="ts">
  import type { Card } from "./Deck";
  import FreeCell from "./FreeCell.svelte";
  import { addCard, createGame, moveStack, removeCardFromGame, type Game } from "./Game";
  import HomeCell from "./HomeCell.svelte";
  import Tableau from "./Tableau.svelte";
  import Toolbar from "./Toolbar.svelte";

  let undoState: Game[];
  let undoIndex: number;
  let game: Game;

  initialize();

  function initialize() {
    undoState = [];
    undoIndex = -1;
    game = createGame();
    addUndoState();
  }

  function addUndoState() {
    undoState = [...undoState.slice(0, undoIndex + 1), game];
    undoIndex = undoState.length - 1;
  }

  function restart() {
    undoIndex = 0;
    game = undoState[undoIndex];
  }

  function undo() {
    undoIndex -= 1;
    game = undoState[undoIndex];
  }

  function redo() {
    undoIndex += 1;
    game = undoState[undoIndex];
  }

  function onClick(card: Card, count = 1) {
    if (count > 1) {
      const updateGame = moveStack(card, game, count);
      if (updateGame) {
        game = updateGame(game);
        addUndoState();
      }
      return;
    }
    const updateGame = addCard(card, game);
    if (updateGame) {
      game = updateGame(removeCardFromGame(card, game));
      addUndoState();
    }
  }
</script>

<div class="game">
  <Toolbar
    {undo}
    undoDisabled={undoIndex === 0}
    {redo}
    redoDisabled={undoIndex == undoState.length - 1}
    {restart}
    restartDisabled={undoIndex === 0}
    newGame={initialize}
  />
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
      width: 70vw;
      padding: 10px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

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
