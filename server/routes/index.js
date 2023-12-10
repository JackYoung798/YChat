const express = require('express');
const router = express.Router(); // 注册路由 
const userRouter = require('./user'); // 引入user路由模块

router.use('/user', userRouter); // 注入用户路由模块

module.exports = router;