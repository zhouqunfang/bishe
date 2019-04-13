<template>
  <div class="company_detail">
     <go-back></go-back>
    <div class="company_top">
       <span class="company_title">{{companylist.companyTitle}}</span>
       <img src="" alt="">
    </div>
    <div class="company_infor">
      <h4>公司介绍</h4>
      <p>{{companylist.companyContent}}</p>
    </div>
    <div class="company_img">
      <h4>公司照片</h4>
      <img src="" alt="">
    </div>
    <div class="company_msg">
      <h4>工商信息</h4>
        <div>
          <span>公司全称:</span>
          <b>{{companylist.companyFullname}}</b>
        </div>
        <div>
          <span>企业法人:</span>
          <b>{{companylist.companyPerson}}</b>
        </div>
        <div>
          <span>注册时间:</span>
          <b>{{companylist.companyTime}}</b>
        </div>
        <div>
          <span>注册资本:</span>
          <b>{{companylist.companyMoney}}</b>
        </div>
    </div>
  </div>
</template>
<script>
import {Companydetail} from '@/views/api/company/company.js'
import GoBack from '@/views/company/component/goback'   
   export default{
      name:'Companydetail',
      components:{
        GoBack
       },
      data(){
        return{
          companylist:[]        
        }
      },
      mounted(){
        this.companydetail()
        
      },
      methods:{
        companydetail(){
          let router = this.$route.params.companyTitle
          let params ={
            companyTitle: router
          }
          Companydetail(params).then(res =>{
           this.companylist = res.data.data[0]
            console.log(res)
         })
        }
      }
    }
</script>
<style lang="scss" scoped>
  .company_detail{
    padding: 0 30px;
    width: 100%;
    .company_top{
      display: float;
      height: 100px;
      .company_title{
        float: left;
        font-size: 42px;
        font-weight: bolder;
        margin-bottom: 20px;
      }
      img{
        float: right;
      }
    }
    .company_infor{
      h4{
        font-size: 34px;
        font-weight: bolder;
        color: #613CEB;
        margin-bottom: 20px;
      }
      p{
        padding-right: 40px;
        font-size: 28px;
        line-height: 50px;
      }
    }
    .company_img{
      margin-top: 40px;
      h4{
        font-size: 34px;
        font-weight: bolder;
        color: #613CEB;
        margin-bottom: 20px;
      }
    }
    .company_msg{
      margin-top: 40px;
      h4{
        font-size: 34px;
        font-weight: bolder;
        color: #613CEB;
        margin-bottom: 20px;
      }
      span{
        display: inline-block;
        font-size: 28px;
        font-weight: bold;
        color: #EA6088;
        line-height: 80px;
        margin-right: 10px;
      }
      b{
        font-size: 28px;
        font-weight: bold;
      }
    }
  }
</style>
