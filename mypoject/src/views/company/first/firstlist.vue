<template>
  <div class="first_list">
     <div 
          class="resume_info" 
          v-for="(item,index) in resumelist" 
          :key=index 
          @click="getresume(item.username)"
          >
       <div>
         <h2>{{item.job}}</h2>
         <span>{{item.username}}</span>
       </div>
       <div>
         <span>
           {{item.salary}}
         </span>
         <span> {{item.city}}</span>
         <span>{{item.jobaim}}</span>
       </div>
     </div>
  </div>
</template>
<script>
import {Resumeinfor} from '@/views/api/recruiter/first.js';
export default {
  name:'Firstlist',
  data(){
    return{
    resumelist:[]
    }

  },
  mounted(){
      this.getjobInfor()
  },
  methods:{
    getjobInfor(){
      Resumeinfor().then(res=>{
          if(res.data.code === "0"){
              this.resumelist = res.data.data
              console.log(res.data.data)
          }else{
            return
          }
        })
    },
    getresume(value){
        console.log(value)
        this.$router.push({path:'/resume',query:{username:value}})
    }
  }
}
</script>

