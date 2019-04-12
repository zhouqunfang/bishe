<template>
  <div class="job_detail">
      <div class="detail_top">
        <div class="detail_left">
          <h4>{{jobdetail.jobTitle}}</h4>
          <span>{{jobdetail.jobCompany}}|</span>
          <span>{{jobdetail.cityName}}|</span>
          <span>{{jobdetail.jobSalary}}|</span>
        </div>
        <div class="detail_right">
          <img src="" alt="">
        </div>
        <div class="detail_bottom">
          <h4>职位描述</h4>
          <p>{{jobdetail.jobcontent}}</p>      
        </div>
      </div>
  </div>
</template>
<script>
import { JobDetail } from "@/views/api/api.js";
export default {
  name:"Jobdetail",
  data(){
    return{
      jobdetail:[]
    }
  },
  mounted(){
      this.jobDetail()
  },
  methods:{
    //获取职位详情
    jobDetail(){
      let id = this.$route.params._id
      console.log(id)
      let params ={
            _id: id
          }
    JobDetail(params).then(res=>{
      console.log(res)
      this.jobdetail = res.data.data[0]
     })
    }
  }
}
</script>

