require('dotenv').config() // * Use dotenv

// * Initialize Express
const express = require('express')
const app = express()
const PORT = +process.env.PORT

// * Require cors
const cors = require('cors')

// * Require Router
const router = require('./routes/')

// * Require Error Handler
const errorhandler = require('./middlewares/errorhandler')

// * Use Middleware + Cors
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// * Use The Router
app.use(router)

// * Use Error Handler
app.use(errorhandler)

// * Start The App
app.listen(PORT, () => {
    console.log(`Server Listening on http://127.0.0.1:${PORT}`) // ! Change
})