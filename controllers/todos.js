const db = require('../config/mysql');

const queries = {
  createTodo: "INSERT INTO todos (title, completed) VALUES (?, ?);",
  getAlltodos: "SELECT * FROM todos",
  getTodoById: "SELECT * FROM todos WHERE id=?",
  updateTodo: "UPDATE todos SET title=?, completed=? WHERE id=?",
  deleteTodo: "DELETE FROM todos WHERE id=?"
}

//Create a new Todo
async function createTodo(req, res) {
  try {
    const { title, completed } = req.body;
    console.log(req.body)
    db.query(queries.createTodo, [title, completed], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error creating todo.", err });
      }
      return res.status(201).json({ message: "Todo has been created successfully" });
    });
  }
  catch (error) {
    res.status(500).json({
      message: `An error occurred while creating the todo.$${error}`,
    });
  }
}

// Get all Todos
async function getTodos(req, res) {
  db.query(queries.getAlltodos, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching todos.", err });
    }
    console.log(data)
    return res.status(200).json(data);
  });
}

// Get a Todo by id
async function getTodoById(req, res) {
  const { todoId } = req.params;
  db.query(queries.getTodoById, [todoId], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching todos.", err });
    }
    console.log(data)
    return res.status(200).json(data);
  });
}

// update Todo
async function updateTodo(req, res) {
  const { todoId } = req.params
  const { title, completed } = req.body

  db.query(queries.updateTodo, [title, completed, todoId], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error updating todos.", err });
    }
    console.log(data)
    return res.status(200).json({ "message": `Todo with id ${todoId} updated successfully` });
  });

}

// delete Todo
async function deleteTodo(req, res) {
  const { todoId } = req.params

  db.query(queries.deleteTodo, [todoId], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting todo", err });
    }
    console.log(data)
    return res.status(200).json({ "message": `Todo with id ${todoId} deleted successfully` });
  });
}


module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo }