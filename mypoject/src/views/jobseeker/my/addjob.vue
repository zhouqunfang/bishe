<template>
<div class="job_infor">
  <div class="infor_title">
    <span @click="goback"></span>
    <h4>求职意向</h4>
  </div>
  <div class="job_content">
    <div class="job_city">
      <h4>城市<span style="color:red">*</span><b style="color:#84d945" class="name_tip"></b></h4>
      <input type="text"  v-model="cityinfo" @click="showcity">
      <position-piker
            :is-show.sync='city.isShow'
            :on-choose='city.onChoose'
            :city-data='city.cityData'
            :local-city='city.localCity'
            :close="close"
            >
      </position-piker>
    </div>
    <div class="job_select">
      <h4>职位<span style="color:red">*</span></h4>
      <input type="text"  v-model="jobinfo">
    </div>
    <div class="job_aim">
      <h4>工作性质<span style="color:red">*</span></h4>
      <input type="text"  v-model="jobaim">
    </div>
    <div class="job_salary">
      <h4>期望薪资<span style="color:red">*</span><b style="color:#84d945" class="phone_tip"></b></h4>
      <input type="text" name="" id="" v-model="salaryinfo" @click="ShouPup">
      <mt-popup
        v-model="popupVisible"
        position="bottom"
        popup-transition="popup-fade" 
        closeOnClickModal="true">
        <mt-picker
          :slots="slots" 
          @change="onValuesChange" 
          class="picker_mt"
          showToolbar
          >
          <div class="picker-toolbar-title">
             <div class="usi-btn-cancel" 
             @click="popupVisible = !popupVisible">
             取消
             </div>
             <div class="">请选择性别</div>
             <div class="usi-btn-sure" 
                  @click="popupVisible = !popupVisible">
                  确定
             </div>
          </div>
        </mt-picker>
      </mt-popup>
    </div>    
  </div>
  <div @click="saveInfor" v-if="ifSave" class="btn_save"><span>保存</span></div>
  <div @click="updateInfor" v-if="ifUpdate" class="btn_save"><span>保存</span></div>
