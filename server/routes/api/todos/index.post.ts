import NewTodoRequest from "~/types/NewTodoRequest";
import checkTodosSchema from "~/utils/checkTodosSchema";

export default defineEventHandler(async (event) => {
  const body = await readBody<NewTodoRequest>(event);

  // Check if database schema is initialized
  const db = useDatabase();
  await checkTodosSchema(db);

  // Insert the new todo into the database
  const result = await db.sql`INSERT INTO todos (title, completed) VALUES (${
    body.title
  }, ${body.completed || 0})`;

  // Return the created todo
  return {
    id: result.lastInsertRowid,
    title: body.title,
    completed: body.completed,
  };
});
