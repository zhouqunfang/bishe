import axios from 'axios'
// 消息
export const ChatWith = params => {
  return axios({
    method: 'post',
    url: '/api/chat/chatwith',
    dataType: 'json',
    data: params
  })
}
