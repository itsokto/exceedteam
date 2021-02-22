const $items = $(".todo__list");
const $footer = $(".todo__footer");
const $counter = $("#counter");
const $input = $(".todo__header__input");
const $checkAll = $("#check-all-checkbox input");
const $clearCompleted = $("#clear-completed");
const $filter = $(".todo__footer__filters");

const todoList = new TodoList($items);

var filterValue = "all";

toggleFooter();

$input.keyup((event) => {
  const text = $input.val().trim();

  if (text === "") {
    return;
  }

  if (event.keyCode == 13) {
    todoList.append(text);

    $input.val("");

    countActiveTodos();
    toggleFooter();
    toggleClearCompleted();
  }
});

$checkAll.on("change", () => {
  todoList.toggleAll($checkAll.is(":checked"), filterValue);

  countActiveTodos();
  toggleClearCompleted();
});

$clearCompleted.on("click", function () {
  todoList.clear("done");

  toggleFooter();
  toggleClearCompleted();
});

$filter.on("change", ".todo__footer__filter input", function () {
  filterValue = $(this).val();

  todoList.filter(filterValue);
});

$items.on("change", ".todo__item .todo__checkbox input", function () {
  const $item = $(this).parent().parent();
  todoList.toggle($item, filterValue);

  countActiveTodos();
  toggleClearCompleted();
});

$items.on("click", ".todo__item .todo__item__button", function () {
  const $item = $(this).parent();
  todoList.remove($item);

  countActiveTodos();
  toggleFooter();
  toggleClearCompleted();
});

function countActiveTodos() {
  const $active = $items.find(".todo__item").filter(function () {
    return $(this).data("status") == "active";
  });

  let text;

  if ($active.length === 1) {
    text = `${$active.length} item left`;
  } else {
    text = `${$active.length} items left`;
  }

  $counter.text(text);
}

function toggleFooter() {
  if ($items.children().length > 0) {
    $footer.show();
  } else {
    $footer.hide();
  }
}

function toggleClearCompleted() {
  const $done = $items.find(".todo__item").filter(function () {
    return $(this).data("status") == "done";
  });

  if ($done.length > 0) {
    $clearCompleted.show();
  } else {
    $clearCompleted.hide();
  }
}
