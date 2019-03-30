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