const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// GET - Hämta alla Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta todos' });
  }
});

// POST - Skapa en ny Todo
router.post('/', async (req, res) => {
  const { title, completed } = req.body

  try {
    const newTodo = new Todo({ title, completed })
    const todo = await newTodo.save()
    res.status(201).json(todo)  
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
});

// PUT - Uppdatera en Todo
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    )
    res.status(200).json(updatedTodo)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
});






// DELETE - Ta bort en Todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id)
    res.status(200).json(deletedTodo)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
});

module.exports = router;


