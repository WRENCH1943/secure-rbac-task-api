import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import { protect } from "./middleware/authmiddleware.js";
import { authorize } from "./middleware/rolemiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/api/v1/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

app.get("/api/v1/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;