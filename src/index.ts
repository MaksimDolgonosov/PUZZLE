import "./style.scss";

import App from "./components/app/app";
import Game from "./components/game/game";

new App().start();
new Game("1", "1").start(1);
// new Game("2", "1").start();
