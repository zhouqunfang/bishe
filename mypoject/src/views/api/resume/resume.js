import axios from 'axios'
//个人基础信息
export const BaseInfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/resume/baseinfor',
    dataType: 'json',
    data: params
  })
}
//个人基础信息
export const getBaseInfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/my/baseinfor',
    dataType: 'json',
    data: params
  })
}

//更新个人基础信息
export const updateBase = (params) => {
  return axios({
    method: 'post',
    url: '/api/my/updatebase',
    dataType: 'json',
    data: params
  })
}
//求职意向信息
export const JobInfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/resume/jobinfor',
    dataType: 'json',
    data: params
  })
}
//获取求职意向信息
export const getJobInfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/my/jobinfor',
    dataType: 'json',
    data: params
  })
}