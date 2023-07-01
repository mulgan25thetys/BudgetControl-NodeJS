const express = require('express')
const router = express.Router()

router.get('/:id', require('../controllers/capitalController/findOne'))

router.get('/', require('../controllers/capitalController/findAll') )

module.exports = router