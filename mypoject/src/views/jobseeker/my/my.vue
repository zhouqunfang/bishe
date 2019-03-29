<template>
    <div class="myList">
      <div class="my_title">
        <span></span>
        <h1>我的简历</h1>
      </div>
        <my-tab></my-tab>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import FooterBar from '../../component/seeker/footerbar'
import MyTab from './mytab'

export default {
  name: 'Message',
  components: {
    FooterBar,
    MyTab
  },
  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
<style lang="scss" scoped>
    .my_title{
      position: relative;
      display: flex;
      align-items: center;
      span{
        position: absolute;
        display: inline-block;
        margin-left: 20px;
        width:40px;
        height: 40px;
        background: url('../../../assets/image/triangle.png') center no-repeat;
       
      }
      h1{
        width: 100%;
        text-align: center;
        padding: 20px 0 20px 0;
        font-weight: bold;
        font-size: 35px;  
     }
    }
</style>
