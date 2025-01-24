const express = require("express");
const router = express.Router();
const Task = require("../Models/tasks");

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, status} = req.body;
    if (!title || !description || !status) {
      return res.status(400).json({error: "All fields (title, description, status) are required"})
    }
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.put("/:id", async (req, res) =>  {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ error: "Task ID is required" });
      }

      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

      if (!updatedTask) {
          return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(updatedTask);
  } catch (error) {
      res.status(500).json({ error: "Failed to update task", details: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
