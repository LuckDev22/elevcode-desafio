import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { AppError } from "../error";

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY || "";

export const getRandomMovieService = async (req: Request, resp: Response) => {
    try {
        const randomImdbId =
            "tt" + (Math.floor(Math.random() * 1000000) + 1000000);

        const response = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${randomImdbId}`
        );
        if (response.data.Response == "True") {
            return response.data;
        } else {
            getRandomMovieService(req, resp);
        }
    } catch (error) {
        throw new AppError("Erro ao buscar filme aleatório", 401);
    }
};
