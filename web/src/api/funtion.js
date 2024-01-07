import request from '@/utils/request'

//获取通讯录列表
export const contactListService = userid =>
  request.post('/funtion/getContact', { userid })
//查找用户
export const searchContactService = username => 
  request.post('/funtion/searchContact', { username })