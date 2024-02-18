import jwt from "jsonwebtoken";
import "dotenv/config";
import { TLoginReq } from "../interfaces/login.interfaces";
import Login from "../models/login";
import bcrypt from "bcrypt";

export interface IloginResponse {
    token: string;
    client: any;
}

export const createLoginService = async (
    loginData: TLoginReq
): Promise<IloginResponse> => {
    try {
        const client = await Login.findOne({ email: loginData.email });

        if (!client) {
            throw new Error("Invalid credentials");
        }

        const validPassword = await bcrypt.compare(
            loginData.password,
            client.password
        );

        if (!validPassword) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            {
                id: client._id,
            },
            process.env.SECRET_KEY!,
            {
                expiresIn: "1d",
                subject: client._id.toString(),
            }
        );

        const loginResponse: IloginResponse = {
            token,
            client,
        };

        return loginResponse;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao criar o login");
    }
};
