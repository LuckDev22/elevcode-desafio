import { Request, Response } from "express";
import { createLoginService } from "../services/createLogin.service";

export const createLoginController = async (
    req: Request,
    resp: Response
): Promise<Response> => {
    const loginData = req.body;
    const loginResponse = await createLoginService(loginData);
    return resp.json(loginResponse);
};
