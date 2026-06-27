const toDoInput = document.querySelector("#todo-input");
const addTask = document.querySelector("#add-task-btn");
const toDoList = document.querySelector("#todo-list");
const taskArray = [];

addTask.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = toDoInput.value.trim();
  if (inputValue === "") return;
  const newTask = {
    id: crypto.randomUUID(),
    task: inputValue,
    completed: false,
  };
  taskArray.push(newTask);
  console.log(inputValue);
  toDoInput.value = "";
});
