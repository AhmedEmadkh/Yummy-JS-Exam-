function isNameValid(name) {
  // Allow only letters and spaces
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(name);
}

function isEmailValid(email) {
  // Simple email validation
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isPhoneValid(phone) {
  // Phone validation
  const regex = /^(002)?01[0125]\d{8}$/;
  return regex.test(phone);
}
function isPasswordValid(pass) {
  // Simple email validation
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  return regex.test(pass);
}
function isAgeValid(age) {
  // Simple email validation
  const regex = /^1[8-9]|[2-9][0-9]$/;
  return regex.test(age);
}

function isName() {
  const nameInput = document.getElementById("nameInput");
  const nameAlert = document.getElementById("nameAlert");
  // Validate name
  if (!isNameValid(nameInput.value)) {
    nameAlert.classList.remove("d-none");
  } else {
    nameAlert.classList.add("d-none");
  }
}
function isEmail() {
  const emailInput = document.getElementById("emailInput");
  const emailAlert = document.getElementById("emailAlert");
  // Val email
  if (!isEmailValid(emailInput.value)) {
    emailAlert.classList.remove("d-none");
  } else {
    emailAlert.classList.add("d-none");
  }
}
function isPhone() {
  const phoneInput = document.getElementById("phoneInput");
  const phoneAlert = document.getElementById("phoneAlert");
  // Validate Phone
  if (!isPhoneValid(phoneInput.value)) {
    phoneAlert.classList.remove("d-none");
  } else {
    phoneAlert.classList.add("d-none");
  }
}
function isAge() {
  const ageInput = document.getElementById("ageInput");
  const ageAlert = document.getElementById("ageAlert");
  // Validate Age
  if (!isAgeValid(ageInput.value)) {
    ageAlert.classList.remove("d-none");
  } else {
    ageAlert.classList.add("d-none");
  }
}
function isPass() {
  const passwordInput = document.getElementById("passwordInput");
  const passwordAlert = document.getElementById("passwordAlert");
  // Validate Password
  if (!isPasswordValid(passwordInput.value)) {
    passwordAlert.classList.remove("d-none");
  } else {
    passwordAlert.classList.add("d-none");
  }
}
function isRePass() {
  const repasswordInput = document.getElementById("repasswordInput");
  const repasswordAlert = document.getElementById("repasswordAlert");
  // Validate RePassword
  const isRePasswordValid = passwordInput.value === repasswordInput.value;
  if (!isRePasswordValid) {
    repasswordAlert.classList.remove("d-none");
  } else {
    repasswordAlert.classList.add("d-none");
  }
}

function inputsValidation() {
  const isRePasswordValid = passwordInput.value === repasswordInput.value;
  // Enable/disable submit button based on overall validity
  const submitBtn = document.getElementById("submitBtn");
  const isValid =
    isNameValid(nameInput.value) &&
    isEmailValid(emailInput.value) &&
    isAgeValid(ageInput.value) &&
    isPasswordValid(passwordInput.value) &&
    isRePasswordValid;
  // Add conditions for other input fields...
  submitBtn.disabled = !isValid;
}
