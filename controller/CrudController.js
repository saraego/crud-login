require('dotenv').config()
const { Produtos } = require('../models')

class CrudController {
    static async index(req, res) {
        const prod = await Produtos.findAll()
        res.status(200).json({
            produtos: prod
        })
    }
    static async cadastrarNovoProduto(req, res) {
        const { nome_produto, preco_produto, quantidade_produto } = req.body
        if (!nome_produto) {
            return res.status(422).json({ msg: "Nome do produto" })
        }
        if (!preco_produto) {
            return res.status(422).json({ msg: "Preco do produto" })
        }
        if (!quantidade_produto) {
            return res.status(422).json({ msg: "Quantidade do produto" })
        }



        try {
            const prod = await Produtos.create({
                nome_produto,
                preco_produto,
                quantidade_produto
            })

            res.status(200).json({
                Esotque: "cadastrado no estoque",
                produtos: prod
            })
        } catch (error) {

        }

    }

    static async atualizarProduto(req, res) {
        const { nome_produto, preco_produto, quantidade_produto } = req.body
        if (!nome_produto) {
            return res.status(422).json({ msg: "Nome do produto" })
        }
        if (!preco_produto) {
            return res.status(422).json({ msg: "Preco do produto" })
        }
        if (!quantidade_produto) {
            return res.status(422).json({ msg: "Quantidade do produto" })
        }

        try {

            const prod = await Produtos.findByPk(req.params.id)

            prod.update({
                nome_produto: req.body.nome_produto,
                preco_produto: req.body.preco_produto,
                quantidade_produto: req.body.quantidade_produto
            })

            res.status(200).json(prod)
        } catch (error) {

        }
    }

    static async deletarProduto(req, res) {
        const prod = await Produtos.findByPk(req.params.id)

        await prod.destroy()

        res.status(200).json({ msg: "produto deletado" })
    }
}

module.exports = CrudController

