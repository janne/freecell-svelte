import "./app.css";
import Game from "./lib/components/Game.svelte";

window.addEventListener("load", () => {
  registerSW();
});

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("service-worker.js");
    } catch (e) {
      console.log("Service worker registration failed");
    }
  }
}

const app = new Game({
  target: document.getElementById("app")!
});

export default app;
