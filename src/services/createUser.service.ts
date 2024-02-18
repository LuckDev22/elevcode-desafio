import Login, { ILogin } from "../models/login";

export const createUserService = async (userData: ILogin): Promise<ILogin> => {
    try {
        const existingUser = await Login.findOne({ email: userData.email });

        if (existingUser) {
            throw new Error("E-mail já registrado");
        }

        const newUser = await Login.create({
            email: userData.email,
            password: userData.password,
        });

        return newUser;
    } catch (error) {
        throw new Error("Erro ao criar usuário");
    }
};
