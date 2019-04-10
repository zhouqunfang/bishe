<template>
  <div class="add_info">
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
  </div>
</template>
<script>
import { Addinfor } from '@/views/api/recruiter/first.js';
export default {
  name:'AddInfo',
  components:{

  },
  data(){
    return{
      companyTitle:'',
      companyContent: '',
      companyFullname: '',
      companyPerson: '',
      companyTime: '',
      companyMoney: ''
    }
  },
  methods:{
    addinfor(){
      // let params = {

      // }
      Addinfor().then(res=>{

      })
    }
  }

  
}
</script>

