const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const fileUpload = require('express-fileupload')

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('assets'))
// enable files upload
app.use(fileUpload({
  createParentPath: true
}))
app.use(favicon(path.resolve(__dirname, './assets/favicon.ico')))
//Load app configuration & routes
require('./src/config/database/database');

app.get('/', (req, res) => {
    res.status(200).send(`Welcome on ${process.env.SYSTEM_NAME} api!`)
})

app.get('/system', (req, res) => {
    const system_infos = { name: process.env.SYSTEM_NAME.toString() }
    return res.status(200).json({ message: 'System informations.', data: system_infos })
})

app.use('/api/devises',require('./src/routes/deviseRoutes'))
app.use('/api/capitals', require('./src/routes/capitalRoutes'))
app.use('/api/operations', require('./src/routes/operationRoutes'))

app.use('', (req, res) => {
    res.status(404).send('Sorry, the page that your are looking for is not found!')
})

app.listen(parseInt(process.env.PORT) || 8088, () => {
    console.log(`${process.env.SYSTEM_NAME} app is running on ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`);
})