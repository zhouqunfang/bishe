<template>
    <div id="register">
        <div class="login_content">
          <p class="login_title">Sign UP</p>
          <div class="inputbox">
              <input type="text" placeholder="Username" class="input_one" v-model="username">
              <input type="text" placeholder="Password" v-model="inputpassword">
          </div>
          <span class="login_botton" @click="register()">
            注册
          </span>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      inputpassword: ''
    }
  },
  methods: {
    register () {
      console.log(4234234)
      let params = {
        password: this.inputpassword,
        username: this.username
      }
      this.$http.post('/api/user/register', params).then(res => {
        // console.log(res)
        this.$store.dispatch('add_toast', res.data.msg)
        if (res.data.status === 1) {
           this.$toast({
            message: res.data.msg,
            duration: 800,
            iconClass: 'icon icon-success',
            className: 'success_toast'
          })
          this.$router.push('/')
        }else if (res.data.status === 0) {
          this.$toast({
            message: res.data.msg,
            duration: 2000,
            iconClass: 'icon icon-success',
            className: 'success_toast'
          })
        } else if (res.data.status === 2) {
          this.$toast({
            message: res.data.msg,
            duration: 2000,
            iconClass: 'icon icon-success',
            className: 'success_toast'
          })
        }
      }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
    #register{
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
      }
    }
</style>
