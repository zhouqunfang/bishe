<template>
  <div class="company_info">
    <div class="add_info" v-if="ifshow">
        <h4 @click=addDetail>请完善公司信息+</h4>
    </div>
    <div class="base_detail" v-if="ifappear">
        <div class="base_update" @click="infoAdd"></div>
      <ul>
          <li>
            <p>公司姓名</p>
            <p>{{companyTitle}}</p>
          </li>
          <li>
            <p>公司介绍</p>
            <p>{{companyContent}}</p>
          </li>
          <li>
            <p>工商信息</p>
            <div>
              <span>公司全称</span>
              <p>{{companyFullname}}</p>
            </div>
            <div>
              <span>企业法人</span>
              <p>{{companyPerson}}</p>
            </div>
            <div>
              <span>注册时间</span>
              <p>{{companyTime}}</p>
            </div>
            <div>
              <span>注册资本</span>
              <p>{{companyMoney}}</p>
            </div>
          </li>
          <li>
            上传公司照片
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
      ifappear :false
    }
  },
  mounted(){
    this.getinfor()
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
          console.log(res.data)
          if(res.data.code === "0"){
              this.ifshow = false 
              this.companyTitle = res.data.data.companyTitle
              this.companyContent = res.data.data.companyContent
              this.companyFullname = res.data.data.companyFullname
              this.companyPerson = res.data.data.companyPerson
              this.companyTime = res.data.data.companyTime
              this.companyMoney = res.data.data.companyMoney
              this.ifappear = true
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
     .base_detail{
        .base_update{
          position: absolute;
          display: inline-block;
          right:20px;
          top:0;
          width:80px;
          height:80px; 
          background: url('../../../assets/image/update.svg') center no-repeat;
        }
      }
</style>

