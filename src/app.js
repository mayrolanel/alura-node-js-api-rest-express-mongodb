import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await dbConnect()
conexao.on("error", (erro)=> {
    console.error("Erro de conexão! ", erro)
})

conexao.once("open", () => {
    console.log("Conexão com o banco realizada com sucesso!")
})

const app = express();
routes(app)

export default app;