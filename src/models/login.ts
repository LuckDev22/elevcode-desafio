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
        console.log("Senha antes do hashing:", this.password);
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        console.log(this.password);
        this.password = hashedPassword;
        console.log("Senha após o hashing:", this.password);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

const Login = mongoose.model<ILogin>("Login", loginSchema);

export default Login;
