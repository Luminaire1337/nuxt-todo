export default async function checkTodosSchema(
  db: ReturnType<typeof useDatabase>
) {
  await db.sql`CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0
    )`;
}
