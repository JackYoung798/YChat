const { querySql, queryOne } = require('../utils/sql');
const jwt = require('jsonwebtoken');
const { 
    CODE_SUCCESS, 
    CODE_ERROR,
} = require('../utils/code');

const PRIVATE_KEY = 'jack'//自定义密钥
const JWT_EXPIRE = 60*60*24//密钥过期时间

//获取好友列表
const getContact = ( req,res,next ) => {
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

//搜索好友
const searchContact = ( req,res,next ) => {
  let { username } = req.body
  findUser(username).then(user => {
    if(user){
      res.json({
        code: CODE_SUCCESS,
        msg: '查找成功',
        data: user
      })
    } else {
      res.json({
        code: CODE_SUCCESS,
        msg: '查无此人',
        data: null
      })
    }

  })
}
//
const isFriend = (req,res,next) => {
  let { userid,searchid } = req.body
  console.log(userid);
  query = `select * from friend where user1id=${userid} and user2id=${searchid}`
  querySql(query).then(data => {
    if(data.length != 0){
      res.json({
        code: CODE_SUCCESS,
        msg: null,
        data: 1
      })
    } else {
      res.json({
        code: CODE_SUCCESS,
        msg: null,
        data: 0
      })
    }
  })
}

// 通过用户名查询用户信息
const findUser = (username) => {
  const query = `select username,userid,avatar,sign,status from user where username='${username}'`;
  return queryOne(query)
}

module.exports = {
  getContact,
  searchContact,
  isFriend
}