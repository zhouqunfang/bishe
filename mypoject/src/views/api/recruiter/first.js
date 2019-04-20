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
//存放图片接口
export const imgList = (params) => {
  return axios({
    method: 'post',
    url: '/api/company/imglist',
    data: params,
    dataType: 'json',
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
//消息简历接收
export const getresumeMsg = (params) => {
  return axios({
    method: 'post',
    url: '/api/message/getresume',
    data: params,
    dataType: 'json'
  })
}
//消息简历删除
export const deleteresumeMsg = (params) => {
  return axios({
    method: 'post',
    url: '/api/message/deleteresume',
    data: params,
    dataType: 'json'
  })
}
//公司消息发送
export const getcompanyMsg = (params) => {
  return axios({
    method: 'post',
    url: '/api/message/company',
    data: params,
    dataType: 'json'
  })
}
