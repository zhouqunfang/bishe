<template>
    <div class="myList">
        <my-tab></my-tab>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import FooterBar from '../component/seeker/footerbar'
import MyTab from './mytab'

export default {
  name: 'Message',
  components: {
    FooterBar,
    MyTab
  },
  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
<style scoped>

</style>
