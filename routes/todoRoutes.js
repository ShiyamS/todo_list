const express = require('express');
const routes = express.Router();
const todoController = require('../controller/todoController');

routes.post('/createTodo', todoController.createTodo);
routes.get('/getTodos', todoController.getTodos);
routes.put('/updateTodo/:id', todoController.updateTodo);
routes.delete('/deleteTodo/:id', todoController.deleteTodo);

module.exports = routes;
