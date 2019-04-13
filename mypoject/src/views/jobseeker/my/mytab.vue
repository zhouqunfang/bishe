<template>
    <div class="myTab">
        <div class="resume_content">
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
            <div class="ifshow_infor" v-if="experienceshow" @click="addexperience">
              <div class="add_info">添加工作经验</div>
              <span>+</span>
            </div>
            <div class="base_detail" v-if="ifexperience">
              <div class="base_update" @click="experienceAdd"></div>
              <h4>工作经验</h4>
              <h3>{{expcompany}}</h3>
              <div class="base_some">
                <b>{{expjob}}</b>
                <b>{{extime}}</b>
                <i>—</i>
                <b>{{extimeout}}</b>
                <b>{{expcontent}}</b>
              </div>
            </div>
          </div>
          <div class="poject_infor">
            <div class="ifshow_infor" @click="addpoject" v-if="ifpoject">
              <div class="add_info">添加项目经历</div>
              <span>+</span>
            </div> 
            <div class="base_detail" v-if="showpoject">
              <div class="base_update" @click="pojectAdd"></div>
              <h4>项目经历</h4>
              <h3>{{pojectname}}</h3>
              <div class="base_some">
                <b>{{pojectrole}}</b>
                <b>{{pojecttime}}</b>
                <i>—</i>
                <b>{{pojecttimeout}}</b>
                <b>{{pojectdetail}}</b>
              </div>
            </div>   
          </div>
        </div>
    </div>
</template>
<script>
import {getBaseInfor,getJobInfor,getExperience,getPoject} from '@/views/api/resume/resume.js';
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
      expjob:'',
      expcontent:'',
      expcompany:'',
      extime:'',
      extimeout:'',
      experienceshow:true,
      ifexperience:false,
      ifpoject:true,
      showpoject:false,
      pojectname:'',
      pojectrole:'',
      pojecttime:'',
      pojecttimeout:'',
      pojectdetail:''

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
   //增加工作经验意向
    addexperience(){
      this.$router.push('/my/experience')
    },
    //增加工作项目经验
    addpoject(){
      this.$router.push('/my/poject')
    },
    //如果已经有基本信息的跳转
    goAdd(){
      this.$router.push({name:'Resumemy',query:{id:0}})
    },
   //如果已经有求职意向的跳转
    jobAdd(){
      this.$router.push({name:'Addjob',query:{id:0}})
    },
   //如果已经有工作经验的跳转
    experienceAdd(){
      this.$router.push({name:'Experience',query:{id:0}})
    },
  //如果已经有项目经验的跳转
    pojectAdd(){
      this.$router.push({name:'Poject',query:{id:0}})
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
              this.jobinfo = res.data.data.job
              this.salaryinfo = res.data.data.salary
              this.ifjob = true
              this.jobshow=false 
          }else{
              this.jobshow=true    
          }
        })
    },
    //获取工作经验信息
    getexperience(){
    let username = localStorage.getItem('Username')
      let params = {
        username:username
      }      
      getExperience(params).then(res=>{
          if(res.data.code === "0"){
            console.log(res.data.data)
              this.expcompany = res.data.data.company
              this.expjob = res.data.data.job
              this.extime=res.data.data.time
              this.extimeout = res.data.data.timeout
              this.expcontent = res.data.data.content
              this.ifexperience = true
              this.experienceshow=false
          }else{
              this.experienceshow=true
          }
        })
    },
    //获取项目经验信息
    getsomepoject(){
    let username = localStorage.getItem('Username')
      let params = {
        username:username
      }      
      getPoject(params).then(res=>{
          if(res.data.code === "0"){
            console.log(res.data.data)
              this.pojectname = res.data.data.pojectname
              this.pojectrole = res.data.data.role 
              this.pojecttime=res.data.data.time
              this.pojecttimeout=res.data.data.timeout
              this.pojectdetail = res.data.data.detail
              this.showpoject = true
              this.ifpoject=false
          }else{
              this.ifpoject=true
          }
        })
    }, 
    //获取基本信息
    getInfo(){
      //获取基本信息
      this.getBase()
      //获取求职意向信息
      this.getjobInfor()
      //获取工作经验信息
      this.getexperience()
      //获取项目经验信息
      this.getsomepoject()
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import '../../../assets/css/seeker/mytab.css'; */
.myTab{
  .resume_content{
    padding: 10px 40px;
    div{
      margin-bottom: 50px;
    }
    .base_infor,.search_infor,.job_infor,.poject_infor{
      position: relative;
      padding:20px 20px 10px 20px ;
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
        h4{
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #613CEB;
        }
        h3{
          font-size: 36px;
          font-weight: bolder;
          margin-bottom: 10px;
        }
      }
      .base_some{
           b{
             font-size: 28px;
           } 
      }
    }
  }
}
</style>
