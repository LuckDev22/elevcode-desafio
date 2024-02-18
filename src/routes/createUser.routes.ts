import { Router } from "express";
import { createUserController } from "../controllers/createUser.controller";

export const userRoutes: Router = Router();

userRoutes.post("", createUserController);
