import axios from 'axios'
//获取企业信息
export const Searchcompany = params => {
  return axios({
    method: 'post',
    url: '/api/company/list'
  })
}
//获取企业详情信息
export const Companydetail = params => {
  return axios({
    method: 'post',
    url: '/api/company/detail',
    dataType:'json',
    data:params

  })
}