import { z } from "zod";
import mongoose, { Document, Schema } from "mongoose";

const loginSchema = z.object({
    id: z.number().optional(),
    email: z.string().email(),
    password: z.string().min(4),
});

interface LoginModel extends Document {
    id?: number;
    email: string;
    password: string;
}

const LoginSchema = new Schema<LoginModel>({
    id: { type: Number, optional: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const Login = mongoose.model<LoginModel>("Login", LoginSchema);

export { loginSchema, Login };
