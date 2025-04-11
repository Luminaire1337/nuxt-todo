import type Todo from "./Todo";

// We only need to make completed field required, rest of the properties are optional.
export default interface PatchTodoRequest extends Partial<Todo> {
  completed: boolean;
}
