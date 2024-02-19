import { Router } from "express";
import { listMoviesController } from "../controllers/listMovies.constroller";
import { getRandomMovieController } from "../controllers/listRandomMovie.constroller";

export const token: Router = Router();
export const moviesRoutes: Router = Router();


moviesRoutes.get("", listMoviesController);

moviesRoutes.get('/estoucomsorte',getRandomMovieController)
// moviesRoutes.post('/favorites', saveMovie);

