const express = require('express')
const router = express.Router()

router.post('/new', require('../controllers/deviseController/create'))

router.put('/:id', require('../controllers/deviseController/setDefault'))

router.delete('/:id', require('../controllers/deviseController/remove'))

router.get('/regions', require('../controllers/deviseController/findRegions'))

router.get('/default', require('../controllers/deviseController/findDefault'))

router.get('/:id', require('../controllers/deviseController/findOne'))

router.get('/', require('../controllers/deviseController/findAll') )

module.exports = router