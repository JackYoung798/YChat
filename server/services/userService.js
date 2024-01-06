const { querySql, queryOne } = require('../utils/sql');
const jwt = require('jsonwebtoken');
const { 
    CODE_SUCCESS, 
    CODE_ERROR,
} = require('../utils/code');

const PRIVATE_KEY = 'jack'//自定义密钥
const JWT_EXPIRE = 60*60*24//密钥过期时间

//注册
const reg = (req,res,next) => {
  let { username,password } = req.body
  findUser(username).then(user => {
    if(user){
      res.json({
        code: CODE_ERROR,
        msg: '用户已存在',
        data: null
      })
    } else {
      const query = `insert into user(username, password) values('${username}', '${password}')`
      querySql(query).then(result => {
        if(!result || result.length === 0){
          res.json({
            code: CODE_ERROR,
            msg: '注册失败',
            data: null
          })
        } else {
          res.json({
            code: CODE_SUCCESS,
            msg: '注册成功',
            data: null
          })
        }
      })
    }
  })
}

//登录
const log = (req,res,next) => {
  let { username ,password } = req.body
  findUser(username).then(result => {
    if(!result || result.length === 0){
      res.json({
        code: CODE_ERROR,
        msg: '用户不存在',
        data: null
      })
    } else {
      const query = `select * from user where username='${username}'`;
      querySql(query).then(user => {
        if(user[0].password != password){
          res.json({
            code: CODE_ERROR,
            msg: '密码错误',
            data: null
          })
        } else {
          if(user[0].status == 1) {
            res.json({
              code: CODE_ERROR,
              msg: '用户已在别处登录',
              data: null
            })
          } else {
            //登录成功，签发token      
            const change = `update user set status = 1 where username='${username}'`;
            querySql(change)          
            const token = jwt.sign(
              { username },
              PRIVATE_KEY,
              { expiresIn: JWT_EXPIRE}
            )
            const userData = {
              userid: user[0].userid,
              username: user[0].username,
              nickname: user[0].nickname,
              sign: user[0].sign,
              avatar: user[0].avatar,
              // status: user[0].status
            }
            res.json({
              code: CODE_SUCCESS,
              msg: '登录成功',
              data: {
                token,
                userData
              }
            })
          }
        }
      })
    }
  })
} 

//获取好友列表
const getFriend = ( req,res,next ) => {
  let { userid } = req.body
  query = `select avatar,username,sign,status,userid from user where userid in (select user2id from friend where user1id = '${userid}')`
  querySql(query).then(data => {
    res.json({
      code: CODE_SUCCESS,
      msg: null,
      data: data
    })
  })
}

//退出登录
const exit = (req,res,next) => {
  let { userid } = req.body
  query = `update user set status = 0 where userid='${userid}'`
  querySql(query).then(
    res.json({
      code: CODE_SUCCESS,
      msg: null,
      data: null
    })
  )
}

//修改资料
const update = ( req,res,next ) => {
    let { username,nickname,sign } = req.body
    const query = `update user set nickname='${nickname}',sign='${sign}' where username='${username}'`
    querySql(query).then(data => {
        const queryUser = `select * from user where username='${username}'`
        querySql(queryUser).then(user => {
            let userData = {
                userid: user[0].userid,
                username: user[0].username,
                nickname: user[0].nickname,
                sign: user[0].sign,
                avatar: user[0].avatar,
            };
            res.json({
                code: CODE_SUCCESS,
                msg: '修改成功',
                data: { userData }
            })
        })
    })
}

//修改头像
const avatar = ( req,res,next ) => {
    let { username,avatar } = req.body
    const query = `update user set avatar='${avatar}' where username='${username}'`
    querySql(query).then(data => {
        res.json({
            code: CODE_SUCCESS,
            msg: '修改成功',
            data: null
        })
    })
}


// 通过用户名查询用户信息
const findUser = (username) => {
    const query = `select username from user where username='${username}'`;
    return queryOne(query)
}

module.exports = {
    reg,
    log,
    exit,
    update,
    avatar,
    getFriend
}