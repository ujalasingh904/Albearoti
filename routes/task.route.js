import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";



const router = Router();

router.get("/",protectRoute, getTasks);
router.post("/create",protectRoute, createTask);
router.put("/update/:id",protectRoute, updateTask);
router.delete("/delete/:id",protectRoute, deleteTask);

export default router;