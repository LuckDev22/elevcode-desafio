import express, { Application, json } from "express";
import { moviesRoutes } from "./routes/movies.routes";
import { handleErrors } from "./error";
import { loginRoutes } from "./routes/login.routes";
import { userRoutes } from "./routes/createUser.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app: Application = express();

app.use(json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/movies", moviesRoutes);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(handleErrors);

export default app;
