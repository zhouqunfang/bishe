// import { post } from "../../main";
import axios from 'axios'
// export const SignIn = {
//   sign (params){
//     return post('/api/user/sign',params);
//   }
// }
// export const SignIn = params => post('/api/user/sign', params)
// 登陆
export const SignIn = params => {
  return axios({
    method: 'post',
    url: '/api/user/sign',
    dataType: 'json',
    data: params
  })
}
// 首页职位数据
export const JobList = () => {
  return axios({
    method: 'get',
    url: '/api/index/job'
  })
}
// 首页新闻展示
export const NewList = () => {
  return axios({
    method: 'get',
    url: '/api/index/news'
  })
}

