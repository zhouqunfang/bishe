<template>
    <div id="register">
        <div class="top_title">
            <p>Your Job</p>
            <p>JOB</p>
        </div>
        <div class="inputbox">
            <p>注册</p>
            <input type="text" placeholder="Username" class="input_one" v-model="username">
            <input type="text" placeholder="Password" v-model="inputpassword">
        </div>
    <span class="register_botton" @click="register()">Register</span>
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
      let params = {
        password: this.inputpassword,
        username: this.username
      }
      this.$http.post('/api/user/register', params).then(res => {
        if (res.data.status === 1) {
          this.$toast({
            message: res.data.msg,
            duration: 2000,
            iconClass: 'icon icon-success',
            className: 'success_toast'
          })
          this.$router.push('/')
        } else if (res.data.status === 0) {
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
     .register_botton{
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
