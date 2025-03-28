export default class SetLogin {
  // firstname: HTMLInputElement;
  // lastname: HTMLInputElement;
  submit: HTMLButtonElement;
  constructor() {
    this.submit = document.querySelector("#submitLogin") as HTMLButtonElement;
  }
  setLoginToLS() {
    this.submit.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      const firstname = document.querySelector(
        "#firstname"
      ) as HTMLInputElement;
      const lastname = document.querySelector("#lastname") as HTMLInputElement;
      console.log(firstname.value);
      console.log(lastname.value);
    });
  }
}
