export enum TodoFilter {
  All,
  Active,
  Done,
}

export class Todo {
  text: string;
  isDone: boolean;

  constructor(text: string) {
    this.text = text;
    this.isDone = false;
  }
}
