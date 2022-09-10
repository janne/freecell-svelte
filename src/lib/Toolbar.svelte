<script type="ts">
  export let undoDisabled: boolean;
  export let undo: () => void;
  export let redoDisabled: boolean;
  export let redo: () => void;
  export let restartDisabled: boolean;
  export let restart: () => void;
  export let newGame: () => void;
</script>

<div class="toolbar">
  <span>
    <button on:click={newGame}>New game</button>
    <button disabled={restartDisabled} on:click={restart}>Restart</button>
  </span>
  <span>
    <button disabled={undoDisabled} on:click={undo}>Undo</button>
    <button disabled={redoDisabled} on:click={redo}>Redo</button>
  </span>
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    button:disabled {
      cursor: auto;
    }
  }
</style>
