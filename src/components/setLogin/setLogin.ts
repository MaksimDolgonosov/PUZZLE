export default class SetLogin {
  // firstname: HTMLInputElement;
  // lastname: HTMLInputElement;
  submit: HTMLButtonElement;
  constructor() {
    this.submit = document.querySelector("#submitLogin") as HTMLButtonElement;
  }
  setLoginToLS() {
    if (this.submit) {
      this.submit.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        const firstname = document.querySelector(
          "#firstname"
        ) as HTMLInputElement;
        const lastname = document.querySelector(
          "#lastname"
        ) as HTMLInputElement;
        const errorMsg = document.querySelector(
          ".loginPage__errorMsg"
        ) as HTMLDivElement;
        console.log(!firstname.value && !lastname.value);
        if (firstname.value && lastname.value) {
          localStorage.setItem("firstname", firstname.value);
          localStorage.setItem("lastname", lastname.value);
          window.location.href = "game.html";
        } else {
          errorMsg.style.color = "#ff0000";
        }
      });
    }
  }
}
