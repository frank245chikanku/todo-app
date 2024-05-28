import compression from "compression";
import cors from "cors";
import express,{ Application, Request, Response } from "express";
import morgan from "morgan";
import userRouter from "./user/router";
import tasksRouter from "./tasks/router";

const app:Application = express();
const port = 1000;

app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

app.use("/user",userRouter);
app.use("/tasks",tasksRouter);

app.get("/",(_req:Request,res:Response)=>{
    res.send("ToDo server is live");
});

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});