import express, { json } from "express";
import { moviesRoutes } from "./routes/routes";
import { handleErrors } from "./error";

const app = express();

app.use(json());

app.use("/movies", moviesRoutes);

app.use(handleErrors);

export default app;