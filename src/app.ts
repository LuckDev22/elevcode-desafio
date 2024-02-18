import express, { Application, json } from "express";
import { moviesRoutes} from "./routes/routes";
import { handleErrors } from "./error";
import { loginRoutes } from "./routes/login.routes";
import { userRoutes } from "./routes/createUser.routes";

const app: Application = express();

app.use(json());

app.use("/movies", moviesRoutes);
app.use("/login", loginRoutes);
app.use('/users', userRoutes);

app.use(handleErrors);

export default app;