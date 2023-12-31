const express = require('express')
const router = express.Router()

router.get('/reports', require('../controllers/capitalController/getReportFile'))

router.get('/wealth', require('../controllers/capitalController/getWealth'))

router.get('/:id', require('../controllers/capitalController/findOne'))

router.get('/', require('../controllers/capitalController/findAll') )

module.exports = router