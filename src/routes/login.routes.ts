import { Router } from "express";
import { createLoginController } from "../controllers/createLogin.controller";

export const loginRoutes: Router = Router();

loginRoutes.post(
    "",
    // checkedBodyIsValidMiddleware(loginSchemaReq),
    createLoginController
);
