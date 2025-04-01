export default class Game {
  level: string;
  page: string;
  constructor(level: string, page: string) {
    this.level = level;
    this.page = page;
  }

  shuffle(array: string[]) {
    const arr = [];
    let m: number = array.length;
    let t: string;
    let i: number;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = array[m];
      arr[m] = array[i];
      arr[i] = t;
    }

    return arr;
  }

  start() {
    const str: string[] =
      "The students agree they have too match homework".split(" ");
    const gameField = document.querySelector(".game__field");
    const div = document.createElement("div") as HTMLDivElement;
    // div.textContent = "Fedsdf";
    div.classList.add("game__item");
    const sentence = new Array(str.length).fill(div);

    // for (let i = 0; i < sentence.length; i++) {
    //   console.log("append");
    //   div.style.width = "96px";
    //   div.style.height = "60px";
    //   gameField?.append(div);
    // }

    const answer: string[] = str.map((item, i) => {
      return `<div class="game__item" style="background-position: -${
        96 * i
      }px ${-(+this.level - 1) * 60}px;">${item}</div>`;

      // gameField?.append(item);
      // item.style.width = "96px";
      // item.style.height = "60px";
    });
    const startPosition = this.shuffle(answer);
    console.log(answer);
    answer.forEach((item) => {
      gameField!.innerHTML += item;
    });
    // console.log(this.shuffle(answer));
  }
}
