import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY || "";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const title = req.query.title as string;

        if (!title) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Parâmetro "title" ausente na solicitação.',
            });
        }

        const apiResponse = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`
        );
        const movies = apiResponse.data || [];
        res.json({ movies });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao pesquisar filmes por título",
        });
    }
};
