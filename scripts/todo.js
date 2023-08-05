"use strict";
if (userActive) {
  let id = (id) => document.getElementById(id);
  const btnAdd = id("btn-add"),
    taskInput = id("input-task"),
    todoList = id("todo-list");
  function displayToDoList() {
    let html = "";
    // Khi lưu vào trong storage lưu nhiệm vụ của tất cả các tài khoản vậy nên cần sử dụng filter để lọc ra mảng của đúng tài khoản đang đăng nhập
    todoArr
      .filter((todo) => todo.owner === userActive.username)
      .forEach((todo) => {
        html += `
        <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">x</span></li>
        `;
      });
    todoList.innerHTML = html;
    // Event
    eventToggleTask();
    eventDeleteTask();
  }
  // Display todo list
  displayToDoList();
  btnAdd.addEventListener("click", function () {
    if (taskInput.value.trim() === "") {
      alert("Please fill in your task");
    } else {
      const todo = new Task(taskInput.value, userActive.username, false);
      // Add new task todoArr
      todoArr.push(todo);
      saveToStorage("todoArr", todoArr);
      // Display task
      displayToDoList();
      // Reset data from form
      taskInput.value = "";
    }
  });
  // Hàm bắt sự kiện toggle task
  function eventToggleTask() {
    // Lấy tất cả các phần tử li chứa thông tin của các task và bắt sự kiện
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        // Tránh nút deleta ra => không bị chồng sự kiện khi nhấn nút delete
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          // Tìm task mà bạn vừa click vào
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.username &&
              todoItem.task === liEl.textContent.slice(0, -1) // Lấy nội dung của liEL tuy nhiên sẽ loại bỏ dấu x
          );
          console.log(todo);
          // Change atribute
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }
  function eventDeleteTask() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // Confirm delete
        const isDelete = confirm("Are you sure to delete?");
        if (isDelete) {
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
            // Hàm sẽ trả về 1 array đầy đủ loại trừ chỉ mục cuối cùng do sử dụng -1
            // Lấy nội dung text chứa task tuy nhiên loại bỏ dấu x
          );
          // Hàm slice này lấy rẩ cả phần tử trong mảng (0, -1)
          // Như vậy closeEL.parent... sẽ trả về true nếu nội dung văn bản của phần tử cha của closeEL bằng với thuộc tính task của item
          console.log(index);
          todoArr.splice(index, 1);
          saveToStorage("todoArr", todoArr);
          displayToDoList();
        }
      });
    });
  }
} else {
  alert("Please login to access this function!!");
  window.location.assign("../index.html");
}
