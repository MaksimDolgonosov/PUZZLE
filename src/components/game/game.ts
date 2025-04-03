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
    this.answerField = document.querySelector(
      ".answer__field"
    ) as HTMLDivElement;
    this.gameItems = document.querySelectorAll(
      ".game__items"
    ) as NodeListOf<HTMLDivElement>;
    this.checkBtn = document.querySelector(
      ".buttons__field__check"
    ) as HTMLButtonElement;
    this.str = "The students agree they have too match homework".split(" ");
    this.truePosition = "0px -5px 6px -5px rgba(122, 208, 20, 1) inset";
    this.falsePosition = "0px -5px 6px -5px rgba(255, 0, 0, 1) inset";
    this.resetPosition = "none";
  }

  shuffle(array: string[]) {
    const arr = array.concat([]);
    let m: number = arr.length;
    let t: string;
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
    // const str: string[] =
    //   "The students agree they have too match homework".split(" ");
    // const gameField = document.querySelector(".game__field");

    const div = document.createElement("div") as HTMLDivElement;
    const currentLine = document.querySelector(
      `[data-line="${line}"]`
    ) as HTMLDivElement;

    currentLine!.style.opacity = "1";
    currentLine!.style.color = "red";
    div.classList.add("game__item");
    const sentence = new Array(this.str.length).fill(div);

    const answer: string[] = this.str.map((item, i) => {
      return `<div class="game__item" style="background-position: -${
        96 * i
      }px ${-((line - 1) * 43)}px;">${item}</div>`;
    });
    const startPosition = this.shuffle(answer);
    startPosition.forEach((item) => {
      this.answerField!.innerHTML += item;
      // this.gameField!.innerHTML += item;
    });

    this.answerField.addEventListener("click", (e: MouseEvent) => {
      this.putOnGameField(e);
    });
    this.gameItems[this.line].addEventListener("click", (e: MouseEvent) => {
      for (let i = 0; i < this.gameItems[this.line].children.length; i++) {
        (
          this.gameItems[this.line].children[i] as HTMLDivElement
        ).style.boxShadow = this.resetPosition;
      }

      // ([...this.gameItems[this.line].children] as Array<HTMLDivElement>).forEach(element => {

      // })
      this.putOnAnswerField(e);
    });
    this.checkBtn.addEventListener("click", () => this.check(this.line));
    // console.log(this.answerField);
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
    const answerField = document.querySelector(
      ".answer__field"
    ) as HTMLDivElement;
    const gameItems = document.querySelectorAll(
      ".game__items"
    ) as NodeListOf<HTMLDivElement>;
    const errorField = document.querySelector(
      ".error__field"
    ) as HTMLDivElement;
    if (answerField.children.length > 0) {
      errorField.style.opacity = "1";
      // console.log("Please, insert all puzzles on the field!");
    } else {
      errorField.style.opacity = "0";
      const checkedArr = [...gameItems[line].children].map(
        (item) => item.textContent
      );
      // console.log(
      //   [...gameItems[line].children].map((item) => item.textContent)
      // );
      // (gameItems[line].children[2] as HTMLDivElement).style!.boxShadow =
      //   "0px -5px 6px -5px rgba(255, 0, 0, 1) inset";
      // console.log(this.str);
      Array.from(gameItems[line].children).forEach((element, i) => {
        console.log(element.textContent, this.str[i]);
        if (element.textContent === this.str[i]) {
          (gameItems[line].children[i] as HTMLDivElement).style.boxShadow =
            this.truePosition;
        } else {
          (gameItems[line].children[i] as HTMLDivElement).style.boxShadow =
            this.falsePosition;
        }
      });
      console.log(gameItems[line].children);
    }
  }

  prompt() {}
}
