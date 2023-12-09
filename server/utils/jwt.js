const jwt = require('jsonwebtoken'); // 引入验证jsonwebtoken模块
const expressJwt = require('express-jwt'); // 引入express-jwt模块

// 验证token是否过期
const jwtAuth = expressJwt({
  // 设置密钥
  secret: PRIVATE_KEY,
  // 设置为true表示校验，false表示不校验
  credentialsRequired: true,
  // 自定义获取token的函数
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization
    } else if (req.query && req.query.token) {
      return req.query.token
    }
  }
  // 设置jwt认证白名单
}).unless({
  path: [
    '/',
    '/user/login',
    '/user/register'
  ]
})

// jwt-token解析
function decode(req) {
  const token = req.get('Authorization')

  if(token.indexOf('Bearer') >= 0){
    token = token.replace('Bearer','')
  }

  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
  jwtAuth,
  decode
}
