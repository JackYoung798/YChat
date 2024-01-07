const express = require('express');
const router = express.Router();
const service = require('../../services/funtionService');

//  获取好友列表
router.post('/getContact', service.getContact)
//  查找好友
router.post('/searchContact', service.searchContact)

module.exports = router;
