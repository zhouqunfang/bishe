<template>
  <div class="companydetail">
    <div class="company_top">
       <span class="company_title">{{companylist[0].companyTitle}}</span>
       <img src="" alt="">
    </div>
    <div class="company_infor">
      <h4>公司介绍</h4>
      <p></p>
    </div>
    <div class="company_img">
      <h4>公司照片</h4>
      <img src="" alt="">
    </div>
    <div>
      <h4>工商信息</h4>
        <div>
          <span>公司全称</span>
          <b></b>
        </div>
        <div>
          <span>企业法人</span>
          <b></b>
        </div>
        <div>
          <span>注册时间</span>
          <b></b>
        </div>
        <div>
          <span>注册资本</span>
          <b></b>
        </div>
    </div>
  </div>
</template>
<script>
import {Searchcompany} from '@/views/api/company/company.js'
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
          Searchcompany().then(res =>{
           this.companylist = res.data.companyList
            console.log(res)
         })
        }
      }
    }
</script>
