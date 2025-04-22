export default function setToLS(level: number, page: number): void {
  localStorage.setItem("level", `${level}`);
  localStorage.setItem("page", `${page}`);
}
