<template>
  <div class="send_job">
      <div class="add_job">
          <p @click="addjob">发布职位+</p>
      </div>
      <div class="job_content" v-for="(item,index) in getjoblist" :key=index >
        <span @click="deletejob(item.id,index)">删除</span>
        <ul>
          <li>
            <span>公司姓名</span>
            <span>{{item.jobCompany}}</span>
          </li>
          <li>
            <span>职位</span>
            <span>{{item.jobTitle}}</span>
          </li>
          <li>
            <span>职位薪资</span>
            <span>{{item.jobSalary}}</span>
          </li>
          <li>
            <span>城市</span>
            <span>{{item.cityName}}</span>
          </li>
          <li>
             <img src="" alt="">
          </li>
        </ul>
      </div>
      <footer-bar></footer-bar>
  </div>
</template>
<script>
import {Getjob,Deletejob} from '@/views/api/recruiter/first.js'
import FooterBar from '../component/tab.vue'
export default {
  components:{
    FooterBar
  },
  data(){
    return{
      getjoblist:[]
    }
  },
  mounted(){
      this.getjob()
  },
  methods:{
    addjob(){
      this.$router.push('/addjob')
    },
    //获取公司发布职位信息
    getjob(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
      Getjob(params).then(res=>{
          if(res.data.code === '0'){
            this.getjoblist = res.data.data
          }
      })
    },
    deletejob(id,index){
        console.log(id)
        this.getjoblist.splice(index,1)
        let params={
          id:id
        }
        Deletejob(params).then(res=>{
            console.log(res.data)
        })
    }
  }
}
</script>
