import { Router } from "express";
import { TaskCollection } from "./collection";

const tasksRouter = Router();
const taskscollection = new TaskCollection();

tasksRouter.post("/create",taskscollection.CreateTask);
tasksRouter.get("/all",taskscollection.GetAll);
tasksRouter.get("/:id",taskscollection.GetById);
tasksRouter.delete("/delete/:id",taskscollection.Delete);
tasksRouter.put("/update/:id",taskscollection.Update);

export default tasksRouter;