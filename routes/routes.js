const express = require('express')
const AuthController = require('../controller/AuthController')
const routes = express.Router()

routes.post('/registro',AuthController.register)
routes.post('/login',AuthController.login)

module.exports = routes