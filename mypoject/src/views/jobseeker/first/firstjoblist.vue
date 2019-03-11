<template>
  <div class="first_joblist">
        <div class="joblist_content">
            <ul>
              <li v-for="(item,index) in jobdataList" :key="index">
                <div class="joblist_top">
                  <span class="job_title">{{item.jobTitle}}</span>
                  <i class="job_jobsalary">{{item.jobSalary}}</i>
                </div>
               <div class="joblist_middle">
                  <i class="province_name">{{item.provinceName}}</i>
                  <i class="city_name">{{item.cityName}}</i>
                  <i class=""></i>
                </div>

              </li>
            </ul>
        </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>

</style>
