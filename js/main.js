document.addEventListener("DOMContentLoaded", () => {
  // Элементы DOM
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoItems = document.getElementById("todo-items");
  const progressItems = document.getElementById("progress-items");
  const doneItems = document.getElementById("done-items");
  const columns = document.querySelectorAll(".items");

  // Подсветка поля ввода при загрузке
  setTimeout(() => {
    taskInput.focus();
    taskInput.classList.add("task-input-highlight");
    setTimeout(() => {
      taskInput.classList.remove("task-input-highlight");
    }, 1500);
  }, 500);
});
