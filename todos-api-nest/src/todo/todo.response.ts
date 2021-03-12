export class TodoResponse<T> {
  ok: boolean;
  payload?: T;
  message?: string;
}