import { Request, Response, NextFunction } from "express";
import { createUserService } from "../services/createUser.service";
import { ILogin } from "../models/login.model";

export const createUserController = async (
    req: Request,
    resp: Response,
    next: NextFunction
): Promise<Response> => {
    const userData = req.body;
    const newUser: ILogin = await createUserService(userData);
    return resp.status(201).json({ user: newUser });
};
