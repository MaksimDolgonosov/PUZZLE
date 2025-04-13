import "./style.scss";

import remBoxShadow from "./components/services/remBoxShadow";
import App from "./components/app/app";
import Game from "./components/game/game";

const nextBtn = document.querySelector(".buttons__field__next") as HTMLButtonElement;
const checkBtn = document.querySelector(".buttons__field__check") as HTMLButtonElement;
new App().start();
let line: number = 1;

const game = new Game("1", "1");
game.start(line);

nextBtn.addEventListener("click", () => {
  console.log("Push button pressed");
  remBoxShadow();
  if (line < 10) {
    line += 1;
    game.start(line);
    nextBtn.style.display = "none";
  }
});

checkBtn.addEventListener("click", () => {
  game.check(line - 1);
});

// new Game("1", "1").start(2);
// new Game("1", "1").start(3);
// new Game("1", "1").start(4);
// new Game("1", "1").start(5);
// new Game("1", "1").start(6);
