import axios from "axios";
import { AppError } from "../error";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY || "";

export const addFavoriteMovieService = async (
    imdbID: number,
    req: Request,
    res: Response
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log(req.body);
        if (!token) {
            return res.status(401).json({
                sucesso: false,
                mensagem: "Token não fornecido",
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
            email: string;
        };
        const userId = decodedToken.id;

        const omdbApiResponse = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`
        );

    } catch (error) {
        throw new AppError("Erro ao adicionar filme aos favoritos", 500);
    }
};
