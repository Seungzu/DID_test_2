const express = require('express')
const router = express.Router();
const controller = require('../controller/user.controller')

router.post('/regist',controller.regist)
router.post('/login', controller.login)
router.post('/checkToken',controller.checkToken)
router.post('/pwCheck', controller.PwCheck)
router.post('/getUserInfo', controller.getUserInfo)
router.post('/withdrawUser', controller.withdrawUser)

router.post('/viewAppList',controller.viewAppList)

module.exports = router