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
import convertStrInBool from "./components/services/convertStrInBool";
import validation from "./components/services/validations";
import { allowDrop } from "./components/services/dragAndDrope";
import { dragEnter } from "./components/services/dragAndDrope";
import { dragLeave } from "./components/services/dragAndDrope";
import { dragStart } from "./components/services/dragAndDrope";

document.addEventListener("DOMContentLoaded", () => {
  let IS_I_KNOW_FLAG: boolean = true;
  let BACKGROUND_HINT: boolean = localStorage.getItem("background-hint")
    ? convertStrInBool(localStorage.getItem("background-hint")!)
    : true;
  let SOUND_HINT: boolean = localStorage.getItem("sound-hint")
    ? convertStrInBool(localStorage.getItem("sound-hint")!)
    : true;
  let TRANSLATE_HINT: boolean = localStorage.getItem("translate-hint")
    ? convertStrInBool(localStorage.getItem("translate-hint")!)
    : true;
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
  const logOutBtn = document.querySelector("#logOut") as HTMLButtonElement;
  const firstnameInput = document.querySelector("#firstname") as HTMLInputElement;
  const lastnameInput = document.querySelector("#lastname") as HTMLInputElement;
  const errorFirstname = document.querySelector(".loginPage__errorMsg_firstname") as HTMLDivElement;
  const errorLastname = document.querySelector(".loginPage__errorMsg_lastname") as HTMLDivElement;

  gameItems.forEach((item) => {
    item.addEventListener("dragover", allowDrop);
  });
  answerField.addEventListener("dragover", allowDrop);

  logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("sound-hint");
    localStorage.removeItem("translate-hint");
    localStorage.removeItem("background-hint");
    localStorage.removeItem("page");
    localStorage.removeItem("level");
    gamePage.style.display = "none";
    startPage.style.display = " flex";
  });

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

  if (SOUND_HINT) {
    sound.style.display = "block";
    soundHint.classList.add("active");
    soundHint.querySelector("circle")!.style.fill = "#2CAB61";
  } else {
    soundHint.classList.remove("active");
    soundHint.querySelector("circle")!.style.fill = "grey";
    sound.style.display = "none";
  }

  if (BACKGROUND_HINT === true) {
    const itemsOnAnswerField = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    const itemsOnGameField = gameItems[line - 1].querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    backgroundHint.classList.add("active");
    backgroundHint.querySelector("circle")!.style.fill = "#2CAB61";
    itemsOnAnswerField.forEach((item: HTMLDivElement) => {
      item.style.backgroundImage = `url('${imgSrc.src}')`;
      (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `url('${imgSrc.src}')`;
    });
    itemsOnGameField.forEach((item: HTMLDivElement) => {
      item.style.backgroundImage = `url('${imgSrc.src}')`;
      (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `url('${imgSrc.src}')`;
    });
  } else {
    const itemsOnAnswerField = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    const itemsOnGameField = gameItems[line - 1].querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    backgroundHint.classList.remove("active");
    backgroundHint.querySelector("circle")!.style.fill = "grey";
    itemsOnAnswerField.forEach((item: HTMLDivElement) => {
      item.style.backgroundImage = "none";
      (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `none`;
    });
    itemsOnGameField.forEach((item: HTMLDivElement) => {
      item.style.backgroundImage = "none";
      (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `none`;
    });
  }

  if (TRANSLATE_HINT) {
    translation.style.display = "block";
    translateHint.classList.add("active");
    translateHint.querySelector("circle")!.style.fill = "#2CAB61";
    translation.textContent = wordSrc.textExampleTranslate;
  } else {
    translateHint.classList.remove("active");
    translateHint.querySelector("circle")!.style.fill = "grey";
    translation.style.display = "none";
  }

  soundHint.addEventListener("click", () => {
    if (soundHint.classList.contains("active")) {
      soundHint.classList.remove("active");
      soundHint.querySelector("circle")!.style.fill = "grey";
      sound.style.display = "none";
      SOUND_HINT = false;
      localStorage.setItem("sound-hint", "false");
    } else {
      sound.style.display = "block";
      soundHint.classList.add("active");
      soundHint.querySelector("circle")!.style.fill = "#2CAB61";
      SOUND_HINT = true;
      localStorage.setItem("sound-hint", "true");
    }
  });
  backgroundHint.addEventListener("click", () => {
    // toggleActive("gamePage__options_hints-background");
    const itemsOnAnswerField = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    const itemsOnGameField = gameItems[line - 1].querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    if (backgroundHint.classList.contains("active")) {
      backgroundHint.classList.remove("active");
      backgroundHint.querySelector("circle")!.style.fill = "grey";
      itemsOnAnswerField.forEach((item: HTMLDivElement) => {
        item.style.backgroundImage = "none";
        (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `none`;
      });
      itemsOnGameField.forEach((item: HTMLDivElement) => {
        item.style.backgroundImage = "none";
        (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `none`;
      });
      BACKGROUND_HINT = false;
      localStorage.setItem("background-hint", "false");
    } else {
      backgroundHint.classList.add("active");
      backgroundHint.querySelector("circle")!.style.fill = "#2CAB61";
      itemsOnAnswerField.forEach((item: HTMLDivElement) => {
        item.style.backgroundImage = `url('${imgSrc.src}')`;
        (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `url('${imgSrc.src}')`;
      });
      itemsOnGameField.forEach((item: HTMLDivElement) => {
        item.style.backgroundImage = `url('${imgSrc.src}')`;
        (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `url('${imgSrc.src}')`;
      });
      BACKGROUND_HINT = true;
      localStorage.setItem("background-hint", "true");
    }
  });

  translateHint.addEventListener("click", () => {
    if (translateHint.classList.contains("active")) {
      translateHint.classList.remove("active");
      translateHint.querySelector("circle")!.style.fill = "grey";
      translation.style.display = "none";
      TRANSLATE_HINT = false;
      localStorage.setItem("translate-hint", "false");
    } else {
      translation.style.display = "block";
      translateHint.classList.add("active");
      translateHint.querySelector("circle")!.style.fill = "#2CAB61";
      translation.textContent = wordSrc.textExampleTranslate;
      TRANSLATE_HINT = true;
      localStorage.setItem("translate-hint", "true");
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
    // line += 1;
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

  firstnameInput.addEventListener("input", (e) => validation(e, 3, "firstname"));
  lastnameInput.addEventListener("input", (e) => validation(e, 4, "lastname"));

  submitBtn.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    const firstname = document.querySelector("#firstname") as HTMLInputElement;
    const lastname = document.querySelector("#lastname") as HTMLInputElement;
    const errorMsg = document.querySelector(".loginPage__errorMsg") as HTMLDivElement;
    if (firstname.value && lastname.value) {
      localStorage.setItem("firstname", firstname.value);
      localStorage.setItem("lastname", lastname.value);
      firstname.value = "";
      lastname.value = "";
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
      // gameItems[line - 1].removeEventListener("click", gameFieldListener);
      gameItems[line - 1].style.overflow = "hidden";
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
      // gameItems.forEach((item) => {
      //   item.removeEventListener("click", gameFieldListener);
      // });
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
      gameItems.forEach((item) => {
        item.style.overflow = "visible";
      });
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
    answerField.innerHTML = "";
    gameItems.forEach((item) => {
      item.removeEventListener("click", gameFieldListener);
      item.removeEventListener("drop", drop);
      item.removeEventListener("dragenter", dragEnter);
      item.removeEventListener("dragleave", dragLeave);
      item.removeEventListener("dragstart", dragStart);
    });
    const str: string[] = word.split(" ");
    let size: number = 0;
    let width: number = 0;
    let afterElements: number = 0;
    const currentLine = document.querySelector(`[data-line="${line}"]`) as HTMLDivElement;
    currentLine!.style.opacity = "1";
    currentLine!.style.color = "red";
    if (line > 1) {
      const previousLine = document.querySelector(`[data-line="${line - 1}"]`) as HTMLDivElement;
      previousLine!.style.color = "black";
    }
    const answer: string[] = str.map((item, i) => {
      if (BACKGROUND_HINT) {
        return `<div class="game__item" id="${line}-${i}" style="background-image: url('${imgSrc.src}');" draggable="true"><div class="game__item-after" style="background-image: url('${imgSrc.src}');"></div>${item}</div>`;
      }
      return `<div class="game__item" id="${line}-${i}" style="background-image: none');" draggable="true"><div class="game__item-after"></div>${item}</div>`;
    });

    answerField!.style.opacity = "0";
    answer.forEach((item) => {
      answerField!.innerHTML += item;
    });

    const itemsWithoutPaddings = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      size += itemsWithoutPaddings[i].getBoundingClientRect().width;
      // itemsWithoutPaddings[i];
    }
    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      itemsWithoutPaddings[i].style.padding = `0 ${(768 - size) / str.length / 2}px`;
    }

    for (let i = 0; i < itemsWithoutPaddings.length; i++) {
      itemsWithoutPaddings[i].style.backgroundPosition = `-${width}px ${-((line - 1) * 43)}px`;
      width += itemsWithoutPaddings[i].getBoundingClientRect().width;
    }
    const itemsWithPaddings = answerField.querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;

    for (let i = 0; i < itemsWithPaddings.length; i++) {
      const afterElement = itemsWithPaddings[i].querySelector(".game__item-after") as HTMLDivElement;
      afterElements += itemsWithPaddings[i].getBoundingClientRect().width;
      afterElement.style.backgroundPosition = `-${afterElements}px ${-((line - 1) * 43) - 14}px`;
    }

    answerField.innerHTML = "";

    const startPosition = isShuffle === true ? shuffle([...itemsWithPaddings]) : [...itemsWithPaddings];
    answerField!.style.opacity = "1";
    startPosition.forEach((item) => {
      answerField.append(item);
    });
    gameItems[line - 1].addEventListener("click", gameFieldListener);
    gameItems[line - 1].addEventListener("drop", drop);
    gameItems[line - 1].addEventListener("dragenter", dragEnter);
    gameItems[line - 1].addEventListener("dragleave", dragLeave);
    gameItems[line - 1].addEventListener("dragstart", (e: DragEvent) => {
      dragStart(e);
      for (let i = 0; i < gameItems[line - 1].children.length; i++) {
        (gameItems[line - 1].children[i] as HTMLDivElement).style.boxShadow = Position.RESET;
      }
    });
  }

  answerField.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    let str = word.split(" ");
    if (target.classList.contains("game__item")) {
      putOnGameField(e, line);
    }
    if (gameItems[line - 1].children.length === str.length) {
      checkBtn.style.display = "block";
    }
  });

  answerField.addEventListener("dragstart", (e: DragEvent) => {
    const target = e.target as HTMLDivElement;
    e.dataTransfer!.setData("id", target.id);
  });
  answerField.addEventListener("drop", drop);

  function putOnGameField(e: MouseEvent, line: number) {
    const element = e.target as HTMLDivElement;
    gameItems[line - 1].append(element);
  }
  function putOnAnswerField(e: MouseEvent) {
    const element = e.target as HTMLDivElement;
    answerField.append(element);
  }
  function gameFieldListener(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    //const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;
    let str = word.split(" ");
    if (target.classList.contains("game__item")) {
      for (let i = 0; i < gameItems[line - 1].children.length; i++) {
        (gameItems[line - 1].children[i] as HTMLDivElement).style.boxShadow = Position.RESET;
      }

      putOnAnswerField(e);
    }
    if (gameItems[line - 1].children.length !== str.length) {
      checkBtn.style.display = "none";
    }
  }
  function drop(e: DragEvent) {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
    let itemId = e.dataTransfer?.getData("id");
    const element = document.getElementById(itemId!) as HTMLDivElement;
    if (element) {
      if (target.classList.contains("game__items")) {
        target.append(element);
      } else if (target.classList.contains("game__item")) {
        target.before(element);
      } else if (target.classList.contains("answer__field")) {
        target.append(element);
      }
    }

    if (gameItems[line - 1].children.length === word.split(" ").length) {
      checkBtn.style.display = "block";
    }
  }

  function check(line: number, word: string) {
    const str: string[] = word.split(" ");
    //const gameItems = document.querySelectorAll(".game__items") as NodeListOf<HTMLDivElement>;

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
      (gameItems[line].querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>).forEach(
        (item: HTMLDivElement) => {
          item.style.backgroundImage = `url('${imgSrc.src}')`;
          (item.querySelector(".game__item-after") as HTMLDivElement).style.backgroundImage = `url('${imgSrc.src}')`;
        }
      );
      // const itemsOnGameField = gameItems[line - 1].querySelectorAll(".game__item") as NodeListOf<HTMLDivElement>;
      // itemsOnGameField.forEach((item: HTMLDivElement) => {
      //   item.style.backgroundImage = `url('${imgSrc.src}')`;
      // });
      checkBtn.style.display = "none";
      nextBtn.style.display = "block";
    }
  }
});

function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  //return true;
}
