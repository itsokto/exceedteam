import { Todo } from '../types/todo';
import { TodoResponse } from '../types/todo-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {
  private baseUrl = 'http://localhost:8080/api/todos';

  constructor(private httpClient: HttpClient) {}

  create(text: string): Observable<Todo> {
    if (text.trim() === '') {
      return;
    }
    const todo = new Todo(text);
    return this.httpClient.post<Todo>(this.baseUrl, todo);
  }

  clearCompleted(): Observable<TodoResponse> {
    return this.httpClient.delete<TodoResponse>(this.baseUrl);
  }

  get(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  getTodo(id: string): Observable<Todo[]> {
    const url = `${this.baseUrl}/${id}`;

    return this.httpClient.get<Todo[]>(url);
  }

  update(todo: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;

    return this.httpClient.put<Todo>(url, todo);
  }

  remove(todo: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;

    return this.httpClient.delete<Todo>(url);
  }

  toggleAll(toggle: boolean): Observable<TodoResponse> {
    return this.httpClient.patch<TodoResponse>(this.baseUrl, {
      toggle: toggle,
    });
  }
}
