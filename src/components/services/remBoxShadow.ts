export default function remBoxShadow() {
  const items = document.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
  for (let i = 0; i < items.length; i++) {
    items[i].style.boxShadow = "none";
  }
}
