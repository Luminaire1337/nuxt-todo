import Todo from "~/types/Todo";
import TodosResponse from "~/types/TodosResponse";
import checkTodosSchema from "~/utils/checkTodosSchema";

const ITEMS_PER_PAGE = 5;

export default defineEventHandler(async (event) => {
  // Get current page from query parameters
  const { page } = getQuery(event);

  // If no page is provided, default to 1
  let pageNumber = parseInt(page as string, 10);
  if (isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
  }

  // Calculate the offset for pagination
  const offset = (pageNumber - 1) * ITEMS_PER_PAGE;

  // Check if database schema is initialized
  const db = useDatabase();
  await checkTodosSchema(db);

  // Fetch the todos with pagination
  const todos = await db.sql<{
    rows: Todo[];
  }>`SELECT * FROM todos LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
  const totalTodos = await db.sql<{
    rows: [{ count: number }];
  }>`SELECT COUNT(*) as count FROM todos`;

  const totalCount = totalTodos.rows[0].count;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const hasNextPage = pageNumber < totalPages;
  const hasPrevPage = pageNumber > 1;
  const nextPage = hasNextPage ? pageNumber + 1 : null;
  const prevPage = hasPrevPage ? pageNumber - 1 : null;

  // Return the response
  const response = {
    todos: todos.rows,
    pagination: {
      totalCount,
      totalPages,
      currentPage: pageNumber,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    },
  } as TodosResponse;
  return response;
});
