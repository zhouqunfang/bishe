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
