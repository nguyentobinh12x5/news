"use strict";
if (userActive) {
  let id = (id) => document.getElementById(id);
  const categoryInput = id("input-category"),
    pageInput = id("input-page-size"),
    btnSubmit = id("btn-submit");
  btnSubmit.addEventListener("click", function () {
    if (validate) {
      // Update bien useractive
      userActive.pageSize = Number.parseInt(pageInput.value);
      userActive.category = categoryInput.value;
      // Save to storage
      saveToStorage("userActive", userActive);
      // Update array userArr
      const index = userArr.findIndex(
        (userItem) => (userItem.username = userActive.username)
      );
      userArr[index] = userActive;
      console.log(userArr[index]);
      saveToStorage("userArr", userArr);
      alert("Setting success");
      pageInput.value = "";
      categoryInput.value = "General";
    }
  });
  function validate() {
    let validate = true;
    if (Number.isNaN(Number.parseInt(pageInput.value))) {
      alert("Please fill in with numbers");
      validate = false;
    }
    if (categoryInput === "") {
      alert("Please select the category");
      validate = false;
    }
    return validate;
  }
} else {
  alert("Please login to use this function");
  window.location.assign("../index.html");
}
