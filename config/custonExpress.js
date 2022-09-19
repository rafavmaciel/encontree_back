
const consign = require('consign')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = () => {
    const app = express()
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    app.use(bodyParser.json())


    consign()
        .include('controllers')
        .into(app)


    return app

}

