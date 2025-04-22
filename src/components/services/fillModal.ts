import { IStatistics, TPaintData } from "../../types/types";

export default function fillModal(statistics: IStatistics, paintData: TPaintData): void {
  const paint = document.querySelector(".game__modal_img") as HTMLImageElement;
  const name = document.querySelector(".game__modal_name") as HTMLSpanElement;
  const author = document.querySelector(".game__modal_author") as HTMLSpanElement;
  const year = document.querySelector(".game__modal_year") as HTMLSpanElement;
  const dontKnow_count = document.querySelector(".game__modal_dontKnow-count") as HTMLDivElement;
  const iKnow_count = document.querySelector(".game__modal_iKnow-count") as HTMLDivElement;
  const dontKnow_items = document.querySelector(".game__modal_dontKnow .game__modal_items") as HTMLDivElement;
  const iKnow_items = document.querySelector(".game__modal_iKnow .game__modal_items") as HTMLDivElement;

  dontKnow_items.innerHTML = ``;
  iKnow_items.innerHTML = ``;

  paint.src = paintData.src;
  name.textContent = paintData.name;
  author.textContent = paintData.author;
  year.textContent = paintData.year;

  dontKnow_count.textContent = String(statistics.IDontKnow.length);
  iKnow_count.textContent = String(statistics.IKnow.length);

  for (let i = 0; i < statistics.IDontKnow.length; i++) {
    dontKnow_items.innerHTML += `
    <div class="game__modal_item">
        <img src="./assets/images/voice.svg.svg" alt="voice" />
        <div class="game__modal_item-word">${statistics.IDontKnow[i].word}</div>
    </div>`;
  }

  for (let i = 0; i < statistics.IKnow.length; i++) {
    iKnow_items.innerHTML += `
    <div class="game__modal_item">
        <img src="./assets/images/voice.svg.svg" alt="voice" />
        <div class="game__modal_item-word">${statistics.IDontKnow[i].word}</div>
    </div>`;
  }

  const items = document.querySelectorAll(".game__modal_item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(e.target);
    });
  });
}
