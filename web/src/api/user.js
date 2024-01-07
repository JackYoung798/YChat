import request from '@/utils/request'

// 注册
export const userRegService = ({ username, password }) =>
  request.post('/user/reg', { username, password })
//登录
export const userLogService = ({ username, password }) =>
  request.post('/user/log', { username, password })
//退出登录
export const userExitService = userid => 
  request.post('/user/exit',  { userid })
//修改资料
export const userUpdateService = ({ username,nickname,sign }) =>
request.post('/user/update', { username,nickname,sign })
//修改头像
export const userUpdateAvatarService = ( username,avatar ) =>
request.post('/user/avatar', { username,avatar })