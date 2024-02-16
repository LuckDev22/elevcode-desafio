const axios = require("axios");
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY || "";

export async function getMovies(req: Request, res: Response) {
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
        const filmes = apiResponse.data.Search || [];

        res.json({ sucesso: true, filmes });
    } catch (error) {
        console.error("Erro ao pesquisar filmes por título:", error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao pesquisar filmes por título",
        });
    }
}
