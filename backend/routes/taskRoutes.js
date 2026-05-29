const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// GET toutes les tâches
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST créer une tâche
router.post("/", async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// PUT terminer / défaire une tâche
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        task.completed = !task.completed;

        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Tâche supprimée" });
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;