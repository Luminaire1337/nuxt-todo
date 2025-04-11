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

  // Check if database schema is initialized
  const db = useDatabase();
  await checkTodosSchema(db);

  // Delete the todo from the database
  const result = await db.sql`DELETE FROM todos WHERE id = ${todoId}`;

  // Check if the todo was deleted
  if (result.changes === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Todo not found",
    });
  }

  // Return a success message
  return {
    message: "Todo deleted successfully",
  };
});
