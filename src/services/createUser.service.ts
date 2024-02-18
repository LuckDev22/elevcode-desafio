import Login, { ILogin } from "../models/login";
import bcrypt from "bcrypt";

export const createUserService = async (userData: ILogin): Promise<ILogin> => {
    try {
        const existingUser = await Login.findOne({ email: userData.email });

        if (existingUser) {
            throw new Error("E-mail já registrado");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const newUser = await Login.create({
            email: userData.email,
            password: hashedPassword,
        });

        return newUser;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Erro ao criar usuário");
    }
};
