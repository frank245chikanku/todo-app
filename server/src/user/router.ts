import { Router } from "express";
import { UserCollection } from "./collection";

const userRouter = Router();
const usercollection = new UserCollection();

userRouter.post("/signup",usercollection.CreateUser);
userRouter.post("/signin",usercollection.Login)

export default userRouter;