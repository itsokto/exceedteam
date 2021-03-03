import { Component, OnInit} from '@angular/core';
import { TodoFilter } from '../types/todo';
import { AppState } from '../store/states/app.states';
import { Store } from '@ngrx/store';
import { TodoApplyFilter } from '../store/actions/todo.actions';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent implements OnInit {
  filter: TodoFilter;
  filters: TodoFilter[];

  constructor(private store: Store<AppState>) {
    this.filters = [TodoFilter.All, TodoFilter.Active, TodoFilter.Completed];
  }

  ngOnInit(): void {}

  onChange(): void {
    this.store.dispatch(new TodoApplyFilter(this.filter));
  }

  getText(filter: TodoFilter): string {
    return TodoFilter[filter];
  }
}
