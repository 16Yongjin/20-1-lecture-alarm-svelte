import App from "./Main.svelte";
import "bulma/css/bulma.css";
import "animate.css/animate.css";
import "./utils/firebase";

const app = new App({
  target: document.body,
});

export default app;
