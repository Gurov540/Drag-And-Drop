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

  //обновление счтчиков задач
  function updateTaskCounts() {
    document.querySelectorAll(".column").forEach((column) => {
      const items = column.querySelector(".items");
      const count = items.querySelectorAll(".item").length;
      column.querySelector(".task-count").textContent = count;
    });
  }

  // Создание новой задачи
  function createTask(text) {
    const task = document.createElement("dic");
    task.className = "item";
    task.draggable = true;
    task.innerHTML = `<button class="delete-btn">✕</button>
                      <div class="task-text">${text}</div>
                      `;

    // Добавление обработчика событий для перетаскивания
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
  }
});
