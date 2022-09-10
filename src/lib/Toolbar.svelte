<script type="ts">
  export let undoDisabled: boolean;
  export let undo: () => void;
</script>

<div class="toolbar">
  <button disabled={undoDisabled} class="undo" on:click={undo}>Undo</button>
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid black;
    padding: 10px 0;
    justify-content: end;

    button:disabled {
      cursor: auto;
    }
  }
</style>
