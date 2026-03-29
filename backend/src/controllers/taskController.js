import Task from "../models/Task.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user.id,
  });

  res.status(201).json(task);
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id });
  res.json(tasks);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (task.createdBy.toString() !== req.user.id) {
    const error = new Error("Not allowed");
    error.statusCode = 403;
    throw error;
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  const updated = await task.save();

  res.json(updated);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    task.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    const error = new Error("Not allowed");
    error.statusCode = 403;
    throw error;
  }

  await task.deleteOne();

  res.json({ message: "Task deleted" });
});