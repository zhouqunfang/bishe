<template>
    <div id="login">
        <div class="top_title">
            <p>Your Job</p>
            <p>JOB</p>
        </div>
        <div class="inputbox">
            <p>请登录</p>
            <input type="text" placeholder="Username" class="input_one" v-model="username">
            <input type="text" placeholder="Password" v-model="inputpassword">
        </div>
        <span class="login_botton" @click="login()">Login</span>
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
        position: relative;
        text-align: center;
        .top_title{
            width: 100%;
            height: 650px;
            padding-top: 100px;
            background: #858fe9;
        p{
                line-height: 30px;
                font-size: 20px;
            }
        }
        .inputbox{
            position: absolute;
            top: 600px;
            left: 50%;
            right: 50%;
            padding: 101px 0 100px;
            width: 650px;
            transform: translate(-50%, 0);
            border: 2px solid #e8e8e893;
            border-radius: 5px;
            background: #fff;
          input{
              padding: 30px 30px;
              width: 530px;
              border: none;
              outline: none;
              border-radius: 5px;
              background: #f6f6f6;
              text-align: center;

          }
          .input_one{
              margin:30px 0 40px;
          }
        }
     .login_botton{
        display: block;
        position: relative;
        width: 650px;
        left: 50%;
        right: 50%;
        top: 430px;
        transform: translate(-50%, 0);
        padding: 30px 0;
        color: #fff;
        border-radius: 5px;
        background: #5c82e3;
     }

    }
</style>
