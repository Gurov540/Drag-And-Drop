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

    // Обработчика событий для перетаскивания
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);

    // Обработчик удаления
    task.querySelector(".delet-btn").addEventListener("click", () => {
      task.style.animation = "fadeOut 0.3s forwards";
      setTimeout(() => {
        task.remove();
        updateTaskCounts();
      }, 300);
    });

    // Редактирование по дабл клику
    task.addEventListener("dblclick", () => {
      const textElement = task.querySelector(".task-text");
      const originalText = textElement.textContent;

      const input = document.createElement("input");
      input.type = "text";
      input.value = originalText;
      input.style.width = "100%";
      input.style.padding = "8px";
      input.style.border = "1px solid rgba(100, 100, 100, 0.3)";
      input.style.borderRadius = "4px";
      input.style.background = "rgba(60, 60, 60, 0.8)";
      input.style.color = "#f0f0f0";

      textElement.replaceWith(input);
      input.focus();

      input.addEventListener("blur", () => {
        const newText = input.value.trim() || originalText;
        const newTextElement = document.createElement("div");
        newTextElement.className = "task-text";
        newTextElement.textContent = newText;
        input.replaceWith(newTextElement);
      });

      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          input.blur();
        }
      });
    });
    return task;
  }

  // Добавление задачи
  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      const task = createTask(text);
      todoItems.appendChild(task);
      taskInput.value = "";
      updateTaskCounts();
      taskInput.focus();

      // Анимация добавления
      task.style.animation = "pulse 1s";
      setTimeout(() => {
        task.style.animation = "";
      }, 1000);
    } else {
      // Подсветка пустого поля
      taskInput.classList.add("task-input-highlight");
      setTimeout(() => {
        taskInput.classList.remove("task-input-highlight");
      }, 1500);
    }
  }

  // Обработчик событий дл добавления задачи
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Drag and  drop логика
  let draggedItem = null;

  function dragStart() {
    draggedItem = this;
    setTimeout(() => this.classList.add("dragging"), 0);
  }

  function dragEnd() {
    this.classList.remove("dragging");
    draggedItem = nell;
  }

  // Обработчик событий для колонок
  columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", dragDrop);
  });

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
  }

  function dragLeave(e) {
    this.classList.remove("over");
  }

  function dragDrop(e) {
    this.classList.remove("over");
    if (draggedItem) {
      this.appendChild(draggedItems);
      updateTaskCounts();

      // Анимации успешного перемещения
      draggedItem.style.animation = "puls 0.5s";
      setTimeout(() => {
        draggedItem.style.animation = "";
      }, 500);
    }
  }
});
