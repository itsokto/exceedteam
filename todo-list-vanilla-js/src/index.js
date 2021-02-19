const checkAll = document.getElementById("checkAll");
const input = document.getElementById("input");
const add = document.getElementById("add");
const deleteAll = document.getElementById("deleteAll");
const filter = document.getElementById("filter");
const todoList = document.getElementById("list");

add.addEventListener("click", () => {
  if (input.value.trim().length > 0) {
    todoList.appendChild(createTodoJS(input.value, "active"));
    input.value = "";
  }
});

deleteAll.addEventListener("click", () => {
  todoList.textContent = "";
});

checkAll.addEventListener("click", () => {
  for (const item of todoList.children) {
    const checkbox = item.querySelector("input");
    checkbox.checked = checkAll.checked;
    toggleTodo(item);
  }

  applyFilter();
});

filter.addEventListener("click", applyFilter);

function applyFilter() {
  if (filter.value === "all") {
    for (const item of todoList.children) {
      item.style.display = "grid";
    }
  } else {
    for (const item of todoList.children) {
      item.style.display =
        item.dataset.status === filter.value ? "grid" : "none";
    }
  }
}

function removeTodo(element) {
  todoList.removeChild(element);
}

function toggleTodo(element) {
  element.dataset.status =
    element.dataset.status === "active" ? "done" : "active";
  applyFilter();
}

function createTodoJS(text, status) {
  const todo = document.createElement("div");
  todo.className = "todo__item";
  todo.dataset.status = status;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const todoText = document.createElement("p");
  todoText.className = "todo__item__text";
  todoText.textContent = text;

  const deleteButton = document.createElement("a");
  deleteButton.className = "todo__item__button";

  todo.appendChild(checkbox);
  todo.appendChild(todoText);
  todo.appendChild(deleteButton);

  checkbox.addEventListener("click", () => toggleTodo(todo));
  deleteButton.addEventListener("click", () => removeTodo(todo));

  return todo;
}
