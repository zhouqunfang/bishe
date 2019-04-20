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
      <h4>开始时间<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <datepickers @sendbirth="getbirth"  ref = "show_input">
        <input 
        class=""
        type="text" 
        v-model="timeinfo" 
        @click="showinput"
        slot>
      </datepickers>     
    </div> 
    <div class="job_salary">
      <h4>结束时间<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <datepickers @sendtime="gettime"  ref = "if_input">
        <input 
        class=""
        type="text" 
        v-model="timeoutinfo" 
        @click="ifinput"
        slot>
      </datepickers>     
    </div>   
    <div class="job_salary">
      <h4>工作内容<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <input type="text" name="" id="" v-model="contentinfo">
    </div>    
  </div>
  <div @click="saveInfor" v-if="ifSave" class="btn_save"><span>保存</span></div>
  <div @click="updateInfor" v-if="ifUpdate" class="btn_save"><span>保存</span></div>
  
</div>
</template>
<script>
import  datepickers from './datePickers.vue';
import {Experience,getExperience, updateExperience} from '@/views/api/resume/resume.js';
export default {
  components:{ 
    datepickers
},
  data(){
    return{
      companyinfo:'',
      jobinfo:'',
      contentinfo:'',
      timeinfo:'',
      timeoutinfo:'',
      ifSave:true,
      ifUpdate:false    
    }
  },
    mounted(){
    this.updatBase()  
    },
   beforeRouteEnter(to, from, next){  
      let route= to.query.id
      console.log(route)
      // 因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，在next方法里可以把vm当this来用。
      next(vm=>{
        if(route === 0){
         vm.getexperienceInfor() 
          console.log(route)
          console.log(34234234)
          vm.ifSave = false
          vm.ifUpdate=true         
          }
        })
    },
  methods:{
    //ref 触发子组件的trueDateBox()方法 
    showinput(){
        this.$refs.show_input.trueDateBox()
    },
    ifinput(){
      this.$refs.if_input.trueDateBox()
    },
    //返回
    goback(){
        this.$router.go(-1)
    },
    getbirth(data){
       this.timeinfo = data
       console.log(data) 
     },
     gettime(data){
       this.timeoutinfo = data
       console.log(data) 
     },
    //保存工作经验信息
    addExperience(){
      let username = localStorage.getItem('Username')
      let params = {
          username:username,
          job : this.jobinfo,
          company:this.companyinfo,
          time: this.timeinfo,
          timeout:this.timeoutinfo,
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
        if(this.companyinfo==''||this.jobinfo==''||this.timeinfo==''||this.timeoutinfo==''){
          this.$toast({
            message: '请输入完整信息',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
        }else{
          //保存信息
          console.log('保存')
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
              this.timeoutinfo = res.data.data.timeout
              this.contentinfo=res.data.data.content
          }else{
            return
          }
        })
    },
          //获取编辑页
      updatBase(){
        if(this.$route.query.id){
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
          timeout:this.timeoutinfo,
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
        console.log('编辑页')
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
    .btn_save{
    position: relative;
    height: 80px;
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

