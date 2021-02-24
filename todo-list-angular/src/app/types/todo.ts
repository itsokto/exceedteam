export enum TodoFilter {
  All,
  Active,
  Completed,
}

export class Todo {
  isDone: boolean;
  id: string;
  title: string;

  constructor(title: string) {
    this.title = title;
    this.isDone = false;
  }
}
