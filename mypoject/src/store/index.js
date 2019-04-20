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
      className: 'success_toast',
    },
    newSearchList: [],
    userInfo: {},
    username:'',
    choicecity:'',
    newcompanyList:[],
    imgSrc:''
  },
  mutations: {
    // 存储token
    SET_TOKEN (state, token) {
      state.token = token
      // localStorage.setItem('token', token)
    },
    // 删除token
    DEL_TOKEN (state) {
      state.token = ''
      // localStorage.removeItem('token')
    },
    // 在vuex使用minui toast方法
    ADD_TOAST (state, toast) {
      state.toast.message = toast
    },
    // 搜索框搜索职位数据
    SEARCH_LIST (state, searchlist) {
      state.newSearchList = searchlist
    },
    // 放空职位数据数据
    DELETE_LIST (state) {
      state.newSearchList = []
    },
    //username
    SET_USERNAME(state,setname){
      state.username = setname
    },
    //获取选择的城市
    SEARCH_CITY(state, searchcity) {
      state.choicecity = searchcity
    },
    //搜索框搜索公司数据
    SEARCH_COMPANY(state, company) {
      state.newcompanyList = company
    },
    DELETE_COMPANY (state) {
      state.newcompanyList = []
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
          localStorage.setItem('Username', res.data.username) // 登录成功后将用户名存储在localstorage之中
          commit('SET_TOKEN', res.data.token)
          commit('ADD_TOAST', res.data.msg)
          commit('SET_USERNAME',res.data.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //搜索职位 
    searchlist ({commit}, searchlist) {
      commit('SEARCH_LIST', searchlist)
    },
    //放空搜索职位
    delete_list ({commit}) {
      commit('DELETE_LIST')
    },
    // //获取选择的城市
    searchcity ({commit},searchcity) {
      commit(' SEARCH_CITY',searchcity)
    },
    //搜索公司
    searchcompany ({ commit }, searchcity) {
      commit('SEARCH_COMPANY', searchcity)
    },
    //放空搜索公司
    deletecompany ({ commit }) {
      commit('DELETE_COMPANY')
    }
  }
})

export default store
