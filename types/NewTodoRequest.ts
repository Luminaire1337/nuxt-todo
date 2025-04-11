import type Todo from "./Todo";

// We only need to make title required, rest of the properties are optional.
export default interface NewTodoRequest extends Partial<Todo> {
  title: string;
}
