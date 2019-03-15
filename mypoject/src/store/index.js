import Vue from 'vue'
import Vuex from 'vuex'
import { SignIn } from '@/views/api/api.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: '',
    toast: {
      message: '',
      duration: 2000,
      iconClass: 'icon icon-success',
      className: 'success_toast'
    },
    newSearchList: []

  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      // localStorage.setItem('token', token)
    },
    DEL_TOKEN (state) {
      state.token = ''
      // localStorage.removeItem('token')
    },
    ADD_TOAST (state, toast) {
      state.toast.message = toast
    },
    Search_List (state, searchlist) {
      console.log(this.state.newSearchList)
      state.newSearchList = searchlist
    }
  },
  // actions可以进行异步操作
  actions: {
    add_toast ({commit}, toastInfo) {
      commit('ADD_TOAST', toastInfo)
    },
    set_token ({commit}, userInfo) {
      // const username = userInfo.username
      return new Promise((resolve, reject) => {
        SignIn(userInfo).then(res => {
          localStorage.setItem('Token', res.data.token) // 登录成功后将token存储在localstorage之中
          commit('SET_TOKEN', res.data.token)
          commit('ADD_TOAST', res.data.msg)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchlist ({commit}, searchlists) {
      commit('Search_List', searchlists)
    }
  }
})

export default store
