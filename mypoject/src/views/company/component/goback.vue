<template>
  <div class="go_back">
    <img src="../../../assets/image/goback.svg"  @click="goback">
  </div>
</template>
<script>
export default {
  name:'Goback',
  methods:{
    goback(){
      this.$router.go(-1)
    }
  }
}
</script>


