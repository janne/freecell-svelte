<script lang="ts">
  import { cardKey, type Card } from "../utils/deck";
  import { addCard, addCardInHome, createGame, moveStack, removeCardFromGame, type Game } from "../utils/game";
  import Column from "./Column.svelte";
  import Toolbar from "./Toolbar.svelte";
  import Space from "./Space.svelte";

  let undoState: Game[];
  let undoIndex: number;
  let game: Game;

  initialize(getSeed());

  function getSeed() {
    const fromPath = Number(document.location.pathname.slice(1));
    if (fromPath > 0) return fromPath;

    const fromStorage = localStorage.getItem("freecellSeed");
    if (fromStorage) return Number(fromStorage);

    return Math.floor(Math.random() * 1000000);
  }

  function initialize(seed: number) {
    window.history.pushState("", "", `/${seed}`);
    localStorage.setItem("freecellSeed", seed.toString());
    undoState = [];
    undoIndex = -1;
    game = createGame(seed);
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

  function addUndoState(skipAutoMove = false) {
    undoState = [...undoState.slice(0, undoIndex + 1), game];
    undoIndex = undoState.length - 1;
    skipAutoMove || autoMove();
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
      const skipAutoMove = game.homeCells.find((cell) => cell.find((c) => c == card)) != null;
      game = updateGame(removeCardFromGame(card, game));
      addUndoState(skipAutoMove);
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
      {#each game.freeCells as card, i (card == null ? i : cardKey(card))}
        <Space {card} {onClick} />
      {/each}
    </div>

    <div class="homecells">
      {#each game.homeCells as stack, i (stack.length > 0 ? cardKey(stack[stack.length - 1]) : i)}
        <Space card={stack.length > 0 ? stack[stack.length - 1] : null} {onClick} />
      {/each}
    </div>
  </div>
  <div class="tableau">
    {#each game.tableau as stack, i (i)}
      <Column {stack} {onClick} />
    {/each}
  </div>
</div>

<style type="scss">
  .game {
    display: flex;
    flex-direction: column;

    .top {
      padding: 4px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;

      .freecells {
        display: flex;
        gap: 1px;
      }

      .homecells {
        display: flex;
        gap: 1px;
      }
    }

    .tableau {
      display: flex;
      flex-direction: row;
    }
  }
</style>
