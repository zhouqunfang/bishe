import axios from 'axios'
//获取简历信息
export const Resumeinfor = () => {
  return axios({
    method: 'post',
    url: '/api/first/resumeinfor'
  })
}
//增加公司信息
export const Addinfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/company/addinfor',
    data:params,
    dataType:'json'
  })
}
//获取公司信息
export const Getinfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/company/getinfor',
    data:params,
    dataType:'json'
  })
}
//更新公司信息
export const Updateinfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/company/updateinfor',
    data:params,
    dataType:'json'
  })
}