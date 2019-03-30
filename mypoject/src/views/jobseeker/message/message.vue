<template>
    <div class="select_position">
      <div class="chat_title">
        <span>></span>
        <b>{{chatWith}}</b>
      </div>
        <div class="chat_list">
          <input type="text" >
          <div class="chat_button"  @click="sendMessage">发送</div>
        </div>
        <!-- <footer-bar></footer-bar> -->
    </div>
</template>

<script>
// import FooterBar from '../../component/seeker/footerbar'
import {TouserInfo,ChatWith} from '@/views/api/message/message.js'
export default {
  name: 'Message',
  components: {
    // FooterBar
  },
  created(){
    this.TouserInfo()
  },
  data () {
    return {
      chatWith:'',
      tUserInfo:'',
      chatWithId: '',
      content: '',
      dataList: []
    }
  },
  computed:{
    userInfo() {
        return  this.$store.state.userInfo
    }
  },
  methods: {
    //获取聊天对象信息
    TouserInfo(){
      let _this = this
      TouserInfo({username:'123'}).then(res=>{
        console.log(res.data)
        this.tUserInfo = res.data
        this.chatWith = res.data[0].username
      })
    },
    sendMessage() {
        let params = 
        {
                chatWithId: this.tUserInfo._id,
                user_id: this.userInfo._id,
                content: this.content
        }
        ChatWith(params).then(res=>{
            //把自己发送的内容更新到dataList中
                this.dataList.push({
                  // user_id: {//这个有点乱了，这个是自己的信息
                  //   avater: this.userInfo.avater
                  // },
                  chatWith: {
                    _id: this.chatWithId
                  },
                  addTime: Date.now(),
                  content: this.content 
                })
                console.log(this.dataList)
              //要发送给对方的数据
                let data = {
                  from_user: this.userInfo.username,//发送方
                  to_user: this.chatWith,//接收方
                  message: this.content,//消息内容
                  time: Date.now(), //时间);
                  _id: this.userInfo._id
                }
                io.emit('chat', data);
                this.content = '';
        })
      }
    }
  }

        
      
</script>
<style lang="scss" scoped>
@import './message.scss';
</style>
