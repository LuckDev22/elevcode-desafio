import { Request, Response } from "express";
import { createLoginService } from "../services/createLogin.service";
import { TLoginReq } from "../interfaces/login.interfaces";

export const createLoginController = async (
    req: Request,
    resp: Response
): Promise<Response> => {
    const loginData: TLoginReq = req.body;
    const loginResponse = await createLoginService(loginData);
    console.log(loginData);
    return resp.json(loginResponse);
};
