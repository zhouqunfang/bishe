<template>
<div class="job_infor">
  <div class="infor_title">
    <span @click="goback"></span>
    <h4>工作经验</h4>
  </div>
  <div class="experience_content">
    <div class="job_city">
      <h4>公司<span style="color:red">*</span><b style="color:#84d945" class="name_tip"></b></h4>
      <input type="text"  v-model="companyinfo">
    </div>
    <div class="job_select">
      <h4>工作职位<span style="color:red">*</span></h4>
      <input type="text"  v-model="jobinfo">
    </div>
    <div class="job_salary">
      <h4>时间<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <input type="text" name="" id="" v-model="timeinfo">
    </div>  
    <div class="job_salary">
      <h4>工作内容<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <input type="text" name="" id="" v-model="contentinfo">
    </div>    
  </div>
  <div @click="saveInfor" v-if="ifSave">保存</div>
  <div @click="updateInfor" v-if="ifUpdate">保存</div>
  
</div>
</template>
<script>
import {Experience,getExperience, updateExperience} from '@/views/api/resume/resume.js';
export default {
  components:{ 
},
  data(){
    return{
      companyinfo:'',
      jobinfo:'',
      contentinfo:'',
      timeinfo:'',
      ifSave:true,
      ifUpdate:false    
    }
  },
  computed:{

  },
  mounted(){
    this.updatBase()    
  },
  methods:{
    //返回
    goback(){
        this.$router.go(-1)
    },
    //保存工作经验信息
    addExperience(){
      let username = localStorage.getItem('Username')
      let params = {
          username:username,
          job : this.jobinfo,
          company:this.companyinfo,
          time: this.timeinfo,
          content:this.contentinfo
        }
      Experience(params).then(res=>{
         this.$toast({
            message: '保存成功',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )  
        })
    },
    //判断信息是否为空
    ifnull(){
        if(this.companyinfo==''||this.jobinfo==''||this.timeinfo==''){
          this.$toast({
            message: '请输入完整信息',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
        }else{
          //保存信息
         this.addExperience()
         this.$router.go(-1)
        }
    },
    //保存基本信息
    saveInfor(){
      this.ifnull() 
      },
    //获取工作经验信息
    getexperienceInfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
      getExperience(params).then(res=>{
        console.log(res)
          if(res.data.code === "0"){
              this.companyinfo = res.data.data.company
              this.jobinfo = res.data.data.job
              this.timeinfo = res.data.data.time
          }else{
            return
          }
        })
    },
      //获取编辑页
      updatBase(){
        if(this.$route.query.id){
          console.log(345235)
          this.getexperienceInfor()
          this.ifSave = false
          this.ifUpdate=true
        }
      },
      //更新工作经历信息
      updateinfo(){
        let user = localStorage.getItem('Username')
        let params = {
          company : this.companyinfo,
          job:this.jobinfo,
          content:this.contentinfo,
          time:this.timeinfo,
          username:user
        }
        updateExperience(params).then(res=>{
          if(res.data.code === "0"){
            console.log(46546546546546)
          this.$toast({
            message: '保存成功',
            duration: 1000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
          this.$router.push('/my')
          }
        })
      },
      //保存编辑页
      updateInfor(){
        this.updateinfo()
        }
      }
    }
  

</script>
<style lang="scss" scoped>
.job_infor{
  .infor_title{
      position: relative;
      display: flex;
      align-items: center; 
      span{
        position: absolute;
        display: inline-block;
        margin-left: 20px;
        width:40px;
        height: 40px;
        background: url('../../../assets/image/triangle.png') center no-repeat;
      }
      h4{
        width: 100%;
        text-align: center;
        padding: 20px 0 20px 0;
        font-weight: bold;
        font-size: 35px;  
     }
  }
  .experience_content{
    padding: 0 20px;
    width: 100%;
    h4{
        margin-bottom: 10px;
        font-size: 28px;
      }
    input{
        height: 50px ;
        width:600px;
        border: none;
        outline-style: none;
        border-bottom: 1px solid black;
        margin-bottom: 40px;
        font-size: 28px;
        padding-left: 20px;
      }  
    .mint-popup-bottom{
      width:100%;
    }

  }
}
</style>

