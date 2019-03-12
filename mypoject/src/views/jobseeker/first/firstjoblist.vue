<template>
  <div class="first_joblist">
        <h3 class="recommen_job">推荐职位</h3>
        <div class="joblist_content">
            <ul>
              <li v-for="(item,index) in jobdataList" :key="index">
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
import {JobList} from '../../api/api.js'
export default {
  name: 'JobList',
  data () {
    return {
      jobdataList: ''

    }
  },
  mounted () {
    this.JobList()
  },
  methods: {
    JobList () {
      JobList().then(res => {
        this.jobdataList = res.data.jobdataList
        console.log(this.jobdataList)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './firstjoblist';
</style>
