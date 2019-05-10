<template>
    <div id="login">
        <div class="login_content">
          <p class="login_title">Sign In</p>
          <div class="inputbox">
              <input type="text" placeholder="Username" class="input_one" v-model="username">
              <input type="text" placeholder="Password" v-model="inputpassword">
          </div>
          <span class="login_botton" @click="login()">
            登录
          </span>
        </div>
    </div>
</template>
<script>
import { SignIn } from '@/views/api/api.js'
export default {
  data () {
    return {
      username: '',
      inputpassword: ''
    }
  },
  created () {
    // this.haveToken()
  },
  computed:{

  },
  methods: {
    //判断有误token
    haveToken(){
      let role = this.$store.state.role
      let token = localStorage.getItem('Token')
      if(token){
        this.$router.push('/index')
      }
    },
    login () {
      let params = {
        password: this.inputpassword,
        username: this.username
      }
      SignIn(params).then(res=>{
          localStorage.setItem('Token', res.data.token) // 登录成功后将token存储在localstorage之中
          localStorage.setItem('Username', res.data.username) // 登录成功后将用户名存储在localstorage之中
          let role = res.data.role
          this.$store.dispatch('set_role',role).then(()=>{
           localStorage.setItem('Role', role) 
            console.log(this.$store.state.routers,654645)
            this.$router.addRoutes(this.$store.state.routers)  // 添加路由
          })
          if(res.data.status === 0){
              this.$toast({
                message: res.data.msg,
                duration: 2000,
                iconClass: 'icon icon-success',
                className: 'success_toast'
              }
            )
          }else if(res.data.status === 1){
             this.$toast({
                message: res.data.msg,
                duration: 2000,
                iconClass: 'icon icon-success',
                className: 'success_toast'
              }
            )
          }else{
            if(role === 0){
              this.$router.push({path: '/index'})
            }else{
              this.$router.push({path: '/first'})
            }
          }
       })
      }
    }
}
</script>
<style lang="scss" scoped>
    #login{
      padding:300px 60px;
      text-align: center;
      .login_content{

          .login_title{ 
            font-size: 50px;
       }
          .inputbox{
            display: flex;
            flex-direction: column;
            input{
              flex:1;
              margin-top:60px;
              outline: none;
              border: none;
              height: 50px;
              font-size: 34px;
              padding: 20px 10px;
              border-bottom: 2px solid #CDCDCD;
            }         
          }
        .login_botton{
          position: relative;
          display: inline-block;
          margin-top: 80px;
          padding: 24px 0;
          width: 100%;
          font-size: 34px;
          text-align: center;
          background: #9B89ED;
          border-radius: 50px;
        }
        // .btn_left{
        //     position: absolute;
        //     // display: inline-block;
        //     width: 96px;
        //     height: 96px;
        //     border-radius: 50%;
        //     background: #9B89ED; 
        //     bottom: -2px;
        //     left: -42px;
        //   } 
        // .btn_right{
        //     position: absolute;
        //     // display: inline-block;
        //     width: 96px;
        //     height: 96px;
        //     border-radius: 50%;
        //     background: #9B89ED; 
        //     bottom: 0;
        //     right: -40px;
        //   } 
      }
    }
</style>
