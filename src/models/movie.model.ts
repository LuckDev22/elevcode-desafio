import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    imdbID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    additionalInfo: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
