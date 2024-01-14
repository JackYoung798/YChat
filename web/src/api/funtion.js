import request from '@/utils/request'

//获取通讯录列表
export const contactListService = userid =>
  request.post('/funtion/getContact', { userid })
//查找用户
export const searchContactService = username => 
  request.post('/funtion/searchContact', { username })
//判断是否为好友
export const isFriend = ( userid,searchid ) => 
  request.post('/funtion/isFriend', { userid,searchid})