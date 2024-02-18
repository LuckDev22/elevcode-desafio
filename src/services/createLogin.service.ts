import Login from "../models/login";
import { TLoginReq } from "../interfaces/login.interfaces";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import "dotenv/config";
import { AppError } from "../error";

export interface IloginResponse {
    token: string;
    user: any;
}

export const createLoginService = async (
    loginData: TLoginReq
): Promise<IloginResponse> => {
    try {
        const user = await Login.findOne({ email: loginData.email });

        console.log("Usuário encontrado:", user);
        
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        console.log("Senha fornecida:", loginData.password);
        console.log("Senha no banco de dados:", user.password);

        const validPassword = await compare(
            loginData.password,
            user.password
        );

        console.log("Senha válida:", validPassword);

        if (!validPassword) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
                subject: user._id.toString(),
            }
        );

        const loginResponse: IloginResponse = {
            token,
            user,
        };
        return loginResponse;
    } catch (error) {
        console.error("Erro ao autenticar:", error);
        throw new AppError("Erro ao autenticar", 500);
    }
};
