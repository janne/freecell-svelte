<script lang="ts">
  import type { Card } from "../utils/deck";
  import FreeCell from "./FreeCell.svelte";
  import { addCard, addCardInHome, createGame, moveStack, removeCardFromGame, type Game } from "../utils/game";
  import HomeCell from "./HomeCell.svelte";
  import Tableau from "./Tableau.svelte";
  import Toolbar from "./Toolbar.svelte";

  let undoState: Game[];
  let undoIndex: number;
  let game: Game;

  initialize();

  function initialize(seed?: number) {
    undoState = [];
    undoIndex = -1;

    game = createGame(seed || Math.floor(Math.random() * 32000));
    calculateWindowWidth();
    addUndoState();
  }

  function autoMove() {
    const cardsToTest = [
      ...(game.freeCells.filter((cell) => cell != null) as Card[]),
      ...game.tableau.filter((stack) => stack.length > 0).map((stack) => stack[stack.length - 1])
    ];
    for (const card of cardsToTest) {
      const updateGame = addCardInHome(card, game);
      if (updateGame) {
        game = updateGame(removeCardFromGame(card, game));
        addUndoState();
        break;
      }
    }
  }

  function calculateWindowWidth() {
    document.documentElement.style.setProperty("--window-width", Math.min(window.innerWidth, 800) / 100 + "px");
  }

  window.onresize = calculateWindowWidth;

  function addUndoState() {
    undoState = [...undoState.slice(0, undoIndex + 1), game];
    undoIndex = undoState.length - 1;
    autoMove();
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
    seed={game.seed}
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
    flex-direction: column;

    .top {
      width: calc(var(--window-width) * 100);
      padding: 10px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .freecells {
        display: flex;
        gap: 5px;
      }

      .homecells {
        display: flex;
        gap: 5px;
      }
    }
  }
</style>
