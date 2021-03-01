import { TodosService } from '../services/todos.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  @Output() remove: EventEmitter<Todo>;

  isReadonly: boolean = true;

  constructor(private todosService: TodosService) {
    this.remove = new EventEmitter<Todo>();
  }

  ngOnInit(): void {}

  toggleReadonly(toggle: boolean): void {
    if (this.todo.title === '') return;
    this.isReadonly = !toggle;
  }

  preventSelection(event: MouseEvent): void {
    if (event.detail > 1 && this.isReadonly) {
      event.preventDefault();
    }
  }

  onChange(): void {
    this.todosService.update(this.todo).subscribe();
  }

  onClick(): void {
    this.todosService.remove(this.todo).subscribe();
    this.remove.emit(this.todo);
  }
}
