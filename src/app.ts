import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OMDB_API_KEY = process.env.OMDB_API_KEY || "";

app.get("/api/pesquisar-filmes", async (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
