import shuffle from "../services/shuffle";
export default class Game {
  level: string;
  page: string;
  line: number;
  gameField: HTMLDivElement;
  gameItems: NodeListOf<HTMLDivElement>;
  answerField: HTMLDivElement;
  checkBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  str: string[];
  truePosition: "0px -5px 6px -5px rgba(122, 208, 20, 1) inset";
  falsePosition: "0px -5px 6px -5px rgba(255, 0, 0, 1) inset";
  resetPosition: "none";
  constructor(level: string, page: string) {
    this.level = level;
    this.page = page;
    this.line = 0;
    this.gameField = document.querySelector(".game__field") as HTMLDivElement;
    this.answerField = document.querySelector(".answer__field") as HTMLDivElement;
    this.gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
    this.checkBtn = document.querySelector(".buttons__field__check") as HTMLButtonElement;
    this.nextBtn = document.querySelector(".buttons__field__next") as HTMLButtonElement;
    this.str = "The students agree".split(" ");
    this.truePosition = "0px -5px 6px -5px rgba(122, 208, 20, 1) inset";
    this.falsePosition = "0px -5px 6px -5px rgba(255, 0, 0, 1) inset";
    this.resetPosition = "none";
  }

  start(line: number, word: string) {
    const str: string[] = word.split(" ");
    let size: number = 0;
    let width: number = 0;
    console.log("line: ", line);
    const currentLine = document.querySelector(`[data-line="${line}"]`) as HTMLDivElement;
    currentLine!.style.opacity = "1";
    currentLine!.style.color = "red";
    if (line > 1) {
      const previousLine = document.querySelector(`[data-line="${line - 1}"]`) as HTMLDivElement;
      previousLine!.style.color = "black";
    }
    const answer: string[] = str.map((item, i) => {
      return `<div class="game__item">${item}</div>`;
    });

    this.answerField!.style.opacity = "0";
    answer.forEach((item) => {
      this.answerField!.innerHTML += item;
    });

    const answerField = document.querySelector(".answer__field") as HTMLDivElement;

    const itemsWithoutPaddings = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      size += itemsWithoutPaddings[i].getBoundingClientRect().width;
      itemsWithoutPaddings[i];
    }
    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      itemsWithoutPaddings[i].style.padding = `0 ${(768 - size) / str.length / 2}px`;
    }

    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      itemsWithoutPaddings[i].style.backgroundPosition = `-${width}px ${-((line - 1) * 43)}px`;
      width += itemsWithoutPaddings[i].getBoundingClientRect().width;
    }
    const itemsWithPaddings = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    this.answerField.innerHTML = "";
    const startPosition = shuffle([...itemsWithPaddings]);
    this.answerField!.style.opacity = "1";
    startPosition.forEach((item) => {
      this.answerField.append(item);
    });

    this.answerField.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
      if (target.classList.contains("game__item")) {
        this.putOnGameField(e, line);
      }

      if (gameItems[line - 1].children.length === str.length) {
        this.checkBtn.style.display = "block";
      }
    });
    this.gameItems[line - 1].addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
      if (target.classList.contains("game__item")) {
        for (let i = 0; i < this.gameItems[line - 1].children.length; i++) {
          (this.gameItems[line - 1].children[i] as HTMLDivElement).style.boxShadow = this.resetPosition;
        }

        this.putOnAnswerField(e);
      }
      if (gameItems[line - 1].children.length !== str.length) {
        this.checkBtn.style.display = "none";
      }
    });
  }

  putOnGameField(e: MouseEvent, line: number) {
    const element = e.target as HTMLDivElement;
    this.gameItems[line - 1].append(element);
  }
  putOnAnswerField(e: MouseEvent) {
    const element = e.target as HTMLDivElement;
    this.answerField.append(element);
  }

  check(line: number, word: string) {
    const str: string[] = word.split(" ");
    const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;

    Array.from(gameItems[line].children).forEach((element, i) => {
      if (element.textContent === str[i]) {
        (gameItems[line].children[i] as HTMLDivElement).style.boxShadow = this.truePosition;
      } else {
        (gameItems[line].children[i] as HTMLDivElement).style.boxShadow = this.falsePosition;
      }
    });
    const checkedArr = [...gameItems[line].children].map((item) => item.textContent);
    if (checkedArr.join(" ") === str.join(" ")) {
      console.log("Word true");
      this.checkBtn.style.display = "none";
      this.nextBtn.style.display = "block";
    }
  }

  prompt() {}
}
