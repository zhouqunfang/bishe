<template>
  <div class="companydetail">
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
    <div>
      <h4>工商信息</h4>
        <div>
          <span>公司全称</span>
          <b>{{companylist.companyFullname}}</b>
        </div>
        <div>
          <span>企业法人</span>
          <b>{{companylist.companyPerson}}</b>
        </div>
        <div>
          <span>注册时间</span>
          <b>{{companylist.companyTime}}</b>
        </div>
        <div>
          <span>注册资本</span>
          <b>{{companylist.companyMoney}}</b>
        </div>
    </div>
  </div>
</template>
<script>
import {Companydetail} from '@/views/api/company/company.js'
    export default{
      name:'Companydetail',
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
