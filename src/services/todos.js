const pool = require("./db");

const formatTodo = (todo) => {
  const newTodo = todo;
  newTodo.id = todo.todo_id;
  delete newTodo.todo_id;
  return newTodo;
};

const createTodo = async (description) => {
  const newTodo = await pool.query(
    "INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
  );
  return formatTodo(newTodo.rows[0]);
};

const getTodos = async () => {
  const todos = await pool.query("SELECT * FROM todo");
  return todos.rows.map(formatTodo);
};

const getTodo = async (id) => {
  const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
  return formatTodo(todo.rows[0]);
};

const updateTodo = async (id, description) => {
  await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
    description,
    id,
  ]);
  return "Todo was updated!";
};

const deleteTodo = async (id) => {
  await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
  return "Todo was deleted!";
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
};
