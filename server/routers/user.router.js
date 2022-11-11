const express = require('express')
const router = express.Router();
const controller = require('../controller/user.controller')

router.post('/regist',controller.regist)
router.post('/login', controller.login)
router.post('/checkToken',controller.checkToken)
router.post('/pwCheck', controller.PwCheck)
router.post('/getUserInfo', controller.getUserInfo)
router.post('/withdrawUser', controller.withdrawUser)

module.exports = router

// 그떄 너가 핵아톰 컨퍼런스 와보라해서 갔었는데 커뮤니티형성 너무좋고 네트워킹 너무 좋았음
// 근데 거기서 말하는 내용들을 내가 아무것도모르니까 그부분은 좀 사실 시간아까웠음
// 아 내가 코스모스를 어느정도 ( 조금이라도 ) 알고 있었으면 정말 좋은 시간이었겠다 라는 생각을함
// 자바스크립트 컨퍼런스를 간적이 있었는데 내가 아는 내용이고 거기에 심화된 내용들을 하니까 좀 재밌었음.
// 물론 거기서 정말 기본부터 알려준다고는 하지만
// 알다싶히 내가 운영체제, 컴구조 같은 그런 기본적인 컴터지식이 없어서 더 힘들것 같긴함
// 어떻게 생각함
// 라디우스쪽 이력서는 준비중임