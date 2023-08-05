"use strict";
let id = (id) => document.getElementById(id);
const btnSubmit = id("btn-submit"),
  userNameInput = id("input-username"),
  passwordInput = id("input-password");

// * Action
btnSubmit.addEventListener("click", function () {
  const validate = validateData();
  if (validate) {
    const user = getFromStorage("userArr").find(
      (item) =>
        item.username === userNameInput.value &&
        item.password === passwordInput.value
    );
    if (user) {
      alert("Logged in successfully");
      saveToStorage("userActive", user);
      window.location.href = "../index.html";
    } else {
      alert("Login information is incorrect, please check again!!!");
    }
  }
});
function validateData() {
  let isValidate = true;
  if (userNameInput.value === "") {
    alert("Please finput for Username");
    isValidate = false;
  }
  if (passwordInput.value === "") {
    alert("Please finput for password");
    isValidate = false;
  }
  return isValidate;
}
