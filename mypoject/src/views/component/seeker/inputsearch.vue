<template>
  <div class="input_search">
    <input type="text" placeholder="公司/职业" v-model="keyword">
    <span class="search_img"  @click="searchJob" ><img src="@/assets/image/search.svg"/></span>
  </div>
</template>
<script>
import {JobList} from '../../api/api.js'
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
      // 获取职位数据
      JobList().then(res => {
        let jobdataList = res.data.jobdataList
        jobdataList.forEach(element => {
          this.searchjobList.push(element)
        })
        let keyword = this.keyword
        if (keyword) {
          this.searchjobList.filter(item => {
            // 匹配到数据
            if (item.jobTitle.indexOf(keyword) !== -1) {
              this.newSearchList.push(item)
              this.$store.dispatch('searchlist', this.newSearchList)
            } else {
              // 如果没有匹配到数据 放空数组
              this.$store.dispatch('delete_list')
            }
          })
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
   position: relative;
    padding: 20px 14px;
    height: 60px;
    overflow: hidden;
 }
    input{
      padding: 10px 0 10px 60px;
      width: 91%;
      text-decoration: none;
      outline: none;
      border: none;
      border: 4px solid #7E89EB;
      border-radius: 40px;
    }
    .search_img{
      position: absolute;
      top: 30px;
      left: 34px;
      display: inline-block;
      width: 22px;
      height: 22px;
    }
</style>
