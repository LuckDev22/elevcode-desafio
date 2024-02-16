import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";


export const token: Router = Router();

token.post("", verifyToken);
