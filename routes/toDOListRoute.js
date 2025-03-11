const express = require('express');
const createList = require('../controllers/toDoListController');
const protected = require('../middleWares/authMiddleWare');

const router = express.Router();

// Create a To-Do List Item
router.post('/', protected, createList.createToDoList);

// Get All To-Do List Items
router.get('/', protected, createList.getList);

// Delete a To-Do List Item
router.delete('/:id', protected, createList.deleteList);

// Mark a To-Do List Item as Done
router.put('/done/:id', protected, createList.markAsDone);

// Get All Completed To-Do Items
router.get('/completed', protected, createList.getCompletedTasks);

module.exports = router;
