const express = require('express')
require('./db/mongoose')
const coronaRouter = require('./routers/corona-route')
const { scheduler, initData } = require('./controller/data-controller')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(coronaRouter)

scheduler();
initData();

app.listen(port, () => {
    console.log('server is up on port: ' + port)
})