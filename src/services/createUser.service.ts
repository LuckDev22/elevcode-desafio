import { AppError } from "../error";
import Login, { ILogin } from "../models/login.model";
import bcrypt from "bcrypt";

export const createUserService = async (userData: ILogin): Promise<ILogin> => {
    try {
        const existingUser = await Login.findOne({ email: userData.email });

        if (existingUser) {
            throw new AppError("E-mail já registrado", 401);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedPassword;

        const newUser = await Login.create({
            email: userData.email,
            password: userData.password,
        });

        return newUser;
    } catch (error) {
        throw new AppError("Erro ao criar usuário", 401);
    }
};
