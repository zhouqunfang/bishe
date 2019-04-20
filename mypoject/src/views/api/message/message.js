import axios from 'axios'
//获取用户信息
export const SetUserInfo = (params) => {
  return axios({
    method: 'post',
    url: '/api/chat/userInfo',
    dataType: 'json',
    data: params
  })
}
// 聊天对象信息
export const TouserInfo = params=> {
  return axios({
    method: 'post',
    url: '/api/chat/touserInfo',
    dataType: 'json',
    data: params
  })
}
//聊天双方信息
export const ChatWith= params => {
  return axios({
    method: 'post',
    url: '/api/chat/chatwith',
    dataType: 'json',
    data: params
  })
}
//个人消息接收
export const getMessage = params => {
  return axios({
    method: 'post',
    url: '/api/message/getmessage',
    dataType: 'json',
    data: params
  })
}
//个人消息删除
export const  deleteMsg = params => {
  return axios({
    method: 'post',
    url: '/api/message/deletemsg',
    dataType: 'json',
    data: params
  })
}