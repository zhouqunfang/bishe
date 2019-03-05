// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import vuex from 'vuex'
import store from './store'
import '../src/assets/css/cssreset.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);//全部引入
// import { Message, Button } from 'element-ui'
// mint ui 按需引入
import { Toast, Swipe, SwipeItem, Header, Button} from 'mint-ui' // 按需引入
import '../node_modules/mint-ui/lib/style.css'
import 'vue2-animate/dist/vue2-animate.min.css'
// npm px2rem-loader  lib-flexible --save
import 'lib-flexible/flexible.js'
import '../src/assets/js/time.js'
// import Mint from 'mint-ui'
// Vue.use(Mint);
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
// Vue.prototype.$message = Message
Vue.prototype.$toast = Toast // 导入样式
Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.use(vuex)
// 定义全局默认配置 你可以指定将被用在各个请求的配置默认值
axios.defaults.headers.common['Authentication-Token'] = localStorage.getItem('token')
// 要想统一处理所有http请求和响应，
// 就得用上 axios 的拦截器。通过配置http response inteceptor，
// 当后端接口返回401 Unauthorized（未授权），让用户重新登录。
// 添加请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
// 判断是否存在token，如果存在将每个页面header都添加token
  const token = localStorage.getItem('token')
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
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
