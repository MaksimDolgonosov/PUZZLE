export default function shuffle(array: HTMLDivElement[]) {
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
