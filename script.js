const toDoInput = document.querySelector("#todo-input");
const addTask = document.querySelector("#add-task-btn");
const toDoList = document.querySelector("#todo-list");
const clearLocalStorage = document.querySelector("#clear");

const filterBtn = document.querySelectorAll(".filter-btn");

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

loadFromLocal();

function addingTask() {
  inputValue = toDoInput.value.trim();
  if (inputValue === "") return;
  if (editMode === false) {
    let taskOne = new Tasks(inputValue);
    taskArray.push(taskOne);
    console.log(taskArray);
    // toDoList.innerHTML += `<li class = "listItem" data-id = ${taskOne.id}> <div class="task-test"> ${inputValue} </div> <div> <button class="btn-edit"> Edit </button> </div> <div> <button class="btn-delete"> Delete </button> </div> <div> <input type="checkbox" class="check" </div> </li>`;
    let myLi = document.createElement("li");
    myLi.className = "listItem";
    myLi.dataset.id = `${taskOne.id}`;
    myLi.innerHTML = `<div class="task-test"> ${inputValue} </div> <div> <button class="btn-edit"> 🖉 </button> </div> <div> <button class="btn-delete"> ❌ </button> </div> <div> <input type="checkbox" class="check" </div>`;
    toDoList.appendChild(myLi);
    saveToLocal();
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
}

toDoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addingTask();
  }
});

addTask.addEventListener("click", (e) => {
  e.preventDefault();
  addingTask();
});

toDoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let myLi = e.target.parentElement.parentElement;
    let dataID = myLi.dataset.id;
    myLi.remove();
    let taskArrIndexId = taskArray.findIndex((index) => {
      return index.id === dataID;
    });
    taskArray.splice(taskArrIndexId, 1);
    console.log(taskArray);
    saveToLocal();
  } else if (e.target.classList.contains("check")) {
    let myLi = e.target.parentElement.parentElement;
    const htmlDataID = myLi.dataset.id;
    let value = taskArray.find((item) => {
      return item.id === htmlDataID;
    });
    value.done = !value.done;
    saveToLocal();
  } else if (e.target.classList.contains("btn-edit")) {
    myLiEdit = e.target.parentElement.parentElement;
    htmlDataID = myLiEdit.dataset.id;
    let value = taskArray.find((item) => {
      return item.id === htmlDataID;
    });
    toDoInput.value = value.task;
    editedText = value.task;
    editMode = true;
    saveToLocal();
  }
});

filterBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    filterBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    filteredItems(e.target.dataset.filter);
  });
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
        item.style.display = "flex";
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

function saveToLocal() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadFromLocal() {
  let tasksLocal = localStorage.getItem("tasks");
  if (tasksLocal) {
    let parsedItem = JSON.parse(tasksLocal);
    taskArray.push(...parsedItem);
    parsedItem.forEach((item) => {
      let myLi = document.createElement("li");
      myLi.className = "listItem";
      myLi.dataset.id = `${item.id}`;
      myLi.innerHTML = `<div class="task-test"> ${item.task} </div> <div> <button class="btn-edit"> 🖉 </button> </div> <div> <button class="btn-delete"> ❌ </button> </div> <div> <input type="checkbox" class="check" </div>`;
      toDoList.appendChild(myLi);
      if (item.done === true) {
        myLi.classList.add("completed");
        myLi.querySelector(".check").checked = true;
      }
    });
  }
}

clearLocalStorage.addEventListener("click", (e) => {
  localStorage.clear();
  window.location.reload();
});
