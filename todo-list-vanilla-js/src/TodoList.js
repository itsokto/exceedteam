class TodoList {
  filter;
  constructor(list) {
    this.list = list;
  }

  applyFilterFor(element) {
    const display =
      this.filter === "all" || element.dataset.status === this.filter
        ? "grid"
        : "none";
    element.style.display = display;
  }

  applyFilter() {
    for (const item of this.list.children) {
      this.applyFilterFor(item);
    }
  }

  clear() {
    this.list.textContent = "";
  }

  create(text) {
    const todo = document.createElement("div");
    todo.className = "todo__item";
    todo.dataset.status = "active";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => this.toggle(todo));

    const todoText = document.createElement("p");
    todoText.className = "todo__item__text";
    todoText.textContent = text;

    const deleteButton = document.createElement("a");
    deleteButton.className = "todo__item__button";
    deleteButton.addEventListener("click", () => this.remove(todo));

    todo.appendChild(checkbox);
    todo.appendChild(todoText);
    todo.appendChild(deleteButton);

    this.applyFilterFor(todo);
    this.list.appendChild(todo);
  }

  remove(element) {
    this.list.removeChild(element);
  }

  toggle(element) {
    element.dataset.status =
      element.dataset.status === "active" ? "done" : "active";
    this.applyFilterFor(element);
  }

  toggleAll(state) {
    for (const item of this.list.children) {
      const checkbox = item.querySelector("input");
      if (checkbox.checked !== state) {
        checkbox.checked = state;
        this.toggle(item);
      }
    }
  }
}
