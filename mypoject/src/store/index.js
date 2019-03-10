import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { SignIn } from '@/views/api/api.js';
const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      // localStorage.setItem('token', token)
    },
    DEL_TOKEN (state) {
      state.token = ''
      // localStorage.removeItem('token')
    }
  },
  //actions可以进行异步操作
  actions:{
    set_token ({commit}, userInfo) {
      const username = userInfo.username.tirm()
      return new Promise((resolve,reject) =>{
        SignIn(username, userInfo.password).then(res=>{
          console.log(res)
          Cookies.set('Token', response.data.token) //登录成功后将token存储在cookie之中
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})


export default store
