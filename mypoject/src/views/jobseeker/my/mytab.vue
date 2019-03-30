<template>
    <div class="myTab">
        <section class="resume_content">
          <div class="base_infor">
<<<<<<< HEAD
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
=======
            <div class="ifshow_infor" @click="goAdd">
              <div>添加基本信息</div>
              <span>+</span>
            </div>
          </div>
          <div class="search_infor">
            <div class="ifshow_infor">
              <div>添加求职意向</div> 
>>>>>>> e0c84e828594f9fc3863a7fe52bbe031f018f5a0
              <span>+</span>
              </div>
          </div>
          <div class="job_infor">
            <div class="ifshow_infor">
<<<<<<< HEAD
              <div class="add_info">添加工作经验</div>
=======
              <div>添加工作经验</div>
>>>>>>> e0c84e828594f9fc3863a7fe52bbe031f018f5a0
              <span>+</span>
            </div>
          </div>
          <div class="poject_infor">
            <div class="ifshow_infor">
<<<<<<< HEAD
              <div class="add_info">添加项目经历</div>
=======
              <div>添加项目经历</div>
>>>>>>> e0c84e828594f9fc3863a7fe52bbe031f018f5a0
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
<<<<<<< HEAD
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
=======
      
    }
  },
  methods:{
    goAdd(){
      this.$router.push('/my/resume')
>>>>>>> e0c84e828594f9fc3863a7fe52bbe031f018f5a0
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
<<<<<<< HEAD
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
=======
      height: 40px;
      padding:20px 0 ;
      text-align: center;
      border: 1px solid black;
      font-size: 28px;
>>>>>>> e0c84e828594f9fc3863a7fe52bbe031f018f5a0
      span{
        display: inline-block;
        position: absolute;
        width:40px;
        height: 40px;
        font-size: 55px;
        top:50%;
<<<<<<< HEAD
        left:50%;
        margin-left: -20px;
=======
>>>>>>> e0c84e828594f9fc3863a7fe52bbe031f018f5a0
        margin-top:-20px;
        left:420px;
        text-align: center;
        line-height: 40px;
      }
<<<<<<< HEAD
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
=======
>>>>>>> e0c84e828594f9fc3863a7fe52bbe031f018f5a0
    }
  }
}
</style>
