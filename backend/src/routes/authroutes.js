import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authcontroller.js";
import { validate } from "../middleware/validationmiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  validate,
  register
);

router.post("/login", login);

export default router;