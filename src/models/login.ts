import mongoose, { Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

export interface ILogin extends Document {
    email: string;
    password: string;
}

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

loginSchema.pre<ILogin>("save", async function (next) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error as CallbackError);
    }
});

const Login = mongoose.model<ILogin>("Login", loginSchema);

export default Login;
