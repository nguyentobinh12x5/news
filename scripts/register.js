"use strict";
let id = (id) => document.getElementById(id);
const firstNameInput = id("input-firstname"),
  lastNameInput = id("input-lastname"),
  userNameInput = id("input-username"),
  passwordInput = id("input-password"),
  passwordConfirmInput = id("input-password-confirm"),
  btnSubmit = id("btn-submit");
btnSubmit.addEventListener("click", function () {
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passwordInput.value
  );
  const validate = validateData(user);
  if (validate) {
    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("Successful Register");
    // tranfer to screen logo
    window.location.href = "../pages/login.html";
  }
});
function validateData(user) {
  let isValidate = true;
  if (user.firstname === "") {
    alert("Please finput for FirstName");
    isValidate = false;
  }
  if (user.lastname === "") {
    alert("Please finput for LastName");
    isValidate = false;
  }
  if (user.username === "") {
    alert("Please finput for UserName");
    isValidate = false;
  }
  if (user.password === "") {
    alert("Please finput for PassWord");
    isValidate = false;
  }
  if (user.passwordconfirm === "") {
    alert("Please finput for Confirm PassWord");
    isValidate = false;
  }
  // username is unique
  for (let i = 0; i < userArr.length; i++) {
    if (user.username === userArr[i].username) {
      alert("username must be unique");
      isValidate = false;
      break;
    }
  }
  if (user.password !== passwordConfirmInput.value) {
    alert("PassWord and Confirm PassWord must be same");
    isValidate = false;
  }
  if (user.password.length < 8) {
    alert("PassWord must be more than 8 character");
    isValidate = false;
  }

  return isValidate;
}
