import { AppError } from "../error";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Movie, { IMovie } from "../models/movie.model";
import axios from "axios";
import Login from "../models/login.model";

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY ?? "";

export const addFavoriteMovieService = async (
    imdbID: string,
    req: Request,
    res: Response
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                sucesso: false,
                mensagem: "Token não fornecido",
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
        };
        const userId = decodedToken.id;

        const omdbApiResponse = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`
        );

        const { Title, Year, Type, Poster } = omdbApiResponse.data;

        const newMovie: IMovie = {
            imdbID,
            title: Title,
            year: Year,
            type: Type,
            poster: Poster,
            createdBy: userId,
        } as IMovie;

        const savedMovie = await Movie.create(newMovie);
        const user = await Login.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: savedMovie._id } },
            { new: true }
        );
        return { savedMovie, user };
    } catch (error) {
        console.error(error);
        throw new AppError("Erro ao adicionar filme aos favoritos", 500);
    }
};
