<template>
  <div class="input_search">
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
    width: 100%;
    z-index: 2;
    padding: 18px 20px;
    height: 60px;
    overflow: hidden;
    background: #E1E1E1;
 }
    input{
      padding: 15px 0 15px 70px;
      width: 85%;
      /* text-decoration: none; */
      outline: none;
      line-height: 30px;
      background: #F7F7F7;
      border: none;
      border: 2px solid  #CDCDCD;
      border-radius: 10px;
    }
    .search_img{
      position: absolute;
      top: 32px;
      left: 34px;
      display: inline-block;
      width: 24px;
      height: 24px;
    }
</style>
