import { Request, Response } from "express";
import { addFavoriteMovieService } from "../services/favoriteMovies.service";
import { AppError } from "../error";

export const addFavoriteMovieController = async (
    req: Request,
    resp: Response
) => {
    const { imdbID } = req.body;

    const { savedMovie, user }: any = await addFavoriteMovieService(
        imdbID,
        req,
        resp
    );

    return resp.status(201).json({
        sucesso: true,
        mensagem: "Filme adicionado aos favoritos com sucesso",
        movie: savedMovie,
        user,
    });
};
