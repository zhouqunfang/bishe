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
//更新求职意向信息
export const updateJobInfor = (params) => {
  return axios({
    method: 'post',
    url: '/api/my/updatejobinfor',
    dataType: 'json',
    data: params
  })
}
//工作经验信息
export const Experience = (params) => {
  return axios({
    method: 'post',
    url: '/api/resume/experience',
    dataType: 'json',
    data: params
  })
}
//获取工作经验信息
export const getExperience = (params) => {
  return axios({
    method: 'post',
    url: '/api/my/experience',
    dataType: 'json',
    data: params
  })
}
//更新工作经验信息
export const updateExperience = (params) => {
  return axios({
    method: 'post',
    url: '/api/my/updateexperience',
    dataType: 'json',
    data: params
  })
}
//项目经验信息
export const poject = (params) => {
  return axios({
    method: 'post',
    url: '/api/resume/poject',
    dataType: 'json',
    data: params
  })
}
//获取项目经验信息
export const getPoject = (params) => {
  return axios({
    method: 'post',
    url: '/api/my/poject',
    dataType: 'json',
    data: params
  })
}
//更新项目经验信息
export const updatePoject= (params) => {
  return axios({
    method: 'post',
    url: '/api/my/updatepoject',
    dataType: 'json',
    data: params
  })
}