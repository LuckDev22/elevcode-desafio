import { Request, Response } from "express";
import { createLoginService } from "../services/createLogin.service";
import { TLoginReq } from "../interfaces/login.interfaces";

export const createLoginController = async (
    req: Request,
    res: Response
): Promise<Response> => {
        const loginData: TLoginReq = req.body;
        const loginResponse = await createLoginService(loginData);

        return res.json(loginResponse);
};
