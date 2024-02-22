import mongoose, { Document, Schema } from "mongoose";
import { ILogin } from "./login.model";

export interface IMovie extends Document {
    imdbID: string;
    title: string;
    year: string;
    type: string;
    poster: string;
    createdBy: string | ILogin;
}

const movieSchema = new mongoose.Schema({
    imdbID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    year: { type: String, required: true },
    type: { type: String, required: true },
    poster: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Login", required: true },
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
