export default function addPagesToSelect(level: number) {
  const pageSelect = document.querySelector(".gamePage__options_page-select") as HTMLSelectElement;
  pageSelect.innerHTML = ``;
  for (let i = 1; i <= level; i++) {
    pageSelect.innerHTML += `<option value="${i}">${i}</option>`;
  }
}