</div>
</template>
<script>
// import  datepickers from './datePickers.vue';
import {getJobInfor,JobInfor,updateJobInfor} from '@/views/api/resume/resume.js';
import {phonetest,nametest} from '@/assets/js/test.js';
import PositionPiker from '../../component/PositionPiker'
export default {
  components:{ 
    PositionPiker,
},
  data(){
    return{
      cityinfo:'',
      jobinfo:'',
      salaryinfo:'',
      jobaim:'',
      ifSave:true,
      ifUpdate:false,
      city: {
        isShow: false,
        cityData: [],
        onChoose: null,
        localCity: {},
        searchMessage: '',
        username:''
      },
      youChoiceCityName: '广州',
      showToolbar: true,
      popupVisible:false,
      slots: [
        { 
          flex:1,
          defaultIndex:1,
          values: ['面议', '1k','2k','3k','4k','5k',
                    '6k','7k','8k','9k',
                    '10k','11k','10k','11k','10k','11k',
                    '12','13k','14k','15k','16k','17k',
                    '18k','19k','20k','21k','22k','23k'
                    ],
          className:'slot1',
          textAlign:'center'
        },
        {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['面议','2k','3k','4k','5k',
                    '6k','7k','8k','9k',
                    '10k','11k','12k','13k',
                    '14k','15k','16k','17k',
                    '18k','19k','20k','21k',
                    '22k','23k','24k'
                    ],
            className: 'slot3',
            textAlign: 'center'
          },   
      ]
    }
  },
    beforeRouteEnter(to, from, next){  
      let route= to.query.id
      console.log(route)
      // 因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，在next方法里可以把vm当this来用。
      next(vm=>{
        if(route===0){
          console.log(4864646)
            vm.getjobInfor()
            vm.ifSave = false
            vm.ifUpdate=true
          }
        })
    },
  mounted(){
    this.getCityInfo()
    this.city.onChoose = res => {
      // ToDo: 选完城市后......
      // console.log(res)
      this.city.isShow = false
      this.youChoiceCityName = res.cityName
      this.cityinfo = res.cityName
    }
    this.updatBase()    
  },
  methods:{
  //获取职位意向编辑页
      updatBase(){
        if(this.$route.query.id){
          this.getjobInfor()
          this.ifSave = false
          this.ifUpdate=true
        }
      },
    ShouPup(){
      this.popupVisible = true
      },
    onValuesChange(picker, values){
       let value =  values
       let valueArr= []
       for(var i in value){
         valueArr.push(value[i])
       }
       let valueString = valueArr.join('-')
        this.salaryinfo = valueString
        if(values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
       }
    },
    showcity(){
        this.city.isShow = true
    },
    getCityInfo () {
      this.$http.get('./static/data/city.json').then(res =>{
          this.city.cityData = res.data.city
      })
      // this.city.localCity = {
      //   cityId: 301,
      //   cityName: '广州',
      //   citySpell: 'BAOSHAN',
      //   cityFirstLetter: 'B'
      // }
    },
    choiceCity: function () {
      this.city.isShow = true
    },
    close () {
      this.city.isShow = false
      this.city2.isShow = false
    },
    //返回
    goback(){
        this.$router.go(-1)
    },
    //保存基本信息
    searchJobInfor(){
      console.log("gsdfjgsdfjg")
      let username = localStorage.getItem('Username')
      let params = {
          username:username,
          city : this.cityinfo,
          salary: this.salaryinfo,
          job:this.jobinfo,
          jobaim:this.jobaim
        }
      JobInfor(params).then(res=>{
         this.$toast({
            message: '保存成功',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )  
        })
    },
    //判断信息是否为空
    ifnull(){
        if(this.cityinfo==''||this.jobinfo==''||this.salaryinfo==''){
          this.$toast({
            message: '请输入完整信息',
            duration: 2000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
        }else{
          //保存信息
         this.searchJobInfor()
         this.$router.go(-1)
        }
    },
    //保存基本信息
    saveInfor(){
      this.ifnull() 
      },
    //获取基本信息
    getjobInfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
      getJobInfor(params).then(res=>{
        console.log(res)
          if(res.data.code === "0"){
              this.cityinfo = res.data.data.city
              this.jobinfo = res.data.data.job
              this.salaryinfo = res.data.data.salary
              this.jobaim = res.data.data.jobaim
          }else{
            return
          }
        })
    },
      //更新基本信息
      updateInfo(){
        console.log(464654646)
        let user = localStorage.getItem('Username')
        let params = {
          city : this.cityinfo,
          salary:this.salaryinfo,
          job:this.jobinfo,
          jobaim:this.jobaim,
          username:user
        }
        updateJobInfor(params).then(res=>{
          if(res.data.code === "0"){
          this.$toast({
            message: '保存成功',
            duration: 1000,
            iconClass: 'licon icon-success',
            className: 'success_toast'
              }
          )
          this.$router.push('/my')
          }
        })
      },
      //保存编辑页
      updateInfor(){
        this.updateInfo()
        }
      }
    }
  

</script>
<style lang="scss" scoped>
.job_infor{
  .infor_title{
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
      h4{
        width: 100%;
        text-align: center;
        padding: 20px 0 20px 0;
        font-weight: bold;
        font-size: 35px;  
     }
  }
  .job_content{
    padding: 0 20px;
    width: 100%;
       .mint-popup{
       width: 100%;
    }
    .picker-toolbar-title{
      width: 100%;
      display:flex;
      flex-direction: row;
      justify-content: space-around;
      height: 80px;
      line-height: 80px;
      font-size: 32px;
   .usi-btn-cancel,.usi-btn-sure {
        color: #FF6600
     }
    } 
    h4{
        margin-bottom: 10px;
        font-size: 28px;
      }
    input{
        height: 50px ;
        width:600px;
        border: none;
        outline-style: none;
        border-bottom: 1px solid black;
        margin-bottom: 40px;
        font-size: 28px;
        padding-left: 20px;
      }  
    .mint-popup-bottom{
      width:100%;
    }

  }
  .btn_save{
    position: relative;
    height: 80px;
    span{
    position: absolute;
    width: 700px;
    height: 100px;
    line-height: 100px;
    top: 50%;
    margin-top: -25px;
    left: 50%;
    margin-left: -350px;
    text-align: center;
    background: #613CEB;
    border-radius: 10px;
    color: #ffff;
    font-size: 32px;
    }
  }
}
</style>

