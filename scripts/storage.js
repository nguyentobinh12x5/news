"use strict";
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Change string to initial bject
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Phương thức parse trả từ 1 chuỗi thành 1 dối tượng, nếu là array sẽ trả về array
// Lấy dữ liệu userArr từ local Storage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// Tại thời điểm này thì user vẫn là mảng
console.log(users);
// Chuyen doi ve dang class Instant và class này hoạt động như là 1 mảng
const userArr = users.map((user) => parseUser(user));
console.log(userArr);
// parse sẽ biến đổi object sang class
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;
console.log(userActive);
// Việc tạo useractive cũn giống như việc tạo 1 mảng cho useractive nhưng thay vì mảng ở đây là class
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
const todoArr = todos.map((todo) => parseTodo(todo));
// Do khi lưu xuống LocalStorage, bạn chỉ có thể lưu được các JS Object chứ không phải Class Instance (chỉ lưu được các thuộc tính chứ các hàm trong class đó sẽ không lưu được). Bạn sẽ cần viết một hàm để chuyển từ JS Object sang Class Instance như sau:
// Hàm này là hàm chuyển đổi từ Object sang Class
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}
function parseTodo(todoData) {
  const task = new Task(todoData.task, todoData.owner, todoData.isDone);
  return task;
}
