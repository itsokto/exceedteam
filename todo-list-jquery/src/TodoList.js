class TodoList {
  constructor(element) {
    this.$todos = element;
  }

  append(text) {
    let $todo = $(`
      <div class="todo__item">
        <label class="todo__checkbox">
          <input type="checkbox" name="checkbox" />
          <span class="todo__checkbox__control">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path fill="none" stroke="currentColor" stroke-width="2" d='M1.73 12.91l6.37 6.37L22.79 4.59' />
            </svg>
          </span>
          <span class="todo__checkbox__label">${text}</span>
        </label>
        <div class="todo__item__button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.806 409.806">
		    <path fill="currentColor" stroke="currentColor" stroke-width="2" d="M228.929,205.01L404.596,29.343c6.78-6.548,6.968-17.352,0.42-24.132c-6.548-6.78-17.352-6.968-24.132-0.42
		    c-0.142,0.137-0.282,0.277-0.42,0.42L204.796,180.878L29.129,5.21c-6.78-6.548-17.584-6.36-24.132,0.42
		    c-6.388,6.614-6.388,17.099,0,23.713L180.664,205.01L4.997,380.677c-6.663,6.664-6.663,17.468,0,24.132
		    c6.664,6.662,17.468,6.662,24.132,0l175.667-175.667l175.667,175.667c6.78,6.548,17.584,6.36,24.132-0.42
		    c6.387-6.614,6.387-17.099,0-23.712L228.929,205.01z"/>
          </svg>
        </div>
      </div>
        `);

    $todo.data("status", "active");

    this.$todos.append($todo);
  }

  filterFor($item, filter) {
    const display =
      $($item).data("status") === filter || filter === "all" ? "grid" : "none";

    $($item).css("display", display);
  }

  filter(filter) {
    const filterForFunc = this.filterFor.bind(this);
    $items.find(".todo__item").each(function () {
      filterForFunc($(this), filter);
    });
  }

  clear(status = "done") {
    const $done = $items.find(".todo__item").filter(function () {
      return $(this).data("status") == status;
    });

    $done.remove();
  }

  toggle($item, filter) {
    const itemStatus = $item.data("status");

    const setStatus = itemStatus === "active" ? "done" : "active";

    $item.data("status", setStatus);

    this.filterFor($item, filter);
  }

  toggleAll(toggle, filter) {
    const toggleFunc = this.toggle.bind(this);
    this.$todos.find(".todo__item").each(function () {
      const $checkbox = $(this).find(".todo__checkbox input");
      if ($checkbox.is(":checked") !== toggle) {
        $checkbox.prop("checked", toggle);
        toggleFunc($(this), filter);
      }
    });
  }

  remove($item) {
    $item.remove();
  }
}
