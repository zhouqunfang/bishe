<template>
  <div class="search_list">
    <input-search></input-search>
    <div class="joblist_content">
        <ul>
          <li v-for="(item,index) in searchList" :key="index">
     <router-link :to="{name:'Jobdetail',params:{_id:item._id}}">       
            <div class="joblist_left">
                <img src="@/assets/image/searchjob.svg" alt="" job_img>
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
    </router-link>         
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
      console.log( this.$store.state.newSearchList)
      return this.$store.state.newSearchList
    }
  }
}
</script>
<style lang="scss" scoped>
// @import '../first/firstjoblist';
  .joblist_content{
    a{
      color: black;
    }
    ul{
      padding: 0 20px; 
      li{
        width: 100%;
        height: 180px;
        margin-bottom: 20px;
      }
      .joblist_left{
        float: left;
        width: 112px;
        height: 112px;
        margin-top: 32px;
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
