<template>
  <div class="enter_page">
    <span class="go_login" @click="goLoin">已有账号，请前往登录></span>
    <div class="select_role">
      <router-link :to="{name:'Register',params:{role:0}}">
        <img src="@/assets/image/CARRER.svg" alt="">
        <h4>我要找工作</h4>
      </router-link>
      <router-link :to="{name:'Register',params:{role:1}}"> 
        <img src="@/assets/image/ANALYTICS.svg" alt="">
        <h4>我要招聘</h4>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goLoin(){
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
 .enter_page{
   .go_login{
     display: inline-block;
     padding: 20px;
     font-size: 32px;
     color: #9B89ED;
   }
    position: relative;
    width: 100%;
    height: 100%;
   .select_role{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 400px;
    margin-left: -200px;
    text-align: center;
    a{
      color: black;
    }
    h4{
    font-size: 48px;
    font-weight: normal;
    font-weight: bold;
    }
    img{
      cursor: pointer;
      margin-top: 250px;
    }
   }
 }
</style>

