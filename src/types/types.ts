export interface IImgSource {
  src: string;
  name: string;
  author: string;
  year: string;
  pages: number;
}

export interface IWordSource {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export enum Position {
  TRUE = "0px -5px 6px -5px rgba(122, 208, 20, 1) inset",
  FALSE = "0px -5px 6px -5px rgba(255, 0, 0, 1) inset",
  RESET = "none",
}

export interface IStatistics {
  IDontKnow: IStatObject[];
  IKnow: IStatObject[];
}

interface IStatObject {
  word: string;
  src: string;
}

export type TPaintData = Omit<IImgSource, "pages">;
