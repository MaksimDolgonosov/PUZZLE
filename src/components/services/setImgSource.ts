import level1 from "../../assets/data/wordCollectionLevel1";
import level2 from "../../assets/data/wordCollectionLevel2";
import level3 from "../../assets/data/wordCollectionLevel3";
import level4 from "../../assets/data/wordCollectionLevel4";
import level5 from "../../assets/data/wordCollectionLevel5";
import level6 from "../../assets/data/wordCollectionLevel6";

import { IImgSource } from "../../types/types";
import { IWordSource } from "../../types/types";

export default function setImgSource(level: number, page: number): IImgSource {
  switch (level) {
    case 1:
      return {
        src: `./assets/images/${level1.rounds[page - 1].levelData.cutSrc}`,
        name: level1.rounds[page - 1].levelData.name,
        author: level1.rounds[page - 1].levelData.author,
        year: level1.rounds[page - 1].levelData.year,
        pages: level1.roundsCount,
      };
    case 2:
      return {
        src: `./assets/images/${level2.rounds[page - 1].levelData.cutSrc}`,
        name: level2.rounds[page - 1].levelData.name,
        author: level2.rounds[page - 1].levelData.author,
        year: level2.rounds[page - 1].levelData.year,
        pages: level2.roundsCount,
      };
    case 3:
      return {
        src: `./assets/images/${level3.rounds[page - 1].levelData.cutSrc}`,
        name: level3.rounds[page - 1].levelData.name,
        author: level3.rounds[page - 1].levelData.author,
        year: level3.rounds[page - 1].levelData.year,
        pages: level3.roundsCount,
      };
    case 4:
      return {
        src: `./assets/images/${level4.rounds[page - 1].levelData.cutSrc}`,
        name: level4.rounds[page - 1].levelData.name,
        author: level4.rounds[page - 1].levelData.author,
        year: level4.rounds[page - 1].levelData.year,
        pages: level4.roundsCount,
      };
    case 5:
      return {
        src: `./assets/images/${level5.rounds[page - 1].levelData.cutSrc}`,
        name: level5.rounds[page - 1].levelData.name,
        author: level5.rounds[page - 1].levelData.author,
        year: level5.rounds[page - 1].levelData.year,
        pages: level5.roundsCount,
      };
    default:
      return {
        src: `./assets/images/${level6.rounds[page - 1].levelData.cutSrc}`,
        name: level6.rounds[page - 1].levelData.name,
        author: level6.rounds[page - 1].levelData.author,
        year: level6.rounds[page - 1].levelData.year,
        pages: level6.roundsCount,
      };
  }
}

export function setWordSource(level: number, page: number, line: number): IWordSource {
  switch (level) {
    case 1:
      return level1.rounds[page - 1].words[line - 1];

    case 2:
      return level2.rounds[page - 1].words[line - 1];
    case 3:
      return level3.rounds[page - 1].words[line - 1];
    case 4:
      return level4.rounds[page - 1].words[line - 1];
    case 5:
      return level5.rounds[page - 1].words[line - 1];
    default:
      return level6.rounds[page - 1].words[line - 1];
  }
}
