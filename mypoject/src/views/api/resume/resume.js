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
//获取基本信息
export const getBaseInfor = (params) =>{
  return axios({
    method: 'post',
    url: '/api/my/baseinfor',
    dataType: 'json',
    data: params  
  })
}
//编辑更新基本信息
export const updateBase = (params)=>{
  return axios({
    method: 'post',
    url: '/api/my/updatebase',
    dataType: 'json',
    data: params
  })
}

