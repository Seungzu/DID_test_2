const express = require('express')
const router = express.Router();
const controller = require('../controller/dev.controller')

router.post('/addApp',controller.addApp)            
router.post('/viewAppList',controller.viewAppList)   
router.post('/viewAppInfo',controller.viewAppInfo)
router.post('/deleteApp', controller.deleteApp)       

module.exports = router