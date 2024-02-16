import express from "express";
import dotenv from "dotenv";
import { moviesRoutes } from "./routes/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/movies", moviesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
