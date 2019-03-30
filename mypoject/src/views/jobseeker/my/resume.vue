<template>
<div class="base_infor">
  <div class="infor_title">
    <span @click="goback"></span>
    <h4>个人信息</h4>
  </div>
  <div class="base_content">
    <div class="base_name">
      <h4>姓名</h4>
      <input type="text"  v-model="nameinfo">
    </div>
    <div class="base_sex">
      <h4>性别</h4>
      <input type="text" name="" id="" @focus="show_sex" v-model="sexinfo">
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <mt-picker
          :slots="slots" 
          @change="onValuesChange"
        >
         </mt-picker>
      </mt-popup>
    </div>
    <div class="base_birth">
      <h4>出生日期</h4>
      <datepickers @sendbirth="getbirth"></datepickers>
    </div>
    <div class="base_phone">
      <h4>手机</h4>
      <input type="text" name="" id="" v-model="phoneinfo">
    </div>
    <div class="base_school">
      <h4>学校</h4>
      <input type="text" name="" id="" v-model="schoolinfo">
    </div>
    <div class="base_">
      <h4>专业</h4>
      <input type="text" name="" id="" v-model="majorinfo">
    </div>     
  </div>
  <div @click="saveInfor">保存成功</div>
</div>
</template>
<script>
import  datepickers from './datePickers.vue';
import {BaseInfor} from '@/views/api/resume/resume.js';
export default {
  components:{
    datepickers
},
  data(){
    return{
      popupVisible:false,
      slots: [
        {
          values: ['女', '男'],
          className: 'slot1'
        }     
      ],
      sex:'',
      nameinfo:'',
      phoneinfo:'',
      schoolinfo:'',
      majorinfo:'',
      birthdata:''
     
    }
  },
  computed:{
    sexinfo(){
      return this.sex
   }
  },
  methods:{
    //返回
    goback(){
        this.$router.go(-1)
    },
    //选择性别弹出
    show_sex(){
      this.popupVisible = true
      },
    onValuesChange(picker, values){
       let value =  values.toString()
        this.sex = value 
    }, 
    getbirth(data){
       this.birthdata = data
       console.log(data) 
     },
    getbaseInfor(){
      let params = {
          name : this.nameinfo,
          sex: this.sexinfo,
          birth:this.birthdata,
          phone:this.phoneinfo,
          school:this.schoolinfo,
          major:this.majorinfo
        }
      BaseInfor(params).then(res=>{
          this.$toast({
            message: res.data.msg,
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
        })
    },
    //保存基本信息
    saveInfor(){
      this.getbaseInfor()
      }
    }
  }

</script>
<style lang="scss" scoped>
.base_infor{
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
  .base_content{
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
    .base_name{

    }
    .base_sex{
 
    }
    .mint-popup-bottom{
      width:100%;
    }
    .base_birth{
    
    }
  }
}
</style>

