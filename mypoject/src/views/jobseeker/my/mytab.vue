<template>
    <div class="myTab">
        <section class="resume_content">
          <div class="base_infor">
            <div class="ifshow_infor" @click="goAdd">
              <div>添加基本信息</div>
              <span>+</span>
            </div>
          </div>
          <div class="search_infor">
            <div class="ifshow_infor">
              <div>添加求职意向</div> 
              <span>+</span>
              </div>
          </div>
          <div class="job_infor">
            <div class="ifshow_infor">
              <div>添加工作经验</div>
              <span>+</span>
            </div>
          </div>
          <div class="poject_infor">
            <div class="ifshow_infor">
              <div>添加项目经历</div>
              <span>+</span>
            </div>    
          </div>
        </section>
    </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  methods:{
    goAdd(){
      this.$router.push('/my/resume')
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import '../../../assets/css/seeker/mytab.css'; */
.myTab{
  .resume_content{
    padding: 20px 40px;
    div{
      margin-bottom: 50px;
    }
    .base_infor,.search_infor,.job_infor,.poject_infor{
      position: relative;
      width: 100%;
      height: 40px;
      padding:20px 0 ;
      text-align: center;
      border: 1px solid black;
      font-size: 28px;
      span{
        display: inline-block;
        position: absolute;
        width:40px;
        height: 40px;
        font-size: 55px;
        top:50%;
        margin-top:-20px;
        left:420px;
        text-align: center;
        line-height: 40px;
      }
    }
  }
}
</style>
