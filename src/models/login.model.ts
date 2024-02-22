import mongoose, { Document, Schema } from "mongoose";
import { IMovie } from "./movie.model";
export interface ILogin extends Document {
    email: string;
    password: string;
    favorites: Array<Schema.Types.ObjectId | IMovie>;
}

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

const Login = mongoose.model<ILogin>("Login", loginSchema);

export default Login;
