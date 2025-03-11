const toDoModel = require('../models/toDoListModel');

// Create To-Do List
const createToDoList = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ message: `Please fill the text field` });
        }

        const response = await toDoModel.create({
            text: req.body.text,
            user: req.user.id 
        });

        res.status(201).json(response);
    } catch (error) {
        console.error("Error creating to-do list:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get To-Do List (Only User's Own Data)
const getList = async (req, res) => {
    try {
        const response = await toDoModel.find({ user: req.user.id }); 

        if (!response || response.length === 0) {
            return res.status(404).json({ message: 'No to-do items found for this user' });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching to-do list:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete To-Do List Item
const deleteList = async (req, res) => {
    try {
        const list = await toDoModel.findById(req.params.id);

        if (!list) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Ensure the user can only delete their own to-do items
        if (list.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this item" });
        }

        await list.deleteOne();
        res.status(200).json({ message: `Goal with ID ${req.params.id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting to-do item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Mark To-Do as Done
const markAsDone = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await toDoModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure the user can only mark their own tasks as done
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to mark this task as done" });
        }

        task.completed = true; // Mark as done
        await task.save();

        res.status(200).json({ message: "Task marked as done", task });
    } catch (error) {
        console.error("Error marking task as done:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Completed Tasks
const getCompletedTasks = async (req, res) => {
    try {
        const completedTasks = await toDoModel.find({ user: req.user.id, completed: true });

        if (!completedTasks || completedTasks.length === 0) {
            return res.status(404).json({ message: 'No completed tasks found' });
        }

        res.status(200).json(completedTasks);
    } catch (error) {
        console.error("Error fetching completed tasks:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createToDoList,
    getList,
    deleteList,
    markAsDone,
    getCompletedTasks
};
