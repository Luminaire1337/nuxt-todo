import PatchTodoRequest from "~/types/PatchTodoRequest";
import Todo from "~/types/Todo";
import checkTodosSchema from "~/utils/checkTodosSchema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  // Validate the ID
  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid ID",
    });
  }

  // Convert ID to number
  const todoId = Number(id);

  // Get the request body
  const body = await readBody<PatchTodoRequest>(event);

  // Check if database schema is initialized
  const db = useDatabase();
  await checkTodosSchema(db);

  // Update the todo in the database
  const result = await db.sql`UPDATE todos SET completed = ${
    body.completed ? 1 : 0
  } WHERE id = ${todoId}`;

  // Check if the todo was updated
  if (result.changes === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Todo not found",
    });
  }

  // Return the updated todo
  const updatedTodo = await db.sql<{
    rows: Todo[];
  }>`SELECT * FROM todos WHERE id = ${todoId}`;
  return updatedTodo.rows[0];
});
