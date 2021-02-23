import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoFilter } from '../types/todo';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent implements OnInit {
  @Input()
  filter: TodoFilter;
  @Output()
  filterChange: EventEmitter<TodoFilter>;

  filters: TodoFilter[];

  constructor() {
    this.filters = [TodoFilter.All, TodoFilter.Active, TodoFilter.Done];
    this.filterChange = new EventEmitter<TodoFilter>();
  }

  ngOnInit(): void {}

  onChange() {
    this.filterChange.emit(this.filter);
  }

  getText(filter: TodoFilter): string {
    return TodoFilter[filter];
  }
}
