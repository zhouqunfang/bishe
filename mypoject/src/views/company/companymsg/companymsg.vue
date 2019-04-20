<template>
    <div class="compangyMsg">
      <div 
        class="resume_msg" 
        v-for="(item,index) in resumeList"
        :key="index"
        @click.stop="getdetail(item.username)"
        >
        <span>{{item.username}}</span>
        <span>发来简历</span>
        <span @click.stop="deletereRumeMsg(item._id,index)">删除</span>
      </div>
      <footer-bar></footer-bar>
    </div>
</template>
<script>
import FooterBar from '../component/tab.vue'
import {getresumeMsg,deleteresumeMsg} from '../../api/recruiter/first.js'
export default {
  name:'Companymsg',
  components:{
    FooterBar 
  },
  data(){
    return{
       resumeList:[]
    }
  },
  mounted(){
    this.getResumeMsg()
  },
  methods:{
    //获取简历详情
    getdetail(value){
      this.$router.push({path:'/resume',query:{username:value}})
      console.log(1111)
          },
    //获取简历消息
    getResumeMsg(){
      let username = localStorage.getItem('Username')
      let params = {
        jobCompany:username
      }
      getresumeMsg(params).then(res=>{       
         this.resumeList = res.data.data
        console.log(this.resumeList)
      })
    },
    //删除简历接收消息
    deletereRumeMsg(id,index){
     this.resumeList.splice(index,1)
      let _id = id
      let params ={
        _id:_id 
      }
      deleteresumeMsg(params).then(res=>{
          console.log(res)
      })
    }
  }
  
}
</script>
