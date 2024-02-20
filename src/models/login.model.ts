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

const Login = mongoose.model<ILogin>("Login", loginSchema);

export default Login;
