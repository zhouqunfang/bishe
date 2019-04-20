<template>
  <div class="send_job">
      <div class="add_job">
          <p @click="addjob">发布职位+</p>
      </div>
      <div class="job_content" v-for="(item,index) in getjoblist" :key=index >
        <span @click="deletejob(item._id,index)" class="delete"></span>
        <ul>
          <li>
            <span class="job_mintitle">公司姓名:</span>
            <span>{{item.jobCompany}}</span>
          </li>
          <li>
            <span class="job_mintitle">职位:</span>
            <span>{{item.jobTitle}}</span>
          </li>
          <li>
            <span class="job_mintitle">职位薪资:</span>
            <span>{{item.jobSalary}}</span>
          </li>
          <li>
            <span class="job_mintitle">城市:</span>
            <span>{{item.cityName}}</span>
          </li>
          <li>
            <span class="job_mintitle">职位描述:</span><br>
            <span class="job_info">{{item.jobcontent}}</span>
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
  beforeRouterEnter(to,from,next){
    next(vm=>{
      vm.getjob()
    })
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
          _id:id
        }
        Deletejob(params).then(res=>{
            console.log(res.data)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
        .send_job{
          padding: 0 30px;
          .add_job{
          text-align: center;
            p{
              font-size: 34px;
              font-weight: bolder;
              line-height: 70px;
            }
          }
          .job_content{
            position: relative;
            .delete{
              position: absolute;
              right: 0;
              width: 100px;
              height: 50px;
              background: url('../../../assets/image/delete(2).svg') center no-repeat;
           
            }
            li{
              margin-bottom: 20px;
              font-size: 32px;
              .job_mintitle{
                font-size: 34px;
                margin-right: 10px;
                font-weight: bold;
              }
              .job_info{
                display: inline-block;
                margin-top: 20px;
                font-size: 32px;
              }
            }
          }
        }
</style>

