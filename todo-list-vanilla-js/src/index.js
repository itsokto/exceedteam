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
    if (checkbox.checked !== checkAll.checked) {
      checkbox.checked = checkAll.checked;
      toggleTodo(item);      
    }
  }
});

filter.addEventListener("click", applyFilterForAll);

function applyFilterFor(element) {
  const display = filter.value === "all" || element.dataset.status === filter.value ? "grid" : "none";
  element.style.display = display;
}

function applyFilterForAll() {
  for (const item of todoList.children) {
    applyFilterFor(item);
  }
}

function removeTodo(element) {
  todoList.removeChild(element);
}

function toggleTodo(element) {
  element.dataset.status = element.dataset.status === "active" ? "done" : "active";
  applyFilterFor(element);
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

  checkbox.addEventListener("change", () => toggleTodo(todo));

  deleteButton.addEventListener("click", () => removeTodo(todo));

  return todo;
}
