import { Request, Response } from "express";
import { getMovies } from "../services/listMovies.service";

export const listMoviesControllerRandom = async (
    req: Request,
    resp: Response
): Promise<Response> => {
    const movies = await getMovies(req, resp);
    return resp.status(200).json(movies);
};
