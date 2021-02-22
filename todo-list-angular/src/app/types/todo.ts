export enum TodoStatus {
  Active,
  Done,
}

export class Todo {
  text: string;
  status: TodoStatus;

  constructor(text: string, status: TodoStatus) {
    this.text = text;
    this.status = status;
  }
}
