<template>
  <div class="">
    <input type="text" placeholder="公司/职业" v-model="keyword">
    <span class="search_img"  @click="searchJob" ><img src="@/assets/image/search.svg"/></span>
  </div>
</template>
<script>
import {JobList} from '@/views/api/api.js'
export default {
  name: 'InputSearch',
  data () {
    return {
      keyword: '',
      searchjobList: [],
      newSearchList: []
    }
  },
  methods: {
    // 搜索匹配含有关键字的职位数据
    // searchJob () {
    //   this.keyword = ''
    // },
    // 获取公司职位列表数据
    searchJob  () {
        this.$store.dispatch('delete_list')
      // 获取职位数据
      JobList().then(res => {
        let jobdataList = res.data.data
        jobdataList.forEach(element => {
          console.log(element.jobTitle)
          this.searchjobList.push(element)     
        })
        console.log(this.searchjobList)
        let keyword = this.keyword
        // let searchcity = this.$store.state.choicecity
        if (keyword) {
          this.searchjobList.filter(item => {
            // 匹配到数据    
            if (item.jobTitle.indexOf(keyword) !== -1) {     
              this.newSearchList.push(item)  
            } 
          })  
            this.$store.dispatch('searchlist', this.newSearchList)
        }
        this.keyword = ''
      })
      this.$router.push('/searchlist')
    }

  }
}
</script>
<style scoped>
.input_search{
    position: fixed;
    z-index: 2;
    padding: 18px 20px;
    height: 60px;
    overflow: hidden;
    background: #E1E1E1;
 }
    input{
      width: 100%;
      height: 100px;
      outline: none;
      line-height: 30px;
      background: #F7F7F7;
      border: none;
      border-bottom: 2px solid  #CDCDCD;
      font-size: 32px;
      padding-left: 60 px;
    }
    .search_img{
      position: absolute;
      top: 30px;
      left: 20px;
      display: inline-block;
      width: 24px;
      height: 24px;
    }
</style>
