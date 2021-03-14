import { Todo } from "../../schemas/todo.schema";
import { MapperPickType } from "@automapper/classes/mapped-types";

export class TodoDto extends MapperPickType(Todo, ['title', 'isDone']) {}