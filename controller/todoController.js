const TodoList = require('../models/todoList');

class Todo {


  // create a new todo item
  async createTodo(req, res) {
    try {
      const todo = new TodoList(req.body);
      await todo.save();
      res.status(201).json(todo);
    }
    catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getTodos(req, res) {
    try {
      const todos = await TodoList.find();
      res.status(200).json(todos);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateTodo(req, res) {
    try {
      console.log(req);
      const todo = await TodoList.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!todo) return res.status(404).json({ message: 'Todo not found' });

      res.status(200).json(todo);
    }
    catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteTodo(req, res) {
    try {
      const todo = await TodoList.findByIdAndDelete(req.params.id);
      if (!todo) return res.status(404).json({ message: 'Todo not found' });

      res.status(200).json(todo);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = new Todo();
