<template>
  <div class="input_search">
    <input type="text" placeholder="公司" v-model="keyword">
    <span class="search_img"  @click="searchCompany" ><img src="@/assets/image/search.svg"/></span>
  </div>
</template>
<script>
import {Searchcompany} from '@/views/api/company/company.js'
export default {
  name: 'InputSearch',
  data () {
    return {
      keyword: '',
      searchcompany: [],
      newcompanyList: []
    }
  },
  methods: {
    // 搜索匹配含有关键字的职位数据
    // searchJob () {
    //   this.keyword = ''
    // },
    // 获取公司职位列表数据 
    searchCompany() {
       this.$store.dispatch('deletecompany')
       console.log(434354)
      // 获取职位数据
      Searchcompany().then(res => {
        let searchcityList = res.data.data
        console.log(searchcityList)
        
        // searchcityList.forEach(element => {
        //   this.searchcompany.push(element)
        // })
        console.log(searchcityList)
        let keyword = this.keyword
        // let searchcity = this.$store.state.choicecity
        if (keyword) {
          this.searchcompany.filter( item => {
            // 匹配到数据
            if (item.companyTitle.indexOf(keyword) !== -1) {
              this.newcompanyList.push(item)                                         
               } 
           })
          this.$store.dispatch('searchcompany', this.newcompanyList)
          this.searchcompany= [] 
          console.log(this.$store.state.newcompanyList)
        }
        this.keyword = ''
      })
      this.$router.push('/company/list')
    }

  }
}
</script>
<style scoped>
.input_search{
   position: relative;
    padding: 20px 24px;
    height: 60px;
    overflow: hidden;
    background: #E1E1E1;
 }
    input{
      padding: 15px 0 15px 70px;
      width: 91%;
      text-decoration: none;
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
