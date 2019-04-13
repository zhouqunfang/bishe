<template>
  <div class="job_detail">
    <go-back></go-back>
      <div class="detail_top">
        <div class="detail_left">
          <h4>{{jobdetail.jobTitle}}</h4>
          <span>{{jobdetail.jobCompany}}</span><br>
          <span>{{jobdetail.cityName}}</span><br>
          <span>{{jobdetail.jobSalary}}</span>
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
import GoBack from '@/views/company/component/goback'
export default {
  name:"Jobdetail",
  components:{
    GoBack
  },
  data(){
    return{
      jobdetail:[]
    }
  },
  beforeRouteEnter(to,from,next){
      next(console.log(to.params._id))
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
<style lang="scss" scoped>
  .job_detail{
    width: 100%;
    padding: 0 20px;
    .detail_top{
        .detail_left{
         h4{
           font-size: 40px;
           font-weight: bolder;
           margin-bottom: 20px;
         } 
         span{
            font-size: 28px;
            font-weight: bold;
            color: #613CEB;
          
         }
       } 
       .detail_bottom{
         h4{
           font-size: 32px;
           font-weight: bolder;
           margin: 30px 0;
         }
         p{
           font-size: 28px;
           padding-right: 40px;
           line-height: 50px;
         }
       }
       
    }
  }
</style>


