const express = require('express');
const router = express.Router();
const service = require('../../services/funtionService');

//  获取好友列表
router.post('/getContact', service.getContact)
//  查找好友
router.post('/searchContact', service.searchContact)
//  判断是否为好友
router.post('/isFriend',service.isFriend)

module.exports = router;
