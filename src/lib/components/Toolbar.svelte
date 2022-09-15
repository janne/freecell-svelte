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
    newGame(e.target.value);
  }
</script>

<div class="toolbar">
  <div class="buttons">
    <button on:click={() => newGame(Math.floor(Math.random() * 1000000))}>New game</button>
    <button disabled={restartDisabled} on:click={restart}>Restart</button>
  </div>
  <input class="seed" value={seed} type="number" min="1" max="1000000" on:change={handleSeedChange} />
  <div class="buttons">
    <button disabled={undoDisabled} on:click={undo}>Undo</button>
    <button disabled={redoDisabled} on:click={redo}>Redo</button>
  </div>
</div>

<style lang="scss">
  .seed {
    height: 20px;
    color: #eee;
    font-weight: bold;
    background-color: transparent;
    border: none;
    display: flex;
    align-self: center;
  }
  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4px;

    input {
      font-size: 16px;
    }
    .buttons {
      display: flex;
      flex-direction: row;
      gap: 4px;

      button {
        padding: 4px;
        min-height: 44px;
        font-size: 14px;
      }
    }

    button:disabled {
      cursor: auto;
    }
  }
</style>
