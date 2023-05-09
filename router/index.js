const express = require('express');
const router = express.Router();

const { getTodos, createTodo, updateTodo, deleteTodo, getTodoById } = require('../controllers/todos');

router.post('/todo', createTodo)
router.get('/todo', getTodos)
router.get('/todo/:todoId', getTodoById)
router.put('/todo/:todoId', updateTodo)
router.delete('/todo/:todoId', deleteTodo)


module.exports = router;