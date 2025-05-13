export function allowDrop(e: Event) {
  e.preventDefault();
}

export function dragEnter(e: Event) {
  const target = e.target as HTMLDivElement;
  if (target.classList.contains("game__items")) {
    target.style.boxShadow = "0px 6px 5px -2px rgba(17, 150, 15, 0.7)";
  } else if (target.classList.contains("game__item")) {
    target.style.boxShadow = "-6px 0px 5px -2px rgba(17, 150, 15, 0.7)";
  }
}
export function dragLeave(e: Event) {
  const target = e.target as HTMLDivElement;
  target.style.boxShadow = "none";
}

export function dragStart(e: DragEvent) {
  const target = e.target as HTMLDivElement;
  e.dataTransfer!.setData("id", target.id);
}
