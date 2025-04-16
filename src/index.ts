import "./style.scss";
import level1 from "./assets/data/wordCollectionLevel1";
import remBoxShadow from "./components/services/remBoxShadow";
// import App from "./components/app/app";
import Game from "./components/game/game";
console.log(level1.roundsCount);

let line: number = 1;
let level: number = localStorage.getItem("level") ? Number(localStorage.getItem("level")) : 1;
let page: number = localStorage.getItem("page") ? Number(localStorage.getItem("page")) : 1;
const game = new Game("1", "1");

const word: string = level1.rounds[page - 1].words[line - 1].textExample;
console.log(level1.rounds[page - 1].words[line - 1].textExample);

const nextBtn = document.querySelector(".buttons__field__next") as HTMLButtonElement;
const checkBtn = document.querySelector(".buttons__field__check") as HTMLButtonElement;
const startBtn = document.querySelector(".startPage__btn") as HTMLButtonElement;
const startPage = document.querySelector(".startPage") as HTMLDivElement;
const submitBtn = document.querySelector("#submitLogin") as HTMLButtonElement;
const loginPage = document.querySelector(".loginPage") as HTMLDivElement;
const gamePage = document.querySelector(".gamePage") as HTMLDivElement;
const greeting = document.querySelector(".gamePage__greeting") as HTMLDivElement;

if (localStorage.getItem("firstname") && localStorage.getItem("lastname")) {
  gamePage.style.display = "flex";
  startPage.style.display = "none";
  greeting.textContent = `Welcome, ${localStorage.getItem("firstname")} ${localStorage.getItem("lastname")}!`;
  game.start(line, word);
} else {
  startPage.style.display = "flex";
}

startBtn.addEventListener("click", () => {
  startPage.style.display = "none";
  loginPage.style.display = "flex";
});

submitBtn.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  const firstname = document.querySelector("#firstname") as HTMLInputElement;
  const lastname = document.querySelector("#lastname") as HTMLInputElement;
  const errorMsg = document.querySelector(".loginPage__errorMsg") as HTMLDivElement;
  if (firstname.value && lastname.value) {
    localStorage.setItem("firstname", firstname.value);
    localStorage.setItem("lastname", lastname.value);
    loginPage.style.display = "none";
    gamePage.style.display = "flex";
    greeting.textContent = `Welcome, ${localStorage.getItem("firstname")} ${localStorage.getItem("lastname")}!`;
    game.start(line, word);
    // window.location.href = "game.html";
  } else {
    errorMsg.style.color = "#ff0000";
  }
});

nextBtn.addEventListener("click", () => {
  remBoxShadow();
  if (line < 10) {
    line += 1;
    game.start(line, word);
    nextBtn.style.display = "none";
  }
});

checkBtn.addEventListener("click", () => {
  game.check(line - 1, word);
});

// new Game("1", "1").start(2);
// new Game("1", "1").start(3);
// new Game("1", "1").start(4);
// new Game("1", "1").start(5);
// new Game("1", "1").start(6);
