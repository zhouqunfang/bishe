<template>
  <div class="add_info">
    <go-back></go-back>
    <h4>公司信息</h4>
    <ul>
      <li>
        <p>公司姓名</p>
        <input type="text" name="" id="" v-model="companyTitle">
      </li>
      <li>
        <p>公司介绍</p>
        <input type="text" name="" id="" v-model="companyContent">
      </li>
      <li>
        <p>工商信息</p>
        <div>
          <span>公司全称</span>
          <input type="text" name="" id="" v-model="companyFullname">
        </div>
        <div>
          <span>企业法人</span>
          <input type="text" name="" id="" v-model="companyPerson">
        </div>
        <div>
          <span>注册时间</span>
          <input type="text" name="" id="" v-model="companyTime">
        </div>
        <div>
          <span>注册资本</span>
          <input type="text" name="" id="" v-model="companyMoney">
        </div>
      </li>
      <li>
        上传公司照片
      </li>
    </ul>
    <div class="save_btn" @click="save">保存</div>
  </div>
</template>
<script>
import { Addinfor,Getinfor,Updateinfor } from '@/views/api/recruiter/first.js';
import GoBack from '../component/goback.vue'
export default {
  components:{
    GoBack 
  },
  data(){
    return{
      companyTitle:'',
      companyContent: '',
      companyFullname: '',
      companyPerson: '',
      companyTime: '',
      companyMoney: '',
      router:''
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.router = to.query.id
      console.log(vm)
      vm.getinfor()
     }
    )
  },
  methods:{
    //保存公司信息
    addinfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username,
        companyTitle: this.companyTitle,
        companyContent: this.companyContent,
        companyFullname: this.companyFullname,
        companyPerson: this.companyPerson,
        companyTime: this.companyTime,
        companyMoney: this.companyMoney
      }
      Addinfor(params).then(res=>{
          if(res.data.code==='0'){
              this.$toast({
                message: res.data.msg,
                duration: 2000,
                iconClass: 'icon icon-success',
                className: 'success_toast'
              }
            )
          }
      })
    },
    //获取公司信息
    getinfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username
      }
        Getinfor(params).then(res=>{
          if(res.data.code === "0"){
              this.companyTitle = res.data.data.companyTitle
              this.companyContent = res.data.data.companyContent
              this.companyFullname = res.data.data.companyFullname
              this.companyPerson = res.data.data.companyPerson
              this.companyTime = res.data.data.companyTime
              this.companyMoney = res.data.data.companyMoney
          }else{
            return
          }
        })
    },
    //更新公司信息
    updateinfor(){
      let username = localStorage.getItem('Username')
      let params = {
        username:username,
        companyTitle: this.companyTitle,
        companyContent: this.companyContent,
        companyFullname: this.companyFullname,
        companyPerson: this.companyPerson,
        companyTime: this.companyTime,
        companyMoney: this.companyMoney
      }
      Updateinfor (params).then(res=>{
        if(res.data.code==='0'){
              this.$toast({
                message: res.data.msg,
                duration: 2000,
                iconClass: 'icon icon-success',
                className: 'success_toast'
              }
            )
          }
      })
    } ,
    //保存公司信息
    save(){
      console.log(this.router)
      if(this.router===0){
        console.log(35434)
        this.updateinfor()
        this.$router.go(-1)
      }else{
      this.addinfor()
      this.$router.go(-1)
      }
    }
  }

  
}
</script>

