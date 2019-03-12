
import axios from 'axios'
import router from './router'
// 定义全局默认配置 你可以指定将被用在各个请求的配置默认值
axios.defaults.headers.common['Authentication-Token'] = localStorage.getItem('token')
// 要想统一处理所有http请求和响应，
// 就得用上 axios 的拦截器。通过配置http response inteceptor，
// 当后端接口返回401 Unauthorized（未授权），让用户重新登录。
// 添加请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
// 判断是否存在token，如果存在将每个页面header都添加token
  const token = localStorage.getItem('Token')

  if (token) {
    config.headers.common['Authentication-Token'] = token
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token')
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}// 登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  })

/*
* 封裝 get post方法
* @param url
* @param data
* @return {Promise}
*/
// export function post (url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, {
//       params: params
//     })
//       .then(response => {
//         resolve(response.data)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }
