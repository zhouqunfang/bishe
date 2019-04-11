import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const First = r => require.ensure([], () => r(require('@/views/company/first/first')), 'chunkname1')
const SendJob = r => require.ensure([], () => r(require('@/views/company/sendjob/sendjob')), 'chunkname1')
const CompanyInfo = r => require.ensure([], () => r(require('@/views/company/companyinfo/companyinfo')), 'chunkname1')
const CompanyMsg = r => require.ensure([], () => r(require('@/views/company/companymsg/companymsg')), 'chunkname1')
const AddInfo = r => require.ensure([], () => r(require('@/views/company/companyinfo/addinfo')), 'chunkname1')
const AddJobInfo = r => require.ensure([], () => r(require('@/views/company/sendjob/addjob')), 'chunkname1')
const Resume = r => require.ensure([], () => r(require('@/views/company/first/resume')), 'chunkname1')

export const firstjob = 
  {
      path: '/first',
      name: 'First',
      component: First
   }
export const  sendJob =
  {
        path: '/sendJob',
        name: 'SendJob',
        component: SendJob
  }

export const companyInfo =
{
  path: '/companyinfo',
  name: 'CompanyInfo',
  component: CompanyInfo
}
export const companyMsg =
{
  path: '/companymsg',
  name: 'Companymsg',
  component: CompanyMsg
}
export const addInfo=
{
  path: '/addinfo',
  name: 'Addinfo',
  component: AddInfo
}
export const addJobInfo  =
{
  path: '/addjob',
  name: 'AddJobInfo',
  component: AddJobInfo 
}
export const resumeInfo =
{
  path: '/resume',
  name: 'Resume',
  component: Resume
}

