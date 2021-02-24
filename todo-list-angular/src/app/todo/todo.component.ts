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

  isReadonly: boolean = true;

  constructor(private dataService: TodosDataService) {}

  ngOnInit(): void {}

  remove(): void {
    this.dataService.remove(this.todo);
  }

  toggleRename(toggle: boolean): void {
    if (this.todo.title === '') return;
    this.isReadonly = !toggle;
  }

  preventSelection(event: MouseEvent): void {
    if (event.detail > 1 && this.isReadonly) {
      event.preventDefault();
    }
  }
}
