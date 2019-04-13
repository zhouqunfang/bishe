<template>
  <div class="first_list">
    <div class="first_list_top">
      <img src="../../../assets/image/resume.svg" alt="">
      <span>个人简历</span>
    </div>
     <div 
          class="resume_info" 
          v-for="(item,index) in resumelist" 
          :key=index 
          @click="getresume(item.username)"
          >
       <div>
         <h2>{{item.job}}</h2>
         <span>{{item.username}}</span>
       </div>
       <div>
         <span>
           {{item.salary}}
         </span>
         <span> {{item.city}}</span>
         <span>{{item.jobaim}}</span>
       </div>
     </div>
  </div>
</template>
<script>
import {Resumeinfor} from '@/views/api/recruiter/first.js';
export default {
  name:'Firstlist',
  data(){
    return{
    resumelist:[]
    }

  },
  mounted(){
      this.getjobInfor()
  },
  methods:{
    getjobInfor(){
      Resumeinfor().then(res=>{
          if(res.data.code === "0"){
              this.resumelist = res.data.data
              console.log(res.data.data)
          }else{
            return
          }
        })
    },
    getresume(value){
        console.log(value)
        this.$router.push({path:'/resume',query:{username:value}})
    }
  }
}
</script>
<style lang="scss" scoped>
    .first_list{
      padding: 20px 20px;
      .first_list_top{
        text-align: center;
        height: 70px;
        line-height: 70px;
      span{
        font-size: 34px;
        font-weight: bolder;
      }
      img{
        margin-right: 10px;
        margin-bottom: -5px;
      }
      }
      .resume_info{
         margin-bottom: 40px;
        h2{
          margin-bottom: 20px;
          font-size: 34px;
          font-weight: bolder;
        }
        span{
          margin-bottom: 10px;
          font-size: 28px;
          margin-right: 20px;
        }
      }
    }
</style>


