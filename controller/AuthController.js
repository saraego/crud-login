require('dotenv').config()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {

    static async register(req, res) {
        const { nome, email, senha, repeti_senha } = req.body

        if (!nome) { res.status(422).json({ msg: "nome obrigatorio" }) }
        if (!email) { res.status(422).json({ msg: "email obrigatorio" }) }
        if (!senha) { res.status(422).json({ msg: "senha obrigatoria" }) }
        if (!repeti_senha) {
            res.status(422).json({ msg: "repeti senha obrigatorio" })
        } else if (senha !== repeti_senha) {
            return res.status(422).json({ msg: "senha não confere" })
        }

        const verificaEmail = await User.findOne({
            where: {
                email: email
            }
        })

        if (verificaEmail) { return res.status(422).json({ msg: "Porfavo, reutilizar outro email" }) }

        //criar senha 
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)


        //criar usuario no DB

        try {
            const newUser = await User.create({
                nome, email, senha: passwordHash
            })

            res.status(200).json({
                message: "Usuário criado",
                pessoas: newUser
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "error no servidor,tente novamente mais tarde" })
        }

    }

    static async login(req, res) {
        const { email, senha } = req.body
        if (!email) {
            res.status(422).json({ msg: "email obrigatorio" })
        } else {
            res.status(200)
        }

        if (!senha) {
            res.status(422).json({ msg: "senha obrigatoria" })
        } else {
            res.status(200)
        }

        //verifica se o usuario existe
        const usuario = await User.findOne({
            where: {
                email: email
            }
        })

        if (!usuario) {
            return res.status(404).json({ msg: "usuario nao encontrado" })
        }

        //verifica se a senha esta certa

        const checaSenha = await bcrypt.compare(senha, usuario.senha)
        if (!checaSenha) {
            return res.status(422).json({ msg: "senha invalida" })
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: usuario.id
            },
                secret,
            )

            res.status(200).json({
                msg: "Autenticação realizada com secesso",
                token: token
            }
            )
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "error no servidor, tente novamente mais tarde" })
        }



    }

}

module.exports = AuthController