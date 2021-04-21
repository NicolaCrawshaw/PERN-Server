const express = require("express");
const app = express();
const cors = require("cors");

const {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("./services/todos");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.get("/api", async (req, res) => {
  res.json({ message: "Welcome to the todo app" });
});

app.get("/api/healthcheck", async (req, res) => {
  res.json({ message: "I am really healthy!" });
});

// get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (e) {
    res.status = 500;
    return res.json({ error: e.message });
  }
});

// create a todo
app.post("/api/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const todo = await createTodo(description);
    return res.json(todo);
  } catch (e) {
    throw new Error(e);
  }
});

// get a todo
app.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await getTodo(id);
  res.json(todo);
});

//update a todo
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const todo = await updateTodo(id, description);
  res.json(todo);
});

//delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await deleteTodo(id);
  res.json(todo);
});

module.exports = app;
