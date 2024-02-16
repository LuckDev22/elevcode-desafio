import { Router } from "express";
import { createTokenController } from "../controllers/controllers";

const sessionRoutes = Router();

sessionRoutes.post("", createTokenController);

export { sessionRoutes };
