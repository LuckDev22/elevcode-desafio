import { Request, Response } from "express";

export const createTokenController = async (req: Request, res: Response): Promise<Response> => {
    const token = await createTokenService(req.body);

    return res.json({ token });
};
