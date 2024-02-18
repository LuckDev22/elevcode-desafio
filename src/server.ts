import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB;

if (!mongoURI) {
    console.error("A variável de ambiente MONGODB não está definida.");
    process.exit(1);
}

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Erro na conexão com o MongoDB:", err);
});

db.once("open", () => {
    console.log("Conexão bem-sucedida com o MongoDB");

    app.listen(PORT, () => {
        console.log(`Servidor está rodando em http://localhost:${PORT}`);
    });
});
