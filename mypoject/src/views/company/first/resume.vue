<template>
  <div class="resume_info">
    <h4>
      <span>{{name}}</span>
      <b>个人简历</b>
    </h4>
    <div class="base_info">
        <p>基本信息</p>
        <ul>
          <li>
            <span>性别:</span>
            <span>{{sex}}</span>
          </li>
          <li>
            <span>手机号:</span>
            <span>{{phone}}</span>
          </li>
          <li>
            <span>学校:</span>
            <span>{{school}}</span>
          </li>
          <li>
            <span>专业:</span>
            <span>{{major}}</span>
          </li>
        </ul>
    </div>
    <div class="job_aim">
        <p>求职意向</p>
        <ul>
          <li>
            <span>期望职位:</span>
            <span>{{job}}</span>
          </li>
          <li>
            <span>工作性质:</span>
            <span>{{jobaim}}</span>
          </li>
          <li>
            <span>工作城市:</span>
            <span>{{city}}</span>
          </li>
          <li>
            <span>期望薪资:</span>
            <span>{{salary}}</span>
          </li>
        </ul>
    </div>
    <div class="job_experience">
        <p>工作经验</p>
        <ul>
          <li>
            <span>公司:</span>
            <span>{{company}}</span>
          </li>
          <li>
            <span>工作职位:</span>
            <span>{{expjob}}</span>
          </li>
          <li>
            <span>工作时间:</span>
            <span>{{time}}-{{timeout}}</span>
          </li>
          <li>
            <span>工作内容:</span>
            <span>{{content}}</span>
          </li>
        </ul>
    </div>
    <div class="job_poject">
        <p>项目经验</p>
        <ul>
          <li>
            <span>项目名:</span>
            <span>{{pojectname}}</span>
          </li>
          <li>
            <span>负责工作:</span>
            <span>{{role}}</span>
          </li>
          <li>
            <span>项目内容:</span>
            <span>{{pojectcontent}}</span>
          </li>
          <li>
            <span>时间:</span>
            <span>{{pojecttime}}-{{pojecttimeout}}</span>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
import GoBack from '../component/goback.vue'
import {getBaseInfor,getJobInfor,getExperience,getPoject} from '@/views/api/resume/resume.js'
export default {
    name:'Resume',
    data(){
      return{
        name:'',
        sex:'',
        phone:'',
        school:'',
        major:'',
        job:'',
        jobaim:'',
        city:'',
        salary:'',
        company:'',
        expjob:'',
        time:'',
        timeout:'',
        content:'',
        pojectname:'',
        role:'',
        pojectcontent:'',
        pojecttimeout:'',
        pojecttime:'',
        username:''
      }
    },

    beforeRouteEnter(to, from, next){  
      let username= to.query.username
      // 因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，在next方法里可以把vm当this来用。
        next(vm =>{
          vm.username=username
          console.log(vm)
          vm.getInfor()
          vm.getjobInfor()
          vm.getexperience()
          vm.getsomepoject()
            }
          )
    },
    mounted(){
      // this.getInfor()
    },
    methods:{
        getInfor(){
          let params = {
            username:this.username
          }
          getBaseInfor(params).then(res=>{
            console.log(res)
              if(res.data.code === "0"){
                  this.name = res.data.data.name
                  this.sex = res.data.data.sex
                  this.phone = res.data.data.phone
                  this.schoo = res.data.data.school
                  this.major = res.data.data.major
              }else{
                return
              }
            })
        },
  //获取求职意向信息
    getjobInfor(){
      let params = {
        username:this.username
      }      
      getJobInfor(params).then(res=>{
          if(res.data.code === "0"){
              this.city= res.data.data.city
              this.job = res.data.data.job
              this.salary = res.data.data.salary
              this.jobaim = res.data.data.jobaim
          }else{
              return   
          }
        })
    },
    //获取工作经验信息
    getexperience(){
      let params = {
        username:this.username
      }      
      getExperience(params).then(res=>{
          if(res.data.code === "0"){
              this.company = res.data.data.company
              this.expjob = res.data.data.job
              this.time=res.data.data.time
              this.timeout = res.data.data.timeout
              this.content = res.data.data.content
          }else{
             return
          }
        })
    },
        //获取项目经验信息
        getsomepoject(){
          let params = {
            username:this.username
          }      
          getPoject(params).then(res=>{
              if(res.data.code === "0"){
                console.log(res.data.data)
                  this.pojectname = res.data.data.pojectname
                  this.role = res.data.data.role 
                  this.pojecttime=res.data.data.time
                  this.pojecttimeout=res.data.data.timeout
                  this.pojectcontent = res.data.data.detail
              }else{
                  return
              }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
      .resume_info{
        padding: 30px;
        h4{
          height: 80px;
          text-align: center;
          span{
            display: inline-block;
            font-size: 34px;
            font-weight: bold;
            margin-right: 20px;
          }  
          b{
            font-size: 30px;
          }
        }
        .base_info,.job_aim,.job_experience,.job_poject{
           margin-bottom: 50px;
           p{
              font-size: 34px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            ul{
              li{
                font-size: 32px;
                margin-bottom: 20px;
              }
            }
        }
      }
</style>


