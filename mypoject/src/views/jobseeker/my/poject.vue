<template>
<div class="job_infor">
  <div class="infor_title">
    <span @click="goback"></span>
    <h4>项目经验</h4>
  </div>
  <div class="job_content">
    <div class="job_city">
      <h4>项目名称<span style="color:red">*</span><b style="color:#84d945" class="name_tip"></b></h4>
      <input type="text"  v-model="pojectname">
    </div>
    <div class="job_select">
      <h4>担任角色<span style="color:red">*</span></h4>
      <input type="text"  v-model="role">
    </div>
    <div class="job_salary">
      <h4>项目内容<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <input type="text" name="" id="" v-model="detail">
    </div>
    <div class="job_salary">
      <h4>开始时间<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <datepickers @sendbirth="getbirth"  ref = "show_input">
        <input 
        class=""
        type="text" 
        v-model="time" 
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
  </div>
  <div @click="saveInfor" v-if="ifSave">保存</div>
  <div @click="updateInfor" v-if="ifUpdate">保存</div>
</div>
</template>
<script>
import  datepickers from './datePickers.vue';
import {poject,getPoject,updatePoject} from '@/views/api/resume/resume.js';
export default {
  components:{ 
    datepickers
},
  data(){
    return{
      pojectname:'',
      role:'',
      detail:'',
      ifSave:true,
      ifUpdate:false,
      timeoutinfo:'',
      time:''    
    }
  },
  computed:{

  },
  mounted(){
    this.updatBase()    
  },
  methods:{
    //ref 触发子组件的trueDateBox()方法 
    showinput(){
        this.$refs.show_input.trueDateBox()
    },
    ifinput(){
      this.$refs.if_input.trueDateBox()
    },  
    getbirth(data){
       this.time = data
       console.log(data) 
     },
     gettime(data){
       this.timeoutinfo = data
       console.log(data) 
     },
    //返回
    goback(){
        this.$router.go(-1)
    },
    //保存基本信息
    addpoject(){
      let username = localStorage.getItem('Username')
      let params = {
          username:username,
          pojectname : this.pojectname,
          detail: this.detail,
          role:this.role,
          time:this.time,
          timeout:this.timeoutinfo,
        }
      poject(params).then(res=>{
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
        if(this.pojectname==''||this.role==''||this.detail==''){
          this.$toast({
            message: '请输入完整信息',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
        }else{
          //保存信息
         this.addpoject()
         this.$router.go(-1)
        }
    },
    //保存基本信息
    saveInfor(){
      this.ifnull() 
      },
    //获取项目经验信息
    getsomePoject(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
      getPoject(params).then(res=>{
        console.log(res)
          if(res.data.code === "0"){
              this.pojectname = res.data.data.pojectname
              this.role = res.data.data.role
              this.detail = res.data.data.detail
              this.time=res.data.data.time
              this.timeoutinfo = res.data.data.timeout
          }else{
            return 
          }
        })
    },
      //获取职位意向编辑页
      updatBase(){
        if(this.$route.query.id){
          console.log(345235)
          this.getsomePoject()
          this.ifSave = false
          this.ifUpdate=true
        }
      },
      //更新基本信息
      updatesomePoject(){
        let user = localStorage.getItem('Username')
        let params = {
          pojectname : this.pojectname,
          detail:this.detail,
          role:this.role,
          time:this.time,
          timeout:this.timeoutinfo,
          username:user
        }
       updatePoject(params).then(res=>{
          if(res.data.code === "0"){
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
        this.updatesomePoject()
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

