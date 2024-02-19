import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY || "";

export const getRandomMovie = async (req: Request, resp: Response) => {
    try {
        const randomImdbId =
            "tt" + (Math.floor(Math.random() * 1000000) + 1000000);
        console.log(randomImdbId);
        const response = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${randomImdbId}`
        );
        console.log(response.data);
        if (response.data.Response == "True") {
            return response.data;
        } else {
            getRandomMovie(req, resp);
        }
    } catch (error) {
        throw new Error("Erro ao buscar filme aleatório");
    }
};
