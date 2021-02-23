import { TodosDataService } from '../services/todos-data.service';
import { Input } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from '../types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  private dataService: TodosDataService;

  constructor(dataService: TodosDataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {}

  remove(): void {
    this.dataService.remove(this.todo);
  }
}
