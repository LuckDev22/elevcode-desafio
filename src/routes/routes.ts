import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { listMoviesController } from "../controllers/listMovies.constroller";

export const token: Router = Router();
export const moviesRoutes: Router = Router();

token.post("", verifyToken);

moviesRoutes.get("", listMoviesController);

moviesRoutes.patch("");

moviesRoutes.delete("");
