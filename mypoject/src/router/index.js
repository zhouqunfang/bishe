import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Login = r => require.ensure([], () => r(require('@/views/login')), 'chunkname1')
const Register = r => require.ensure([], () => r(require('@/views/register')), 'chunkname1')
const Index = r => require.ensure([], () => r(require('@/views/jobseeker/first/index')), 'chunkname1')
const Company = r => require.ensure([], () => r(require('@/views/jobseeker/company/company')), 'chunkname1')
const Message = r => require.ensure([], () => r(require('@/views/jobseeker/message/message')), 'chunkname1')
const My = r => require.ensure([], () => r(require('@/views/jobseeker/my/my')), 'chunkname1')
const Todo = r => require.ensure([], () => r(require('@/views/jobseeker/todo/todo')), 'chunkname1')
const Resume = r => require.ensure([], () => r(require('@/views/jobseeker/my/resume')), 'chunkname2')
const Findjob = r => require.ensure([], () => r(require('@/views/jobseeker/my/findjob')), 'chunkname2')
const Collectjob = r => require.ensure([], () => r(require('@/views/jobseeker/my/collectjob')), 'chunkname2')
const Setting = r => require.ensure([], () => r(require('@/views/jobseeker/my/setting')), 'chunkname2')
const Searchlist = r => require.ensure([], () => r(require('@/views/jobseeker/searchlist/searchlist.vue')), 'chunkname2')
const Addjob = r => require.ensure([], () => r(require('@/views/jobseeker/my/addjob')), 'chunkname2')
const Experience = r => require.ensure([], () => r(require('@/views/jobseeker/my/experience')), 'chunkname3')
const Poject = r => require.ensure([], () => r(require('@/views/jobseeker/my/poject')), 'chunkname3')
const Select = r => require.ensure([], () => r(require('@/views/component/city/city.vue')), 'chunkname3')
const cityList = r => require.ensure([], () => r(require('@/views/component/city/cityselect.vue')), 'chunkname3')
const routes = new Router({
  routes: [
    {
      path: '/cityList',
      name: 'cityList',
      meta: {
        hasBack: true
      },
      component: cityList
    },
    {
      path: '/select',
      name: 'Select',
      meta: {
        hasBack: false
      },
      component: Select
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/index',
      name: 'Index',
      // children: [
      //   {
      //     path: '/searchlist',
      //     component: Searchlist
      //   }
      // ],
      meta: {
        requireAuth: false// 添加该字段，表示进入这个路由是需要登录的
      },
      component: Index
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/my/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/findjob',
      name: 'Findjob',
      component: Findjob
    },
    {
      path: '/collectjob',
      name: 'Collectjob',
      component: Collectjob
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    // 搜索框得到数据模块
    {
      path: '/searchlist',
      name: 'Searchlist',
      component: Searchlist
    },
    {
      path: '/searchlist',
      component: Searchlist
    },
    {
      path: '/my/addjob',
      name: 'Addjob',
      component: Addjob
    },
    {
      path: '/my/experience',
      name: 'Experience',
      component: Experience
    },
    {
      path: '/my/poject',
      name: 'Poject',
      component: Poject
    }
  ]
})

routes.beforeEach((to, from, next) => {
  // console.log(to.fullPath)
  // console.log(routes)
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    //  console.log(routes)
    //  console.log(routes.app.$options.store.state.token)
    const token = routes.app.$options.store.state.token
    // console.log(token)
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next(
        {
          path: '/',
          query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由 $route.fullPath: 完成解析后的 URL，包含查询参数和 hash 的完整路径
        }
      )
    }
  } else {
    next()
  }
})
export default routes
