export default class Game {
  level: string;
  page: string;
  line: number;
  gameField: HTMLDivElement;
  gameItems: NodeListOf<HTMLDivElement>;
  answerField: HTMLDivElement;
  checkBtn: HTMLButtonElement;
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
    this.str = "The students agree they have too match homework".split(" ");
    this.truePosition = "0px -5px 6px -5px rgba(122, 208, 20, 1) inset";
    this.falsePosition = "0px -5px 6px -5px rgba(255, 0, 0, 1) inset";
    this.resetPosition = "none";
  }

  shuffle(array: HTMLDivElement[]) {
    const arr = array.concat([]);
    let m: number = arr.length;
    let t: HTMLDivElement;
    let i: number;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }
    return arr;
  }

  start(line: number) {
    let size: number = 0;
    let width: number = 0;

    const currentLine = document.querySelector(`[data-line="${line}"]`) as HTMLDivElement;
    currentLine!.style.opacity = "1";
    currentLine!.style.color = "red";

    const answer: string[] = this.str.map((item, i) => {
      return `<div class="game__item">${item}</div>`;
      // return `<div class="game__item" style="background-position: -${96 * i}px ${-((line - 1) * 43)}px;">${item}</div>`;
    });

    //const startPosition = this.shuffle(answer);
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
      itemsWithoutPaddings[i].style.padding = `0 ${(768 - size) / this.str.length / 2}px`;
    }

    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      itemsWithoutPaddings[i].style.backgroundPosition = `-${width}px ${-((line - 1) * 43)}px`;
      width += itemsWithoutPaddings[i].getBoundingClientRect().width;
    }
    const itemsWithPaddings = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    this.answerField.innerHTML = "";
    const startPosition = this.shuffle([...itemsWithPaddings]);
    this.answerField!.style.opacity = "1";
    startPosition.forEach((item) => {
      this.answerField.append(item);
    });

    this.answerField.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
      if (target.classList.contains("game__item")) {
        this.putOnGameField(e);
      }

      if (gameItems[this.line].children.length === this.str.length) {
        this.checkBtn.style.opacity = "1";
      }
    });
    this.gameItems[this.line].addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
      if (target.classList.contains("game__item")) {
        for (let i = 0; i < this.gameItems[this.line].children.length; i++) {
          (this.gameItems[this.line].children[i] as HTMLDivElement).style.boxShadow = this.resetPosition;
        }

        this.putOnAnswerField(e);
      }
      if (gameItems[this.line].children.length !== this.str.length) {
        this.checkBtn.style.opacity = "0";
      }
    });
    this.checkBtn.addEventListener("click", () => this.check(this.line));
  }

  putOnGameField(e: MouseEvent) {
    const element = e.target as HTMLDivElement;
    this.gameItems[this.line].append(element);
  }
  putOnAnswerField(e: MouseEvent) {
    const element = e.target as HTMLDivElement;
    this.answerField.append(element);
  }

  check(line: number) {
    const answerField = document.querySelector(".answer__field") as HTMLDivElement;
    const modal = document.querySelector(".game__modal_wrapper") as HTMLDivElement;
    const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
    const errorField = document.querySelector(".error__field") as HTMLDivElement;
    if (answerField.children.length > 0) {
      errorField.style.opacity = "1";
      // console.log("Please, insert all puzzles on the field!");
    } else {
      errorField.style.opacity = "0";
      const checkedArr = [...gameItems[line].children].map((item) => item.textContent);
      Array.from(gameItems[line].children).forEach((element, i) => {
        if (element.textContent === this.str[i]) {
          (gameItems[line].children[i] as HTMLDivElement).style.boxShadow = this.truePosition;
        } else {
          (gameItems[line].children[i] as HTMLDivElement).style.boxShadow = this.falsePosition;
        }
      });
      if (checkedArr.join(" ") === this.str.join(" ")) {
        modal.style.display = "flex";
      }
    }
  }

  prompt() {}
}
