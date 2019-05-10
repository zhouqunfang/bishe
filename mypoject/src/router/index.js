import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Page = r => require.ensure([], () => r(require('@/views/page')), 'chunkname1')
const Login = r => require.ensure([], () => r(require('@/views/login')), 'chunkname1')
const Register = r => require.ensure([], () => r(require('@/views/register')), 'chunkname1')
const Index = r => require.ensure([], () => r(require('@/views/jobseeker/first/index')), 'chunkname1')
const Company = r => require.ensure([], () => r(require('@/views/jobseeker/company/company')), 'chunkname1')
const Companydetail = r => require.ensure([], () => r(require('@/views/jobseeker/company/companydetail')), 'chunkname1')
const Message = r => require.ensure([], () => r(require('@/views/jobseeker/message/message')), 'chunkname1')
const My = r => require.ensure([], () => r(require('@/views/jobseeker/my/my')), 'chunkname1')
const Todo = r => require.ensure([], () => r(require('@/views/jobseeker/todo/todo')), 'chunkname1')
const Resumemy = r => require.ensure([], () => r(require('@/views/jobseeker/my/resume')), 'chunkname2')
const Findjob = r => require.ensure([], () => r(require('@/views/jobseeker/my/findjob')), 'chunkname2')
const Collectjob = r => require.ensure([], () => r(require('@/views/jobseeker/my/collectjob')), 'chunkname2')
const Setting = r => require.ensure([], () => r(require('@/views/jobseeker/my/setting')), 'chunkname2')
const Searchlist = r => require.ensure([], () => r(require('@/views/jobseeker/searchlist/searchlist')), 'chunkname2')
const Addjob = r => require.ensure([], () => r(require('@/views/jobseeker/my/addjob')), 'chunkname2')
const Experience = r => require.ensure([], () => r(require('@/views/jobseeker/my/experience')), 'chunkname3')
const Poject = r => require.ensure([], () => r(require('@/views/jobseeker/my/poject')), 'chunkname3')
const Companylist = r => require.ensure([], () => r(require('@/views/jobseeker/company/searchlist')), 'chunkname4')
const Jobdetail = r => require.ensure([], () => r(require('@/views/jobseeker/first/jobdetail')), 'chunkname4')
const First = r => require.ensure([], () => r(require('@/views/company/first/first')), 'chunkname1')
const SendJob = r => require.ensure([], () => r(require('@/views/company/sendjob/sendjob')), 'chunkname1')
const CompanyInfo = r => require.ensure([], () => r(require('@/views/company/companyinfo/companyinfo')), 'chunkname1')
const CompanyMsg = r => require.ensure([], () => r(require('@/views/company/companymsg/companymsg')), 'chunkname1')
const AddInfo = r => require.ensure([], () => r(require('@/views/company/companyinfo/addinfo')), 'chunkname1')
const AddJobInfo = r => require.ensure([], () => r(require('@/views/company/sendjob/addjob')), 'chunkname1')
const Resume = r => require.ensure([], () => r(require('@/views/company/first/resume')), 'chunkname1')
// const routes =  [
//     firstjob,
//     sendJob,
//     companyInfo,
//     companyMsg,
//     addInfo,
//     addJobInfo ,
//     resumeInfo,
//     {
//       path: '/page',
//       name: 'Page',
//       component: Page
//     },
//     {
//       path: '/',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/register',
//       name: 'Register',
//       component: Register
//     },
//     {
//       path: '/index',
//       name: 'Index',
//       meta: {
//         requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
//       },
//       component: Index
//     },
//     {
//       path: '/company',
//       name: 'Company',
//       component: Company
//     },
//     {
//       path: '/message',
//       name: 'Message',
//       component: Message
//     },
//     {
//       path: '/todo',
//       name: 'Todo',
//       component: Todo
//     },
//     {
//       path: '/my',
//       name: 'My',
//       component: My
//     },
//     {
//       path: '/my/resume',
//       name: 'Resumemy',
//       component: Resumemy
//     },
//     {
//       path: '/findjob',
//       name: 'Findjob',
//       component: Findjob
//     },
//     {
//       path: '/collectjob',
//       name: 'Collectjob',
//       component: Collectjob
//     },
//     {
//       path: '/setting',
//       name: 'Setting',
//       component: Setting
//     },
//     // 搜索框得到数据模块
//     {
//       path: '/searchlist',
//       name: 'Searchlist',
//       component: Searchlist
//     },
//     {
//       path: '/searchlist',
//       component: Searchlist
//     },
//     {
//       path: '/my/addjob',
//       name: 'Addjob',
//       component: Addjob
//     },
//     {
//       path: '/my/experience',
//       name: 'Experience',
//       component: Experience
//     },
//     {
//       path: '/my/poject',
//       name: 'Poject',
//       component: Poject
//     },
//     // 公司详情跳转路由
//     {
//       path: '/companydetail',
//       component: Companydetail,
//       name: 'Companydetail'
//     },
//     //公司搜素后跳转路由
//     {
//       path: '/company/list',
//       component: Companylist
//     },
//     //职位详情跳转
//     {
//       path:'/index/jobdetail',
//       component: Jobdetail,
//       name:'Jobdetail'
//     }
//   ]
//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap =[
  {
    path: '/page',
    name: 'Page',
    component: Page
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
  }
]

