export default function clearItems() {
  const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
  const countItems = document.querySelectorAll(".count__item") as NodeListOf<HTMLDivElement>;
  gameItems.forEach((item) => {
    item.innerHTML = ``;
  });
  countItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.color = "black";
  });
}
