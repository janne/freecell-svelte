<script type="ts">
  export let undoDisabled: boolean;
  export let undo: () => void;
  export let redoDisabled: boolean;
  export let redo: () => void;
  export let restartDisabled: boolean;
  export let restart: () => void;
  export let newGame: (seed: number) => void;
  export let seed: number;

  function handleSeedChange(e: any) {
    newGame(e.target.value)
  }
</script>

<div class="toolbar">
  <span>
    <button on:click={() => newGame(Math.floor(Math.random() * 32000))}>New game</button>
    <button disabled={restartDisabled} on:click={restart}>Restart</button>
  </span>
  <input class="seed" value={seed} type="number" min="1" max="32000" on:change={handleSeedChange} />
  <span>
    <button disabled={undoDisabled} on:click={undo}>Undo</button>
    <button disabled={redoDisabled} on:click={redo}>Redo</button>
  </span>
</div>

<style lang="scss">
  .seed {
    height: 20px;
    color: #eee;
    font-size: calc(var(--window-width) * 2);
    font-weight: bold;
    background-color: transparent;
    border: none;
    display: flex;
    align-self: center;
  }
  .toolbar {
    display: flex;
    flex-direction: row;
    width: calc(var(--window-width) * 100);
    justify-content: space-between;
    font-size: calc(var(--window-width) * 2);
    margin-top: 4px;

    button:disabled {
      cursor: auto;
    }
  }
</style>
