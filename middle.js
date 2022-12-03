require('dotenv').config()
const jwt = require('jsonwebtoken')


const verificarToken = (req,res,next) =>{
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]

    if(!token){
        return res.status(401).json({msg:"Acesso negado!"})
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token,secret)

        next()
    } catch (error) {
        res.status(400).json({msg:"token invalido"})
    }
}

module.exports = verificarToken