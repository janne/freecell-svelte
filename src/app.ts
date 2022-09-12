import "./app.css";
import Game from "./lib/components/Game.svelte";

const app = new Game({
  target: document.getElementById("app")!
});

export default app;
