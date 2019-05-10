import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { asyncRouterMap, constantRouterMap } from '../router';
const store = new Vuex.Store({
  state: {
    token: '',
    newSearchList: [],
    userInfo: {},
    username:'',
    choicecity:'',
    newcompanyList:[],
    imgSrc:'',
    role:'',
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    //配置路由
    SET_ROUTERS(state,routers){
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ROLE (state, role) {
      state.role = role
    },
    // 存储token
    SET_TOKEN (state, token) {
      state.token = token
    },
    // 删除token
    DEL_TOKEN (state) {
      state.token = ''
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
    //设置角色权限
    set_role({commit},role){
      return new Promise(resolve =>{
        var accessedRouters = asyncRouterMap.filter(item => {
          console.log(item.meta.role)
          return item.meta.role == role?item:''
        })
        commit('SET_ROUTERS', accessedRouters)
        console.log(accessedRouters, 98083)
        commit('SET_ROLE', role)
        resolve()
      })
    },
    //设置路由
    setrouters({commit},data){
      
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
