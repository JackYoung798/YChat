const express = require('express');
const router = express.Router(); // 注册路由 
const userRouter = require('./user'); // 引入user路由模块
const service = require('../services/userService');

// 用户注册
router.post('/reg', service.reg);
// 用户登录
router.post('/log', service.log);
//退出登录
router.post('/exit',service.exit)
//基本资料修改
router.post('/update', service.update)
//头像修改
router.post('/avatar', service.avatar)

module.exports = router;






