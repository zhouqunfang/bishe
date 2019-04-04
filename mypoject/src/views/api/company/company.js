import axios from 'axios'
//获取用户信息
export const Searchcompany = () => {
  return axios({
    method: 'get',
    url: '/api/company/list'
  })
}