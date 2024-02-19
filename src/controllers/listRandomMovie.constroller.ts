import { Request, Response } from "express";
import { getRandomMovie } from "../services/listRandomMovie.service";

export const getRandomMovieController = async (
    req: Request,
    resp: Response
): Promise<Response> => {
    const movie = await getRandomMovie(req, resp);
    return resp.status(200).json(movie);
};
