const express = require('express')
const CrudController = require('../controller/CrudController')
const routes2 = express.Router()

routes2.get('/produtos', CrudController.index)
routes2.post('/cadastra/produtos',CrudController.cadastrarNovoProduto)
routes2.delete('/cadastra/produtos/:id',CrudController.deletarProduto)
routes2.put('/cadastra/atualizar/:id',CrudController.atualizarProduto)

module.exports = routes2