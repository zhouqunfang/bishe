<template>
  <div class="company_info">
    <div class="add_info" v-if="ifshow">
        <h4 @click=addDetail>请完善公司信息+</h4>
    </div>
    <div class="base_detail" v-if="ifappear">
        <div class="base_update" @click="infoAdd"></div>
      <ul>
          <li>
            <p class="info_name">公司姓名</p>
            <p class="info_content">{{companyTitle}}</p>
          </li>
          <li>
            <p class="info_name">公司介绍</p>
            <p class="info_content">{{companyContent}}</p>
          </li>
          <li>
            <p class="info_name">工商信息</p>
            <div>
              <span class="min_title">公司全称</span>
              <p class="info_min">{{companyFullname}}</p>
            </div>
            <div>
              <span class="min_title">企业法人</span>
              <p class="info_min">{{companyPerson}}</p>
            </div>
            <div>
              <span class="min_title">注册时间</span>
              <p class="info_min">{{companyTime}}</p>
            </div>
            <div>
              <span class="min_title">注册资本</span>
              <p class="info_min">{{companyMoney}}</p>
            </div>
          </li>
          <li class="info_name">
           <img :src="coverImgUrl" alt="">
          </li>
      </ul>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import FooterBar from '../component/tab.vue'
import { Getinfor } from '@/views/api/recruiter/first.js';
export default {
  name:'Companyinfo',
  components:{
    FooterBar
  },
  data(){
    return{
      ifshow:true, 
      companyTitle :'',
      companyContent:'', 
      companyFullname :'',
      companyPerson :'',
      companyTime :'',
      companyMoney :'',
      ifappear :false,
      coverImgUrl:''
    }
  },
  created(){
    this.getinfor()
  },
  mounted(){

  },
  methods:{
    addDetail(){
      this.$router.push('./addinfo')
    },
    //获取公司信息
    getinfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
        Getinfor(params).then(res=>{

          if(res.data.code === "0"){
                      console.log(res.data,2112423)
              this.ifshow = false 
              this.companyTitle = res.data.data.companyTitle
              this.companyContent = res.data.data.companyContent
              this.companyFullname = res.data.data.companyFullname
              this.companyPerson = res.data.data.companyPerson
              this.companyTime = res.data.data.companyTime
              this.companyMoney = res.data.data.companyMoney
              this.ifappear = true
              this.coverImgUrl = "static/image/"+res.data.data.companySrc
          }else{
            this.ifshow = true
          }
        })
    },
    infoAdd(){
         //如果已经有公司信息的跳转
      this.$router.push({name:'Addinfo',query:{id:0}})
      }
    }
  }
</script>
<style lang="scss" scoped>
    .company_info{
      padding: 20px 40px;
     .base_detail{
        .base_update{
          position: absolute;
          display: inline-block;
          right:20px;
          top:10px;
          width:80px;
          height:80px; 
          background: url('../../../assets/image/update.svg') center no-repeat;
        }
      }
      ul{
        li{
          margin-bottom: 40px;
          .info_name{
            font-size: 36px;
            font-weight:bolder;
            margin-bottom: 20px;
          }
          .info_content{
            font-size: 32px;
            line-height: 50px;
            margin-bottom: 30px;
          }
          .min_title{
              display: inline-block;
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .info_min{
              margin-left: 30px;
              margin-bottom: 30px;
              font-size: 32px;
            }
            .imgsrc{
              width: 200px;
              height: 200px;
            }
        }
      }
    }

</style>

