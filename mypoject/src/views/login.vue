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

export default {
  data () {
    return {
      username: '',
      inputpassword: ''
    }
  },
  mounted () {

  },
  methods: {
    login () {
      let params = {
        password: this.inputpassword,
        username: this.username
      }
      this.$store.dispatch('set_token', params).then(() => {
        // mint ui toast
        let toast = this.$store.state.toast
        // console.log(toast)
        this.$toast({
          message: toast.message,
          duration: 2000,
          iconClass: 'icon icon-success',
          className: 'success_toast'
        }
        )
        this.$router.push({path: '/index'})
      }).catch(err => {
        this.$toast({
          message: err,
          duration: 2000,
          iconClass: 'licon icon-success',
          className: 'success_toast'
        }
        )
      })
    }
    }

}
// this.$http.post('/api/user/sign',
//   params
// ).then(res => {
//   // console.log(res)
//   if (res.data.status === 2) {
//     this.$toast({
//       message: res.data.msg,
//       duration: 2000,
//       iconClass: 'icon icon-success',
//       className: 'success_toast'
//     })
// 根据store中set_token方法将token保存至localStorage/sessionStorage中，获取token的value值
// this.$store.commit('set_token', res.data['token'])
// if (this.$store.state.token) {
//   this.$router.push('/index')

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
