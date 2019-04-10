import axios from 'axios'
//获取简历信息
export const Resumeinfor = () => {
  return axios({
    method: 'post',
    url: '/api/first/resumeinfor'
  })
}
//增加公司信息
export const Addinfor = () => {
  return axios({
    method: 'post',
    url: '/api/company/addinfor'
  })
}