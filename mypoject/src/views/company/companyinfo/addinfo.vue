<template>
  <div class="add_info">
    <go-back></go-back>
    <h4>公司信息</h4>
    <ul>
      <li>
        <p>公司姓名</p>
        <input type="text" id="" v-model="companyTitle">
      </li>
      <li>
        <p>公司介绍</p>
        <textarea  class="text_info" v-model="companyContent"></textarea>
      </li>
      <li class="info_busy">
        <p>工商信息</p>
        <div>
          <span class="info_name">公司全称</span>
          <input type="text"  id="" v-model="companyFullname">
        </div>
        <div>
          <span class="info_name">企业法人</span>
          <input type="text"  id="" v-model="companyPerson">
        </div>
        <div>
          <span class="info_name">注册时间</span>
          <input type="text"  id="" v-model="companyTime">
        </div>
        <div>
          <span class="info_name">注册资本</span>
          <input type="text" name="" id="" v-model="companyMoney">
        </div>
      </li>
    </ul>
    <div class="btn_save" @click="save"><span>保存</span></div>   
 
  </div>
</template>
<script>
import { Addinfor,Getinfor,Updateinfor,imgList } from '@/views/api/recruiter/first.js';
import GoBack from '../component/goback.vue'
export default {
  components:{
    GoBack 
  },
  data(){
    return{
      companyTitle:'',
      companyContent: '',
      companyFullname: '',
      companyPerson: '',
      companyTime: '',
      companyMoney: '',
      router:'',
      base:'',
      files:'',
      imgpath:'',
      route:''
    }
  },
  beforeRouteEnter(to,from,next){
    let route = to.query.id
    next(vm=>{
      if(route===0){
      vm.getinfor()
     }}
    )
  },
  mounted(){
    this.getinfor()
  },
  methods:{
    //保存公司信息
    addinfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username,
        companyTitle: this.companyTitle,
        companyContent: this.companyContent,
        companyFullname: this.companyFullname,
        companyPerson: this.companyPerson,
        companyTime: this.companyTime,
        companyMoney: this.companyMoney,
      }
      Addinfor(params).then(res=>{
        this.$toast({
            message: '保存成功',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          ) 
      })

    },
    //获取公司信息
    getinfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
        Getinfor(params).then(res=>{
          if(res.data.code === "0"){
              this.companyTitle = res.data.data.companyTitle
              this.companyContent = res.data.data.companyContent
              this.companyFullname = res.data.data.companyFullname
              this.companyPerson = res.data.data.companyPerson
              this.companyTime = res.data.data.companyTimes
              this.companyMoney = res.data.data.companyMoney
          }else{
            return
          }
        })
    },
    //更新公司信息
    updateinfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username,
        companyTitle: this.companyTitle,
        companyContent: this.companyContent,
        companyFullname: this.companyFullname,
        companyPerson: this.companyPerson,
        companyTime: this.companyTime,
        companyMoney: this.companyMoney,
        companySrc:this.imgpath
      }
      Updateinfor (params).then(res=>{
        if(res.data.code==='0'){
              this.$toast({
                message: res.data.msg,
                duration: 2000,
                iconClass: 'icon icon-success',
                className: 'success_toast'
              }
            )
          }
      })
      console.log('更新')
    } ,
    // 保存公司信息
    save(){
      if(this.router===0){
        console.log(35434)
        this.$router.go(-1)
      }else{
      this.addinfor()
      this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .add_info{
      padding: 20px 40px;
      h4{
        text-align: center;
        font-size: 34px;
        font-weight:bold;
        margin-bottom: 40px;
      }
      ul{
        li{
          margin-bottom: 40px;
          p{
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 30px;
          }
          input{
            margin-bottom: 20px;
            width: 100%;
            font-size: 34px;
            border: none;
            outline: none;
            border-bottom: 2px solid black;
          }
        }
        .info_busy{
            .info_name{
              display: inline-block;
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 20px;
              margin-left: 30px;
            }
            input{
              font-size: 32px;
              margin-left: 30px;
            }
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
      .text_info{
        outline: none;
        border:none;
        font-size: 32px;
        width:100%;
        height:200px;
        border: 2px solid black;
      }
    }

</style>


