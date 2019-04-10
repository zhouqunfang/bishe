<template>
  <div class="company_info">
    <div class="add_info">
        <h4 @click=addDetail>请完善公司信息+</h4>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import FooterBar from '../component/tab.vue'
export default {
  name:'Companyinfo',
  components:{
    FooterBar
  },
  methods:{
    addDetail(){
      this.$router.push('./addinfo')
    }
  }
}
</script>

