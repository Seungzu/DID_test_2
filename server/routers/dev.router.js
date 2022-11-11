const express = require('express')
const router = express.Router();
const controller = require('../controller/dev.controller')

router.post('/addApp',controller.addApp)

module.exports = router