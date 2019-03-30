<template>
    <div class="myTab">
        <section class="resume_content">
          <div class="base_infor">
            <div class="ifshow_infor"  v-if="ifshow">
              <div class="add_info">添加基本信息</div>
              <span>+</span>
            </div>
            <div class="base_detail">
              <div class="base_update" @click="goAdd"></div>
              <h4>基本信息</h4>
              <h3>{{basename}}</h3>
              <div class="base_some">
                <b>{{basesex}}</b>
                <b>{{basephone}}</b>
                <b>{{basemajor}}</b>
              </div>
            </div>
          </div>
          <div class="search_infor">
            <div class="ifshow_infor">
              <div class="add_info">添加求职意向</div> 
              <span>+</span>
              </div>
          </div>
          <div class="job_infor">
            <div class="ifshow_infor">
              <div class="add_info">添加工作经验</div>
              <span>+</span>
            </div>
          </div>
          <div class="poject_infor">
            <div class="ifshow_infor">
              <div class="add_info">添加项目经历</div>
              <span>+</span>
            </div>    
          </div>
        </section>
    </div>
</template>
<script>
import {getBaseInfor} from '@/views/api/resume/resume.js';
export default {
  data () {
    return {
      ifshow:true,
      basename:'',
      basephone:'',
      basesex:'',
      basemajor:''
    }
  },
  mounted(){
    this.getbaseInfor()
  },
  methods:{
    goAdd(){
      console.log(11111)
      this.$router.push({name:'Resume',query:{id:0}})
      this.$router.go(0)
    },
    //获取基本信息
    getbaseInfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
      getBaseInfor(params).then(res=>{
        console.log(res)
          if(res.data.code === "0"){
              this.ifshow = false 
              this.basename = res.data.data.name
              this.basebirth = res.data.data.birth
              this.basesex = res.data.data.sex
              this.basephone = res.data.data.phone
              this.basemajor = res.data.data.major
          }else{
            this.ifshow = true
          }
        })
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
      padding:20px 0 ;
      border: 1px solid black;
      font-size: 28px;
      .add_info{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -20px;
        height: 20px;
        width: 200px;
      }
      span{
        display: inline-block;
        position: absolute;
        width:40px;
        height: 40px;
        font-size: 55px;
        top:50%;
        left:50%;
        margin-left: -20px;
        margin-top:-20px;
        left:420px;
        text-align: center;
        line-height: 40px;
      }
      .base_detail{
        .base_update{
          position: absolute;
          display: inline-block;
          right:20px;
          top:0;
          width:80px;
          height:80px;
          background: url('../../../assets/image/update.svg') center no-repeat;
        }
      }
    }
  }
}
</style>
