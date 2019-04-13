<template>
  <div class="add_job">
       <go-back></go-back>
        <ul>
          <li>
            <span>公司姓名</span><br>
            <input type="text" v-model="jobCompany">
          </li>
          <li>
            <span>职位</span><br>
            <input type="text" v-model="jobTitle">
          </li>
          <li>
            <span>职位薪资</span><br>
            <input type="text" v-model="jobSalary">
          </li>
          <li>
            <span>城市</span><br>
            <input type="text" v-model="cityName">
          </li>
          <li>
            <span>职位描述</span><br>
            <textarea name="" class="job_info" v-model="jobcontent"></textarea>
          </li>
          <li>
             <img :src="jobImg" alt="">
          </li>
        </ul>
        <div @click="save" class="btn_save">
          <span>保存</span>
        </div>
  </div>
</template>
<script>
import {Addjob} from  '@/views/api/recruiter/first.js';
export default {
  name:"Addjob",
  components:{
    GoBack 
  },
  data(){
    return {
      jobCompany:'',
      jobTitle:'',
      jobSalary:'',
      cityName:'',
      jobImg:'',
      jobcontent:'',
      idindex:0
    }
  },
  methods:{
    addjob(){   
      let username = localStorage.getItem('Username')
      let params = {
          username:username,
          jobCompany : this.jobCompany,
          jobTitle:this.jobTitle,
          jobSalary: this.jobSalary,
          cityName:this.cityName,
          jobcontent:this.jobcontent,
          jobImg:'',
        }
      Addjob(params).then(res=>{
        if (res.data.code==="0") {
          console.log(res.data.msg)
        }
      })
    },
    save(){
      this.addjob()
      this.$router.go(-1)
    }
  }

}
</script>
<style lang="scss" scoped>
      .add_job{
        padding: 0 30px;
        ul{
          li{
            font-size: 32px;
            margin-bottom: 40px;
            span{
              font-size: 34px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            input{
              width: 100%;
              margin-top: 30px;
              outline: none;
              border: none;
              font-size: 34px;
              border-bottom: 2px solid black; 
            }
            .job_info{
              margin-top: 20px;
              border: none;
              outline: none;
              border: 2px solid black;
              width: 100%;
              height: 200px;
            }
          }
        }
        .btn_save{
          position: relative;
          height: 80px;
          margin-top: -40px;
          span{
          position: absolute;
          width: 700px;
          height: 100px;
          line-height: 100px;
          top: 50%;
          margin-top: -25px;
          left: 50%;
          margin-left: -350px;
          text-align: center;
          background: #613CEB;
          border-radius: 10px;
          color: #ffff;
          font-size: 32px;
          }
        }
      }
</style>


