import Login from "../models/login.model";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { TLoginReq } from "../interfaces/login.interfaces";
import { AppError } from "../error";
import "dotenv/config";

export interface IloginResponse {
    token: string;
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

        const validPassword = await compare(loginData.password, user.password);

        if (!validPassword) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
                subject: user._id.toString(),
            }
        );

        const loginResponse: IloginResponse = {
            token,
        };
        return loginResponse;
    } catch (error) {
        throw new AppError("Erro ao autenticar", 500);
    }
};
