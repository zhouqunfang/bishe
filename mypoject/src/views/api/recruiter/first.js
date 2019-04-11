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
//公司发布职位信息
export const Addjob = (params) => {
  return axios({
    method: 'post',
    url: '/api/sendjob/addjob',
    data: params,
    dataType: 'json'
  })
}
//获取公司发布职位信息
export const Getjob = (params) => {
  return axios({
    method: 'post',
    url: '/api/sendjob/getjob',
    data: params,
    dataType: 'json'
  })
}
//删除公司发布职位信息
export const Deletejob = (params) => {
  return axios({
    method: 'post',
    url: '/api/sendjob/deletejob',
    data: params,
    dataType: 'json'
  })
}