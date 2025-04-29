export default function toggleActive(className: string) {
  const element = document.querySelector(`.${className}`) as HTMLImageElement;
  if (element.classList.contains("active")) {
    element.classList.remove("active");
    element.querySelector("circle")!.style.fill = "grey";
  } else {
    element.classList.add("active");
    element.querySelector("circle")!.style.fill = "#2CAB61";
  }
}
