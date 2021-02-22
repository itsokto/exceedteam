import { TodosDataService } from './../types/todos-data.service';
import { Input } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Todo, TodoStatus } from '../types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  todoStatus = TodoStatus;

  private dataService: TodosDataService;

  constructor(dataService: TodosDataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {}

  remove() {
    this.dataService.remove(this.todo);
  }

  toggle() {
    this.todo.status =
      this.todo.status == TodoStatus.Active
        ? TodoStatus.Done
        : TodoStatus.Active;
  }
}
