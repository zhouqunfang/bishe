<template>
  <div class="first_joblist">
        <h3 class="recommen_job">
          <img src="../../../assets/image/job.svg" alt="">
          <span>职位</span>
        </h3>
        <div class="joblist_content">
            <ul>
              <li v-for="(item,index) in jobdataList" :key="index" >
                <router-link :to="{name:'Jobdetail',params:{_id:item._id}}">
                    <div class="joblist_left">
                        <img src="@/assets/image/searchjob.svg" alt="" class="job_img">
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
        <div class="new_content">
          <h3 class="recommen_new">
            <img src="static/image/1556767160632-1555755740426-lunbo(1)" alt="">
            <span>新闻</span>
          </h3>         
          <ul>
            <li v-for="(item,index) in newsdata" :key="index">
              <span>{{item}}</span>
              <b></b>
            </li>
          </ul>
        </div>
  </div>
</template>
<script>
// mock 数据接口
import {JobList, NewList} from '../../api/api.js'
export default {
  name: 'JobList',
  data () {
    return {
      jobdataList: '',
      newsdata: ''

    }
  },
  mounted () {
    this.JobList(),
    this.NewsList()
  },
  methods: {
    JobList () {
      // 请求数据
      JobList().then(res => {
        this.jobdataList = res.data.data
        console.log(this.jobdataList)   
      })
    },
    NewsList () {
      NewList().then(res => {
        this.newsdata = res.data.newslist
        // console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './firstjoblist';
</style>
