import request from '@/utils/request'

// 注册
export const userRegService = ({ username, password }) =>
  request.post('/user/reg', { username, password })
//登录
export const userLogService = ({ username, password }) =>
  request.post('/user/log', { username, password })
  //退出登录
export const userExitService = username => 
  request.post('/user/exit',  { username })