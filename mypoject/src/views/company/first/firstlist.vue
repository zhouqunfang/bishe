<template>
  <div class="first_list">
     <div class="resume_info" v-for="(item,index) in resumelist" :key=index>
       <div>
         <h2>{{resumelist[index].job}}</h2>
         <span>{{resumelist[index].username}}</span>
       </div>
       <div>
         <span>
           {{resumelist[index].salary}}
         </span>
         <span> {{resumelist[index].city}}</span>
         <span>{{resumelist[index].jobaim}}</span>
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
    }
  }
}
</script>

