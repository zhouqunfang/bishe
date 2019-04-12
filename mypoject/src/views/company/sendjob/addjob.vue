<template>
  <div class="add_job">
       <go-back></go-back>
        <ul>
          <li>
            <span>公司姓名</span>
            <input type="text" v-model="jobCompany">
          </li>
          <li>
            <span>职位</span>
            <input type="text" v-model="jobTitle">
          </li>
          <li>
            <span>职位薪资</span>
            <input type="text" v-model="jobSalary">
          </li>
          <li>
            <span>城市</span>
            <input type="text" v-model="cityName">
          </li>
          <li>
            <span>工作内容</span>
            <input type="text" v-model="jobcontent">
          </li>
          <li>
             <img :src="jobImg" alt="">
          </li>
        </ul>
        <div @click="save">保存</div>
  </div>
</template>
<script>
import {Addjob} from  '@/views/api/recruiter/first.js';
import GoBack from '../component/goback.vue'
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

