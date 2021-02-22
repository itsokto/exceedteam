const checkAll = document.getElementById("check-all");
const input = document.getElementById("input");
const addButton = document.getElementById("add-button");
const deleteAllButton = document.getElementById("delete-all-button");
const filter = document.getElementById("filter");
const todos = new TodoList(document.getElementById("todo-list"));

todos.filter = filter.value;

addButton.addEventListener("click", () => {
  if (input.value.trim().length > 0) {
    todos.create(input.value);
    input.value = "";
  }
});

deleteAllButton.addEventListener("click", () => todos.clear());

checkAll.addEventListener("change", () => todos.toggleAll(checkAll.checked));

filter.addEventListener("change", () => {
  todos.filter = filter.value;
  todos.applyFilter();
});
