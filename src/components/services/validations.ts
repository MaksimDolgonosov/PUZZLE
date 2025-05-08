//const errorField = document.querySelector(".loginPage__errorMsg_firstname") as HTMLDivElement;
const submitBtn = document.querySelector("#submitLogin") as HTMLButtonElement;
const errorMsg = document.querySelector(".loginPage__errorMsg") as HTMLDivElement;

export default function validation(e: Event, length: number, field: "firstname" | "lastname"): void {
  errorMsg.style.color = "#ff000000";
  const errorField = document.querySelector(`.loginPage__errorMsg_${field}`) as HTMLDivElement;
  let input = e.target as HTMLInputElement;
  if (input.value.match(/^[A-Z]/) || input.value === "") {
    errorField.textContent = ``;
    input.style.border = "none";
    submitBtn.disabled = false;
  } else {
    errorField.textContent = `The first letter must be in English uppercase!`;
    input.style.border = "2px solid red";
    submitBtn.disabled = true;
    return;
  }

  //console.log(input.value.match(/^[A-Z][A-Za-z]*$/g));
  if (input.value.match(/^[A-Z]([A-Za-z]|-)*$/g) || input.value === "") {
    errorField.textContent = ``;
    input.style.border = "none";
    submitBtn.disabled = false;
  } else {
    errorField.textContent = `Must be only English letters or hyphen ('-') symbol!`;
    input.style.border = "2px solid red";
    submitBtn.disabled = true;
    return;
  }
  if (input.value.length >= length || input.value === "") {
    errorField.textContent = ``;
    input.style.border = "none";
    submitBtn.disabled = false;
  } else {
    errorField.textContent = `Must be minimum ${length} letters`;
    input.style.border = "2px solid red";
    submitBtn.disabled = true;
    return;
  }
}
