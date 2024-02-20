import { Router } from "express";
import { listMoviesController } from "../controllers/listMovies.constroller";
import { getRandomMovieController } from "../controllers/listRandomMovie.constroller";
import { verifyToken } from "../middleware/authMiddleware";

export const token: Router = Router();
export const moviesRoutes: Router = Router();


moviesRoutes.get("", listMoviesController);

moviesRoutes.get('/estoucomsorte',verifyToken, getRandomMovieController)
// moviesRoutes.post('/favorites', saveMovie);

