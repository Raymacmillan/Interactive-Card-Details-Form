const confirmationBtn = document.querySelector(".confirmation_btn");
const continueBtn = document.querySelector(".continue_btn");
const form = document.querySelector("form");
const completeSection = document.querySelector(".complete_section");
const cvcLabel = document.querySelector(".bg_card p");
const cvc = document.querySelector("#cvc");
const nameLabel = document.querySelector(".personal_details p:first-Child");
const name = document.querySelector("#name");
const expiryLabel = document.querySelector(".personal_details p:last-Child");
const month = document.querySelector("#expiry_date");
const year = document.querySelector("#year");
const cardNumberLabel = document.querySelector(".card_info > p");
const cardNumber = document.querySelector("#number");
const nameError = document.querySelector(".name_error");
const numberError = document.querySelector(".number_error");
const dateError = document.querySelector(".date_error");
const expiryDateError = document.querySelector(".expirydate_error");
const yearError = document.querySelector(".yearError");
const cvcError = document.querySelector(".cvcError");

function updateName(e) {
  nameLabel.textContent = e.target.value.toUpperCase();

  if (e.target.value === "") {
    nameLabel.textContent = "JANE APPLESEED";
    nameError.textContent = "";
  }
  
  if (isNameValid(e.target.value)) {
    name.classList.remove("invalid");
  } else {
    name.classList.add("invalid");
    nameError.textContent = "Wrong format,letters only";
  }
  if (e.target.value === "") {
    name.textContent = "000";
    nameError.textContent = "";
  }
}

function updateNumber(e) {
  cardNumberLabel.textContent = e.target.value;

  if(e.target.value.length ===0) {
    cardNumberLabel.textContent = "0000 0000 0000 0000";
  }

  if (isNumberValid(e.target.value)) {
    cardNumber.classList.remove("invalid");
    numberError.textContent = "";

  }
    else {
    cardNumber.classList.add("invalid");
    numberError.textContent = "Wrong format";
  }

  if(e.target.value.match(/[a-zA-Z]/) !==null){
    numberError.textContent = "Wrong format,numbers only";
  }

  

  if (
    (e.target.value.length - 1 === 3 ||
    e.target.value.length - 1 === 8 ||
    e.target.value.length - 1 === 13) && e.key !== "Backspace"
  ) {
    e.target.value += " ";
  }

  if(e.target.value === ""){
    numberError.textContent = "";
  }
}

function updateMonth(e) {
    formatDate(e);
  if (isMonthValid(e.target.value)) {
    month.classList.remove("invalid");
    expiryDateError.textContent = "";
  } else {
    month.classList.add("invalid");

    expiryDateError.textContent = "Can't be blank";
  }
  if (e.target.value.length!==0) {
    month.textContent = "000";
    expiryDateError.textContent = "";
  }
}


/**
 * 
 * @param {KeyboardEvent} param0 
 */
function formatDate({target}, isYear = false){

    target.value = target.value.replace(/^[1-9]$/, "0$&");

    if(isYear === false){
      target.value = target.value.replace(/^01(?<num>[0-2])$/, "1$<num>");
    }else{
      target.value = target.value.replace(/^0(?<num>[0-9]{2})$/, "$<num>");
    }

    if(target.value.length === 3){
      target.value = target.value.substring(0, 2);
    }

    if(target.value === "00" && !isYear){
      target.value = "01";
    }

    updateExpiryLabel();
}

function updateExpiryLabel(){
    const m =  month.value !== "" && month.value.length !== 1 ? month.value : "00";
    const y =  year.value.length !== 1 && year.value !== "" ? year.value : "00";
    expiryLabel.textContent = `${m}/${y}`;
}

function updateYear(e) {
  formatDate(e, true);

  if (isYearValid(e.target.value)) {
    year.classList.remove("invalid");
    yearError.textContent = "";
  } else {
    year.classList.add("invalid");
    yearError.textContent = "Can't be blank";
  }
  if (e.target.value.length!==0) {
    year.textContent = "000";
    yearError.textContent = "";
  }

}

function updateCvc(e) {
  cvcLabel.textContent = e.target.value;

 
  if (isCvcValid(e.target.value)) {
    cvc.classList.remove("invalid");
    cvcError.textContent = "";
  } else {
    cvc.classList.add("invalid");
    cvcError.textContent = "Can't be blank";
  }

  if (e.target.value.length!==0) {
    cvcError.textContent = "";
  }else {
    cvcLabel.textContent = "000";
  }
}

/**
 *
 * @param {String} text
 */
function isNameValid(text) {
  const result = text.match(/^[a-zA-Z\s]{1,}$/);

  if (result !== null) {
    return true;
  }

  return false;
}
/**
 *
 * @param {String} number
 */

function isNumberValid(number) {
  const numResult = number.match(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/);

  if (numResult !== null) {
    return true;
  }
  return false;
}

/**
 *
 * @param {String} date
 */

function isMonthValid(date) {
  const dateResult = date.match(/^[0-9]{2}$/);

  if (dateResult !== null) {
    return true;
  }

  return false;
}
/**
 *
 * @param {String} year
 */

function isYearValid(year) {
  const yearResult = year.match(/^[0-9]{2}$/);

  if (yearResult !== null) {
    return true;
  }

  return false;
}

/**
 *
 * @param {String} cvc
 */

function isCvcValid(cvc) {
  const cvcResult = cvc.match(/^[0-9]{3}$/);

  if (cvcResult !== null) {
    return true;
  }
  return false;
}

name.addEventListener("keyup", updateName);
cardNumber.addEventListener("keyup", updateNumber);
month.addEventListener("keyup", updateMonth);
year.addEventListener("keyup", updateYear);
cvc.addEventListener("keyup", updateCvc);


confirmationBtn.addEventListener("click",(e)=>{
  if(isNameValid(name.value) && isNumberValid(cardNumber.value) && isMonthValid(month.value) && isYearValid(year.value) && isCvcValid(cvc.value)){
    completeSection.classList.add("show_complete_section");
    form.classList.add("hide_form");
  }else{
    alert("Please complete filling the form");
  }
});

continueBtn.addEventListener("click",()=>{
  completeSection.classList.remove("show_complete_section");
  form.classList.remove("hide_form");
  name.value = "";
  nameLabel.textContent = "Jane Appleseed";
  month.value = "";
  year.value = "";
  cardNumber.value = "";
  cvc.value = "";
  cvcLabel.textContent = "000";
  cardNumberLabel.textContent = "0000 0000 0000 0000";
  expiryLabel.textContent = "00/00";
});


form.addEventListener("submit",(e)=>{
  e.preventDefault();
})