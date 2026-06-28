const toDoInput = document.querySelector("#todo-input");
const addTask = document.querySelector("#add-task-btn");
const toDoList = document.querySelector("#todo-list");

const all = document.querySelector(".all");
const pending = document.querySelector(".pending");
const completed = document.querySelector(".completed");

const taskArray = [];

let myLiEdit = "";
let htmlDataID = "";
let editMode = false;

class Tasks {
  constructor(task) {
    this.id = crypto.randomUUID();
    this.task = task;
    this.done = false;
  }
}

addTask.addEventListener("click", (e) => {
  e.preventDefault();
  inputValue = toDoInput.value.trim();
  if (inputValue === "") return;
  if (editMode === false) {
    let taskOne = new Tasks(inputValue);
    taskArray.push(taskOne);
    console.log(taskArray);
    toDoList.innerHTML += `<li class = "listItem" data-id = ${taskOne.id}> <div class="task-test"> ${inputValue} </div> <div> <button class="btn-edit"> Edit </button> </div> <div> <button class="btn-delete"> Delete </button> </div> <div> <input type="checkbox" class="check" </div> </li>`;
    // allLiItems = document.querySelectorAll("li");
    toDoInput.value = "";
  } else if (editMode === true) {
    let value = taskArray.find((item) => {
      return item.id === htmlDataID;
    });
    value.task = toDoInput.value;
    // console.log(value.task);
    let editDiv = myLiEdit.querySelector("div");
    editDiv.textContent = `${value.task}`;
    toDoInput.value = "";
    editMode = false;
  }
});

toDoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let myLi = e.target.parentElement.parentElement;
    myLi.remove();
  } else if (e.target.classList.contains("check")) {
    let myLi = e.target.parentElement.parentElement;
    const htmlDataID = myLi.dataset.id;
    let value = taskArray.find((item) => {
      return item.id === htmlDataID;
    });
    value.done = !value.done;
  } else if (e.target.classList.contains("btn-edit")) {
    myLiEdit = e.target.parentElement.parentElement;
    htmlDataID = myLiEdit.dataset.id;
    let value = taskArray.find((item) => {
      return item.id === htmlDataID;
    });
    toDoInput.value = value.task;
    editedText = value.task;
    editMode = true;
  }
});

function filteredItems(parameter) {
  if (parameter === "completed") {
    let allLiItems = document.querySelectorAll("li");
    allLiItems.forEach((item) => {
      let htmlID = item.dataset.id;
      let filteredObj = taskArray.find((value) => {
        return value.id === htmlID;
      });
      if (filteredObj.done === true) {
        item.style.display = "grid";
      }
      if (filteredObj.done === false) {
        item.style.display = "none";
      }
    });
  } else if (parameter === "pending") {
    let allLiItems = document.querySelectorAll("li");
    allLiItems.forEach((item) => {
      let htmlID = item.dataset.id;
      let filteredObj = taskArray.find((value) => {
        return value.id === htmlID;
      });
      if (filteredObj.done === false) {
        item.style.display = "flex";
      } else if (filteredObj.done === true) {
        item.style.display = "none";
      }
    });
  } else if (parameter === "all") {
    let allLiItems = document.querySelectorAll("li");
    allLiItems.forEach((item) => {
      let htmlID = item.dataset.id;
      let filteredObj = taskArray.find((value) => {
        return value.id === htmlID;
      });
      if (filteredObj.done === true || filteredObj.done === false) {
        item.style.display = "flex";
      }
    });
  }
}
