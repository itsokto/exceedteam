export enum TodoFilter {
  All,
  Active,
  Completed,
}

export class Todo {
  isDone: boolean;
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(title: string) {
    this.title = title;
    this.isDone = false;
  }
}
