<template>
    <div class="myTab">
        <section class="resume_content">
          <div class="base_infor">
            <div class="ifshow_infor"  v-if="ifshow" @click="addBase">
              <div class="add_info">添加基本信息</div>
              <span>+</span>
            </div>
            <div class="base_detail" v-if="ifappear">
              <div class="base_update" @click="goAdd"></div>
              <h4>基本信息</h4>
              <h3>{{basename}}</h3>
              <div class="base_some">
                <b>{{basesex}}</b>
                <b>{{basephone}}</b>
                <b>{{basemajor}}</b>
              </div>
            </div>
          </div>
          <div class="search_infor">
            <div class="ifshow_infor" @click="addJob" v-if="jobshow">
              <div class="add_info">添加求职意向</div> 
              <span>+</span>
            </div>
            <div class="base_detail" v-if="ifjob">
              <div class="base_update" @click="jobAdd"></div>
              <h4>求职意向</h4>
              <h3>{{jobinfo}}</h3>
              <div class="base_some">
                <b>{{cityinfo}}</b>
                <b>{{salaryinfo}}</b>
              </div>
            </div>            
          </div>
          <div class="job_infor">
            <div class="ifshow_infor">
              <div class="add_info">添加工作经验</div>
              <span>+</span>
            </div>
          </div>
          <div class="poject_infor">
            <div class="ifshow_infor">
              <div class="add_info">添加项目经历</div>
              <span>+</span>
            </div>    
          </div>
        </section>
    </div>
</template>
<script>
import {getBaseInfor,getJobInfor} from '@/views/api/resume/resume.js';
export default {
  data () {
    return {
      ifshow:true,
      ifappear:false,
      basename:'',
      basephone:'',
      basesex:'',
      basemajor:'',
      ifjob:false,
      jobshow:true,
      cityinfo:'',
      jobinfo:'',
      salaryinfo:'',
    }
  },
  mounted(){
    this.getInfo()
  },
  methods:{
    //增加个人基本信息
    addBase(){
      this.$router.push('/my/resume')
    },
    //增加求职意向
    addJob(){
      this.$router.push('/my/addjob')
    },
    //如果已经有基本信息的跳转
    goAdd(){
      this.$router.push({name:'Resume',query:{id:0}})
      // this.$router.go(0)
    },
   //如果已经有求职意向的跳转
    jobAdd(){
      this.$router.push({name:'Addjob',query:{id:0}})
      // this.$router.go(0)
    },
    //获取基本信息
    getBase(){
     let username = localStorage.getItem('Username')
     let params = {
        username:username
      }
     getBaseInfor(params).then(res=>{
        console.log(res)
          if(res.data.code === "0"){
              this.ifshow = false 
              this.basename = res.data.data.name
              this.basebirth = res.data.data.birth
              this.basesex = res.data.data.sex
              this.basephone = res.data.data.phone
              this.basemajor = res.data.data.major
              this.ifappear = true
          }else{
            this.ifshow = true
          }
        })
    },
    //获取求职意向信息
    getjobInfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }      
      getJobInfor(params).then(res=>{
          if(res.data.code === "0"){
            console.log(res.data.data)
              this.cityinfo = res.data.data.city
              this.jobinfo = res.data.data.salary
              this.salaryinfo = res.data.data.job
              this.ifjob = true
              this.jobshow=false 
          }else{
              this.jobshow=true    
          }
        })
    },
    //获取基本信息
    getInfo(){
      //获取基本信息
      this.getBase()
      //获取求职意向信息
      this.getjobInfor()
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import '../../../assets/css/seeker/mytab.css'; */
.myTab{
  .resume_content{
    padding: 20px 40px;
    div{
      margin-bottom: 50px;
    }
    .base_infor,.search_infor,.job_infor,.poject_infor{
      position: relative;
      width: 100%;
      padding:20px 0 ;
      border: 1px solid black;
      font-size: 28px;
      .add_info{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -20px;
        height: 20px;
        width: 200px;
      }
      span{
        display: inline-block;
        position: absolute;
        width:40px;
        height: 40px;
        font-size: 55px;
        top:50%;
        left:50%;
        margin-left: -20px;
        margin-top:-20px;
        left:420px;
        text-align: center;
        line-height: 40px;
      }
      .base_detail{
        .base_update{
          position: absolute;
          display: inline-block;
          right:20px;
          top:0;
          width:80px;
          height:80px;
          background: url('../../../assets/image/update.svg') center no-repeat;
        }
      }
      .job_detail{

      }
    }
  }
}
</style>
