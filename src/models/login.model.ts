import mongoose, { Document } from "mongoose";
export interface ILogin extends Document {
    email: string;
    password: string;
    favorites: string[];
}

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: String, ref: "Movie" }],
});

const Login = mongoose.model<ILogin>("Login", loginSchema);

export default Login;
