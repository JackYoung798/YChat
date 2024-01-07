const express = require('express');
const router = express.Router(); // 注册路由 
// 引入user路由模块
const userRouter = require('./modules/user'); 
const funtionRouter = require('./modules/funtion')

// 注入用户路由模块
router.use('/user', userRouter); 
router.use('/funtion', funtionRouter)

module.exports = router;