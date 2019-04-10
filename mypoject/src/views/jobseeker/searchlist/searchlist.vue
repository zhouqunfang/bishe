<template>
  <div class="search_list">
    <input-search></input-search>
    <div class="joblist_content">
        <ul>
          <li v-for="(item,index) in searchList" :key="index">
            <div class="joblist_left">
                <img :src="item.jobImg" alt="" job_img>
            </div>
            <div class="joblist_right">
              <div class="joblist_right_top">
                    {{item.jobTitle}}
              </div>
              <div class="joplist_right_bottom">
                  <span class="company_name">{{item.jobCompany}}|</span>
                  <span class="job_salary">{{item.jobSalary}}|</span>
                  <span class="city_name">{{item.cityName}}</span>
              </div>
            </div>
          </li>
        </ul>
    </div>

  </div>
</template>
<script>
import InputSearch from '@/views/component/inputsearch'
export default {
  components: {
    InputSearch
  },
  data () {
    return {
    }
  },
  computed: {
    searchList () {
      return this.$store.state.newSearchList
    }
  }
}
</script>
<style lang="scss">
// @import '../first/firstjoblist';
  .joblist_content{
    ul{
      padding: 0 20px; 
      li{
        width: 100%;
        height: 150px;
      }
      .joblist_left{
        float: left;
        width: 112px;
        height: 112px;
        margin-top: 20px;
        margin-right: 40px;
      }
      .joblist_right{
        margin-top: 28px;
        float: left;
        width: 520px;
        height: 100px;
        .joblist_right_top{
          // color: $jobtitle-color;
          font-size: 32px;
          font-weight: bold;
        }
        .joplist_right_bottom{
          font-size: 28px;
          margin-top: 15px;  
        }
      }
    }
  }
</style>
