import { Request, Response } from "express";
import { getMoviesService } from "../services/listMovies.service";

export const listMoviesController = async (
    req: Request,
    resp: Response
): Promise<Response> => {
    const movies = await getMoviesService(req, resp);
    return resp.status(200).json(movies);
};
