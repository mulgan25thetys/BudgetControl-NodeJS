const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Load app configuration & routes
require('./src/config/database/database');

app.get('/', (req, res) => {
    res.status(200).send(`Welcome on ${process.env.SYSTEM_NAME} api!`)
})

app.use('', (req, res) => {
    res.status(404).send('Sorry, the page that your are looking for is not found!')
})

app.listen(parseInt(process.env.PORT) || 8088, () => {
    console.log(`${process.env.SYSTEM_NAME} app is running on ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`);
})