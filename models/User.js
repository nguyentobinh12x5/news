"use strict";
class User {
  // * Construction dùng để xác định các tham số truyền vào
  constructor(
    firstname,
    lastname,
    username,
    password,
    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}
// * Class task include information relate to task in todolist
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
// Trong trường hợp này this chính là chỉ đối tượng hiện tại, còn this.firstname đặt tên, firstname đăng sau chính là giá trị
