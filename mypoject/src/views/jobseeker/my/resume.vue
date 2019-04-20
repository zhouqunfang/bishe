<template>
<div class="base_infor">
  <div class="infor_title">
    <span @click="goback"></span>
    <h4>个人信息</h4>
  </div>
  <div class="base_content">
    <div class="base_name">
      <h4>姓名<span style="color:red">*</span><b style="color:#84d945" class="name_tip"></b></h4>
      <input type="text"  v-model="nameinfo">
    </div>
    <div class="base_sex">
      <h4>性别<span style="color:red">*</span></h4>
      <input type="text" name="" id="" @click="ShouPup" v-model="sexinfo">
      <mt-popup
        v-model="popupVisible"
        position="bottom"
        popup-transition="popup-fade" 
        closeOnClickModal="true">
        <mt-picker
          :slots="slots" 
          @change="onValuesChange" 
          class="picker_mt"
          showToolbar
          >
          <div class="picker-toolbar-title">
             <div class="usi-btn-cancel" 
             @click="popupVisible = !popupVisible">
             取消
             </div>
             <div class="">请选择性别</div>
             <div class="usi-btn-sure" 
                  @click="popupVisible = !popupVisible">
                  确定
             </div>
          </div>
        </mt-picker>
      </mt-popup>
    </div>
    <div class="base_birth">
      <h4>出生日期<span style="color:red">*</span></h4>
      <datepickers @sendbirth="getbirth"  ref = "show_input">
        <input 
        class=""
        type="text" 
        v-model="this.birthdata" 
        @click="showinput"
        slot>
      </datepickers>
    </div>
    <div class="base_phone">
      <h4>手机<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
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
  <div @click="saveInfor" v-if="ifSave" class="btn_save">
      <span>保存</span>
  </div>
  <div @click="updateInfor" v-if="ifUpdate" class="btn_save">
    <span>保存</span>
  </div>
</div>
</template>
<script>
import  datepickers from './datePickers.vue';
import {BaseInfor,getBaseInfor,updateBase} from '@/views/api/resume/resume.js';
import {phonetest,nametest} from '@/assets/js/test.js';
export default {
  components:{
    datepickers
},
  data(){
    return{
      showToolbar: true,
      popupVisible:false,
      slots: [
        {
          values: ['女', '男']
        }     
      ],
      sex:'',
      nameinfo:'',
      phoneinfo:'',
      schoolinfo:'',
      majorinfo:'',
      birthdata:'' ,
      ifSave:true,
      ifUpdate:false
      
    }
  },
  computed:{
    sexinfo(){
      return this.sex
   }
  },
  mounted(){
  
    
  },
   beforeRouteEnter(to, from, next){  
      let route= to.query
      // 因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，在next方法里可以把vm当this来用。
        next(vm =>{
        if(route){
          console.log(345235)
          vm.getInfor()
          vm.ifSave = false
          vm.ifUpdate=true
        }
 
            }
          )
    },
  methods:{
    //ref 触发子组件的trueDateBox()方法 
    showinput(){
        this.$refs.show_input.trueDateBox()
    },
    //返回
    goback(){
        this.$router.go(-1)
    },
    //选择性别弹出
    ShouPup(){
      this.popupVisible = true
      },
    onValuesChange(picker, values){
       let value =  values.toString()
        this.sex = value 
        if(values[0] > values[1]) {
      picker.setSlotValue(1, values[0]);
  }

    }, 
    getbirth(data){
       this.birthdata = data
       console.log(data) 
     },
    //保存基本信息
    baseInfor(){
      console.log(this.nameinfo)
      let username = localStorage.getItem('Username')
      let params = {
          username:username,
          name : this.nameinfo.trim(),
          sex: this.sex,
          birth:this.birthdata,
          phone:this.phoneinfo.trim(),
          school:this.schoolinfo.trim(),
          major:this.majorinfo.trim()
        }
      BaseInfor(params).then(res=>{
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
        if(this.nameinfo.trim()==''||this.sexinfo==''||this.birthdata==''||this.phoneinfo.trim()==''){
          this.$toast({
            message: '请输入完整信息',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
        }else if(phonetest(this.phoneinfo)){
          document.getElementsByClassName('phone_tip')[0].innerHTML='请输入正确的手机号'
        }else if(nametest(this.nameinfo)) {
           document.getElementsByClassName('name_tip')[0].innerHTML='请输入正确的中文姓名'
        }
        else{
          //保存信息
         this.baseInfor()
         this.$router.go(-1)
        }
    },
    //保存基本信息
    saveInfor(){
      this.ifnull() 
      },
    //获取基本信息
    getInfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
      getBaseInfor(params).then(res=>{
        console.log(res)
          if(res.data.code === "0"){
              this.nameinfo = res.data.data.name
              this.birthdata = res.data.data.birth
              this.sex = res.data.data.sex
              this.phoneinfo = res.data.data.phone
              this.schoolinfo = res.data.data.school
              this.majorinfo = res.data.data.major
          }else{
            return
          }
        })
    },
      //更新基本信息
      updateInfo(){
        let user = localStorage.getItem('Username')
        let params = {
          name : this.nameinfo,
          sex: this.sex,
          birth:this.birthdata,
          phone:this.phoneinfo,
          school:this.schoolinfo,
          major:this.majorinfo,
          username:user
        }
      console.log(this.nameinfo)
        updateBase(params).then(res=>{
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
        this.updateInfo()
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
        font-size: 32px;  
     }
  }
  .base_content{
    // width: 100%;
    padding: 0 20px;
    .mint-popup{
       width: 100%;
    }
    .picker-toolbar-title{
      width: 100%;
      display:flex;
      flex-direction: row;
      justify-content: space-around;
      height: 80px;
      line-height: 80px;
      font-size: 32px;
   .usi-btn-cancel,.usi-btn-sure {
        color: #FF6600
     }
    }
    h4{
        margin-bottom: 10px;
        font-size: 32px;
      }
    input{
        height: 50px ;
        width:680px;
        border: none;
        outline-style: none;
        border-bottom: 1px solid black;
        margin-bottom: 40px;
        font-size: 28px;
        padding-left: 20px;
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

