import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validationmiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Title is required"),
  ],
  validate,
  createTask
);
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;