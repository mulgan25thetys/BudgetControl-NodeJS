const express = require('express')
const router = express.Router()

router.post('/', require('../controllers/economyController/add'))

router.get('/:id', require('../controllers/economyController/findOne'))

router.get('/', require('../controllers/economyController/findAll'))

router.delete('/:id', require('../controllers/economyController/delete'))

router.put('/', require('../controllers/economyController/update'))

module.exports = router