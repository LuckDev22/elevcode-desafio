import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return resp
            .status(401)
            .json({ sucesso: false, mensagem: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");

        next();
    } catch (error) {
        console.error("Erro ao verificar token:", error);
        return resp
            .status(403)
            .json({ sucesso: false, mensagem: "Token inválido" });
    }
};
