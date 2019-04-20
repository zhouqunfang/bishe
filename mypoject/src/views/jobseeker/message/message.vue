<template>
    <div class="select_position">
        <div 
          class="company_msg" 
          v-for="(item,index) in companyMsg"
          :key="index"
          >
          <router-link
              :to="{name:'Companydetail',params:{companyTitle:item.companyTitle}}"   
          >
            <span>{{item.companyTitle}}</span>
            <span>发来消息</span>
          </router-link> 
          <span @click="deletelist(item._id,index)">删除</span>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import FooterBar from '../../component/footerbar'
import {getMessage,deleteMsg} from '@/views/api/message/message.js'
export default {
  name: 'Message',
  components: {
    FooterBar
  },
  mounted(){
      this.getmessage()
  },
  data () {
    return {
     companyMsg:[]
    }
  },
  methods: {
    getmessage(){
    let personusername = localStorage.getItem('Username')
     let params ={
        personusername:personusername
      }
      getMessage(params).then(res=>{
        this.companyMsg = res.data.data
        console.log(res.data.data)
      })
     },
     deletelist(_id,index){
        this.companyMsg.splice(index,1)
        let params={
          _id:_id
        }
        deleteMsg(params).then(res=>{
            console.log(res.data)
        })
     }
    }
  }
    
</script>
<style lang="scss" scoped>
@import './message.scss';
</style>
