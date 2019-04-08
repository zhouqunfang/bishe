import axios from 'axios'
export const Addtodolist = (params) => {
  return axios({
    method: 'post',
    url: '/api/todo/addlist',
    dataType: 'json',
    data: params
  })
}

export const Gettodolist = (params) => {
  return axios({
    method: 'post',
    url: '/api/todo/gettodolist',
    dataType: 'json',
    data: params
  })
}

export const Deletetodolist = (params) => {
  return axios({
    method: 'post',
    url: '/api/todo/deletetodolist',
    dataType: 'json',
    data: params
  })
}

export const Updatetodolist = (params) => {
  return axios({
    method: 'post',
    url: '/api/todo/updatetodolist',
    dataType: 'json',
    data: params
  })
}