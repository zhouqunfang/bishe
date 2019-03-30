<template>
<div class="job_infor">
  <div class="infor_title">
    <span @click="goback"></span>
    <h4>求职意向</h4>
  </div>
  <div class="job_content">
    <div class="job_city">
      <h4>城市<span style="color:red">*</span><b style="color:#84d945" class="name_tip"></b></h4>
      <input type="text"  v-model="cityinfo">
    </div>
    <div class="job_select">
      <h4>职位<span style="color:red">*</span></h4>
      <input type="text"  v-model="jobinfo">
    </div>
    <div class="job_salary">
      <h4>期望薪资<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <input type="text" name="" id="" v-model="salaryinfo">
    </div>    
  </div>
  <div @click="saveInfor" v-if="ifSave">保存</div>
  <!-- <div @click="updateInfor" v-if="ifUpdate">保存</div> -->
</div>
</template>
<script>
// import  datepickers from './datePickers.vue';
import {BaseInfor,getBaseInfor,updateBase,JobInfor} from '@/views/api/resume/resume.js';
import {phonetest,nametest} from '@/assets/js/test.js';
export default {
  components:{
    // datepickers
},
  data(){
    return{
      cityinfo:'',
      jobinfo:'',
      salaryinfo:'',
      ifSave:true,
      ifUpdate:false
      
    }
  },
  computed:{

  },
  mounted(){
    // this.updatBase()    
  },
  methods:{
    //返回
    goback(){
        this.$router.go(-1)
    },
    //保存基本信息
    searchJobInfor(){
      let username = localStorage.getItem('Username')
      let params = {
          username:username,
          city : this.cityinfo,
          salary: this.salaryinfo,
          job:this.jobinfo,
        }
      JobInfor(params).then(res=>{
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
        if(this.cityinfo==''||this.jobinfo==''||this.salaryinfo==''){
          this.$toast({
            message: '请输入完整信息',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
        }else{
          //保存信息
         this.searchJobInfor()
         this.$router.go(-1)
        }
    },
    //保存基本信息
    saveInfor(){
      this.ifnull() 
      },
    //获取基本信息
    // getInfor(){
    //   let username = localStorage.getItem('Username')
    //   let params = {
    //     username:username
    //   }
    //   getBaseInfor(params).then(res=>{
    //     console.log(res)
    //       if(res.data.code === "0"){
    //           this.cityinfo = res.data.data.city
    //           this.birthdata = res.data.data.birth
    //           this.sex = res.data.data.sex
    //           this.phoneinfo = res.data.data.phone
    //           this.schoolinfo = res.data.data.school
    //           this.majorinfo = res.data.data.major
    //       }else{
    //         return
    //       }
    //     })
    // },
      // //获取编辑页
      // updatBase(){
      //   if(this.$route.query.id){
      //     console.log(345235)
      //     this.getInfor()
      //     this.ifSave = false
      //     this.ifUpdate=true
      //   }
      // },
      //更新基本信息
      // updateInfo(){
      //   let user = localStorage.getItem('Username')
      //   let params = {
      //     city : this.cityinfo,
      //     sex: this.sex,
      //     birth:this.birthdata,
      //     phone:this.phoneinfo,
      //     school:this.schoolinfo,
      //     major:this.majorinfo,
      //     username:user
      //   }
      // console.log(this.cityinfo)
      //   updateBase(params).then(res=>{
      //     if(res.data.code === "0"){
      //     this.$toast({
      //       message: '保存成功',
      //       duration: 1000,
      //       iconClass: 'licon icon-success',
      //       className: 'success_toast'
      //         }
      //     )
      //     this.$router.push('/my')
      //     }
      //   })
      // },
      // //保存编辑页
      // updateInfor(){
      //   this.updateInfo()
      //   }
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
  .job_content{
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

