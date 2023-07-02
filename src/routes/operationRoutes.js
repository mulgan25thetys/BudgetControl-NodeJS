const express = require('express')
const router = express.Router()

router.post('/', require('../controllers/operationController/add'))

router.delete('/:id', require('../controllers/operationController/delete'))

router.get('/:id', require('../controllers/operationController/findOne'))

router.post('/files/:opid', require('../controllers/filesController/add'))

router.delete('/files/:fileid', require('../controllers/filesController/delete'))

module.exports = router