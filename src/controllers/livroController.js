import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros(req, res) {

        try{
            const listaLivros = await livro.find({})
            res.status(200).json(listaLivros)
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha ao listar livro!`})
        }
        
    }

    static async listarLivroPorId(req, res) {

        try{
            const id = req.params.id
            const livroEncontrado = await livro.findById(id)
            res.status(200).json(livroEncontrado)
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha ao listar livro!`})
        }
        
    }

    static async buscarLivrosPorEditora(req, res){
        const editora = req.query.editora;
        try{
            const livroPorEditora = await livro.find({ editora })
            res.status(200).json(livroPorEditora);
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha ao buscar livro por editora!`})
        }
    }

    static async cadastrarLivro(req, res){
        const novoLivro = req.body;
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor)
            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc} }
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).send({ 
                message: "livro criado com sucesso!",
                livro: livroCriado
            })
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro!`})
        }
    }

    static async atualizarLivro(req, res){
        try{
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body)
            res.status(201).send({ 
                message: "livro atualizado com sucesso!"
            })
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha ao atualizar livro!`})
        }
    }

    static async excluirLivro(req, res){
        try{
            const id = req.params.id
            await livro.findByIdAndDelete(id)
            res.status(201).send({ 
                message: "livro excluido com sucesso!"
            })
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - falha ao excluir livro!`})
        }
    }
}

export default LivroController

