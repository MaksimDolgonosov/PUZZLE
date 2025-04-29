import "./style.scss";
import { IImgSource } from "./types/types";
import { IWordSource } from "./types/types";
import { Position } from "./types/types";
import { IStatistics } from "./types/types";

import setImgSource from "./components/services/setImgSource";
import { setWordSource } from "./components/services/setImgSource";
import remBoxShadow from "./components/services/remBoxShadow";
import setToLS from "./components/services/setToLS";
import fillModal from "./components/services/fillModal";
import clearItems from "./components/services/clearItems";
import toggleActive from "./components/services/toggleActive";
import addPagesToSelect from "./components/services/addPagesToSelect";
import shuffle from "./components/services/shuffle";

document.addEventListener("DOMContentLoaded", () => {
  let IS_I_KNOW_FLAG: boolean = true;

  let line: number = 1;
  let level: number = localStorage.getItem("level") ? Number(localStorage.getItem("level")) : 1;
  let page: number = localStorage.getItem("page") ? Number(localStorage.getItem("page")) : 1;
  let imgSrc: IImgSource = setImgSource(level, page);

  let statistics: IStatistics = {
    IDontKnow: [],
    IKnow: [],
  };

  addPagesToSelect(imgSrc.pages);
  let wordSrc: IWordSource = setWordSource(level, page, line);
  let word: string = wordSrc.textExample;

  const gameField = document.querySelector(".game__field") as HTMLDivElement;
  const answerField = document.querySelector(".answer__field") as HTMLDivElement;
  const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
  const nextBtn = document.querySelector(".buttons__field__next") as HTMLButtonElement;
  const checkBtn = document.querySelector(".buttons__field__check") as HTMLButtonElement;
  const startBtn = document.querySelector(".startPage__btn") as HTMLButtonElement;
  const startPage = document.querySelector(".startPage") as HTMLDivElement;
  const submitBtn = document.querySelector("#submitLogin") as HTMLButtonElement;
  const loginPage = document.querySelector(".loginPage") as HTMLDivElement;
  const gamePage = document.querySelector(".gamePage") as HTMLDivElement;
  const modal = document.querySelector(".game__modal_wrapper") as HTMLDivElement;
  const greeting = document.querySelector(".gamePage__greeting") as HTMLDivElement;
  const levelSelect = document.querySelector(".gamePage__options_level-select") as HTMLSelectElement;
  const pageSelect = document.querySelector(".gamePage__options_page-select") as HTMLSelectElement;
  const dontKnowBtn = document.querySelector(".buttons__field__dontKnow") as HTMLButtonElement;
  const continueBtn = document.querySelectorAll(".buttons__field__continue") as NodeListOf<HTMLButtonElement>;
  const statisticsBtn = document.querySelector(".buttons__field__statistics") as HTMLButtonElement;
  const descriptionField = document.querySelector(".description__field") as HTMLDivElement;
  const audio = document.querySelector("#audio") as HTMLAudioElement;
  const soundHint = document.querySelector(".gamePage__options_hints-sound") as HTMLImageElement;
  const backgroundHint = document.querySelector(".gamePage__options_hints-background") as HTMLImageElement;
  const translateHint = document.querySelector(".gamePage__options_hints-translate") as HTMLImageElement;
  const sound = document.querySelector(".hints__container_sound") as HTMLImageElement;
  const translation = document.querySelector(".hints__container_translation") as HTMLDivElement;

  translation.textContent = wordSrc.textExampleTranslate;
  sound.addEventListener("click", () => {
    audio.src = `./assets/${wordSrc.audioExample}`;
    let duration: number;
    audio.onloadedmetadata = function () {
      duration = audio.duration;
      sound.src = "./assets/icons/hints/audio-wave2.gif";
      sound.style.width = "50px";

      setTimeout(() => {
        sound.src = "./assets/icons/hints/volume.svg";
        sound.style.width = "30px";
      }, audio.duration * 1000);
    };

    audio.play();
  });

  soundHint.addEventListener("click", () => {
    // toggleActive("gamePage__options_hints-sound");
    if (soundHint.classList.contains("active")) {
      soundHint.classList.remove("active");
      soundHint.querySelector("circle")!.style.fill = "grey";
      sound.style.display = "none";
    } else {
      sound.style.display = "block";
      soundHint.classList.add("active");
      soundHint.querySelector("circle")!.style.fill = "#2CAB61";
    }
  });
  backgroundHint.addEventListener("click", () => {
    toggleActive("gamePage__options_hints-background");
  });

  translateHint.addEventListener("click", () => {
    if (translateHint.classList.contains("active")) {
      translateHint.classList.remove("active");
      translateHint.querySelector("circle")!.style.fill = "grey";
      translation.style.display = "none";
    } else {
      translation.style.display = "block";
      translateHint.classList.add("active");
      translateHint.querySelector("circle")!.style.fill = "#2CAB61";
      translation.textContent = wordSrc.textExampleTranslate;
    }
  });

  levelSelect.value = `${level}`;
  pageSelect.value = `${page}`;

  levelSelect.addEventListener("change", (e) => {
    const selectNum = e.target as HTMLSelectElement;
    level = +selectNum.value;
    page = 1;
    line = 1;
    imgSrc = setImgSource(level, page);
    addPagesToSelect(imgSrc.pages);
    word = setWordSource(level, page, line).textExample;
    answerField.innerHTML = ``;
    gameItems.forEach((item) => (item.innerHTML = ``));
    setToLS(level, page);
    start(line, word, true);
  });
  pageSelect.addEventListener("change", (e) => {
    const selectNum = e.target as HTMLSelectElement;
    page = +selectNum.value;
    line = 1;
    imgSrc = setImgSource(level, page);
    word = setWordSource(level, page, line).textExample;
    answerField.innerHTML = ``;
    gameItems.forEach((item) => (item.innerHTML = ``));
    setToLS(level, page);
    start(line, word, true);
  });
  dontKnowBtn.addEventListener("click", () => {
    answerField.innerHTML = "";
    gameItems[line - 1].innerHTML = "";
    IS_I_KNOW_FLAG = false;
    start(line, word, false);

    [...answerField.children].forEach((child) => {
      gameItems[line - 1].append(child);
    });
    checkBtn.click();
    statistics.IDontKnow.push({ word, src: wordSrc.audioExample });
    IS_I_KNOW_FLAG = true;
  });

  if (localStorage.getItem("firstname") && localStorage.getItem("lastname")) {
    gamePage.style.display = "flex";
    startPage.style.display = "none";
    greeting.textContent = `Welcome, ${localStorage.getItem("firstname")} ${localStorage.getItem("lastname")}!`;
    start(line, word, true);
  } else {
    startPage.style.display = "flex";
  }

  startBtn.addEventListener("click", () => {
    startPage.style.display = "none";
    loginPage.style.display = "flex";
  });

  submitBtn.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    const firstname = document.querySelector("#firstname") as HTMLInputElement;
    const lastname = document.querySelector("#lastname") as HTMLInputElement;
    const errorMsg = document.querySelector(".loginPage__errorMsg") as HTMLDivElement;
    if (firstname.value && lastname.value) {
      localStorage.setItem("firstname", firstname.value);
      localStorage.setItem("lastname", lastname.value);
      loginPage.style.display = "none";
      gamePage.style.display = "flex";
      greeting.textContent = `Welcome, ${localStorage.getItem("firstname")} ${localStorage.getItem("lastname")}!`;
      start(line, word, true);
    } else {
      errorMsg.style.color = "#ff0000";
    }
  });

  nextBtn.addEventListener("click", () => {
    remBoxShadow();
    if (line < 10) {
      line += 1;
      word = setWordSource(level, page, line).textExample;
      start(line, word, true);
      nextBtn.style.display = "none";
    } else {
      continueBtn[0].style.display = "block";
      dontKnowBtn.style.display = "none";
      nextBtn.style.display = "none";
      statisticsBtn.style.display = "block";
      clearItems();
      gameField.style.backgroundImage = `url('${imgSrc.src}')`;
      descriptionField.textContent = `${imgSrc.name} - ${imgSrc.author} (${imgSrc.year})`;
      descriptionField.style.opacity = "1";
      // modal.style.display = "flex";
      // fillModal(statistics, { name, author, year, src });
    }
  });
  continueBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (page === imgSrc.pages) {
        if (level === 6) {
          console.log("It's last level and page on the game!");
          return;
        } else {
          level += 1;
          page = 1;
        }
      } else {
        page += 1;
      }
      line = 1;
      levelSelect.value = `${level}`;
      pageSelect.value = `${page}`;
      setToLS(level, page);
      gameField.style.backgroundImage = `none`;
      modal.style.display = `none`;
      statisticsBtn.style.display = "none";
      continueBtn[0].style.display = "none";
      dontKnowBtn.style.display = "block";
      descriptionField.style.opacity = "0";
      imgSrc = setImgSource(level, page);
      wordSrc = setWordSource(level, page, line);
      word = wordSrc.textExample;
      statistics = {
        IDontKnow: [],
        IKnow: [],
      };
      start(line, word, true);
    });
  });

  statisticsBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    fillModal(statistics, { name: imgSrc.name, author: imgSrc.author, year: imgSrc.year, src: imgSrc.src });
  });

  checkBtn.addEventListener("click", () => {
    check(line - 1, word);
  });

  function start(line: number, word: string, isShuffle: boolean) {
    wordSrc = setWordSource(level, page, line);
    translation.textContent = wordSrc.textExampleTranslate;
    const answerField = document.querySelector(".answer__field") as HTMLDivElement;
    const str: string[] = word.split(" ");
    let size: number = 0;
    let width: number = 0;
    const currentLine = document.querySelector(`[data-line="${line}"]`) as HTMLDivElement;
    currentLine!.style.opacity = "1";
    currentLine!.style.color = "red";
    if (line > 1) {
      const previousLine = document.querySelector(`[data-line="${line - 1}"]`) as HTMLDivElement;
      previousLine!.style.color = "black";
    }
    const answer: string[] = str.map((item, i) => {
      return `<div class="game__item" style="background-image: url('${imgSrc.src}');">${item}</div>`;
    });
    //background-size: ${ 100 * str.length}% 1000%
    answerField!.style.opacity = "0";
    answer.forEach((item) => {
      answerField!.innerHTML += item;
    });

    const itemsWithoutPaddings = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      size += itemsWithoutPaddings[i].getBoundingClientRect().width;
      itemsWithoutPaddings[i];
    }
    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      itemsWithoutPaddings[i].style.padding = `0 ${(768 - size) / str.length / 2}px`;
    }

    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      itemsWithoutPaddings[i].style.backgroundPosition = `-${width}px ${-((line - 1) * 43)}px`;
      width += itemsWithoutPaddings[i].getBoundingClientRect().width;
    }
    const itemsWithPaddings = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    answerField.innerHTML = "";
    const startPosition = isShuffle === true ? shuffle([...itemsWithPaddings]) : [...itemsWithPaddings];
    answerField!.style.opacity = "1";
    startPosition.forEach((item) => {
      answerField.append(item);
    });

    answerField.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
      if (target.classList.contains("game__item")) {
        putOnGameField(e, line);
      }

      if (gameItems[line - 1].children.length === str.length) {
        checkBtn.style.display = "block";
      }
    });
    gameItems[line - 1].addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
      if (target.classList.contains("game__item")) {
        for (let i = 0; i < gameItems[line - 1].children.length; i++) {
          (gameItems[line - 1].children[i] as HTMLDivElement).style.boxShadow = Position.RESET;
        }

        putOnAnswerField(e);
      }
      if (gameItems[line - 1].children.length !== str.length) {
        checkBtn.style.display = "none";
      }
    });
  }

  function putOnGameField(e: MouseEvent, line: number) {
    const element = e.target as HTMLDivElement;
    gameItems[line - 1].append(element);
  }
  function putOnAnswerField(e: MouseEvent) {
    const element = e.target as HTMLDivElement;
    answerField.append(element);
  }

  function check(line: number, word: string) {
    const str: string[] = word.split(" ");
    const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;

    Array.from(gameItems[line].children).forEach((element, i) => {
      if (element.textContent === str[i]) {
        (gameItems[line].children[i] as HTMLDivElement).style.boxShadow = Position.TRUE;
      } else {
        (gameItems[line].children[i] as HTMLDivElement).style.boxShadow = Position.FALSE;
      }
    });
    const checkedArr = [...gameItems[line].children].map((item) => item.textContent);
    if (checkedArr.join(" ") === str.join(" ")) {
      if (IS_I_KNOW_FLAG) {
        statistics.IKnow.push({ word, src: imgSrc.src });
      }
      checkBtn.style.display = "none";
      nextBtn.style.display = "block";
    }
  }
});
