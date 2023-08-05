"use strict";
// Create class represent for infor user
let id = (id) => document.getElementById(id);
const loginModal = id("login-modal"),
  mainContent = id("main-content"),
  welcomeMessage = id("welcome-message"),
  btnLogout = id("btn-logout");
displayHome();
function displayHome() {
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Do you want to logout?");
  if (isLogout) {
    localStorage.removeItem("userActive");
    userActive = null;
    displayHome();
  }
});