//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [
  {
    path: '/index',
    name: 'Index',
    meta: {
      requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
      role: 0
    },
    component: Index
  },
  {
    path: '/company',
    name: 'Company',
    component: Company,
    meta: { role: 0 } 
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: { role: 0 } 
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
    meta: { role: 0 } 
  },
  {
    path: '/my',
    name: 'My',
    component: My,
    meta: { role:0 } 
  },
  {
    path: '/my/resume',
    name: 'Resumemy',
    component: Resumemy,
    meta: { role: 0 } 
  },
  {
    path: '/findjob',
    name: 'Findjob',
    component: Findjob,
    meta: { role: 0 } 
  },
  {
    path: '/collectjob',
    name: 'Collectjob',
    component: Collectjob,
    meta: { role: 0 } 
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: { role: 0 } 
  },
  // 搜索框得到数据模块
  {
    path: '/searchlist',
    name: 'Searchlist',
    component: Searchlist,
    meta: { role: 0 } 
  },
  {
    path: '/my/addjob',
    name: 'Addjob',
    component: Addjob,
    meta: { role: 0 } 
  },
  {
    path: '/my/experience',
    name: 'Experience',
    component: Experience,
    meta: { role: 0 } 
  },
  {
    path: '/my/poject',
    name: 'Poject',
    component: Poject,
    meta: { role: 0 } 
  },
  // 公司详情跳转路由
  {
    path: '/companydetail',
    component: Companydetail,
    name: 'Companydetail',
    meta: { role: 0 } 
  },
  //公司搜素后跳转路由
  {
    path: '/company/list',
    component: Companylist,
    meta: { role: 0 } 
  },
  //职位详情跳转
  {
    path: '/index/jobdetail',
    component: Jobdetail,
    name: 'Jobdetail',
    meta: { role: 0 } 
  },
  {
    path: '/first',
    name: 'First',
    component: First,
    meta: { role: 1 } 
  },
  {
    path: '/sendJob',
    name: 'SendJob',
    component: SendJob,
    meta: { role: 1 } 
  },
  {
    path: '/companyinfo',
    name: 'CompanyInfo',
    component: CompanyInfo,
    meta: { role: 1 } 
  },
  {
    path: '/companymsg',
    name: 'Companymsg',
    component: CompanyMsg,
    meta: { role: 1 } 
  },
  {
    path: '/addinfo',
    name: 'Addinfo',
    component: AddInfo,
    meta: { role: 1 } 
  },
  {
    path: '/addjob',
    name: 'AddJobInfo',
    component: AddJobInfo,
    meta: { role: 1 } 
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
    meta: { role: 1 } 
  }
];
// routes.beforeEach((to, from, next) => {
//   // console.log(to.fullPath)
//   // console.log(routes)
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     //  console.log(routes)
//     //  console.log(routes.app.$options.store.state.token)
//     const token = routes.app.$options.store.state.token
//     // console.log(token)
//     if (token) { // 通过vuex state获取当前的token是否存在
//       next()
//     } else {
//       next(
//         {
//           path: '/',
//           query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由 $route.fullPath: 完成解析后的 URL，包含查询参数和 hash 的完整路径
//         }
//       )
//     }
//   } else {
//     next()
//   }
// })
//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
});
