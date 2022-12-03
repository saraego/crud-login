require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/routes')
const routes2 = require('./routes/routes2')
const middleNext = require('./middle')
app.use(express.json())
app.use(routes, middleNext,routes2)

app.listen(process.env.PORT,()=>{
    console.log("Servidor ligado 🚀");
})