<template>
    <div class="myTab">
      <ul>
          <li v-for="item in myData" :key="item.name">
            <router-link :to='item.myPath'>
                <img :src="item.mySrc">
                <b>{{item.name}}</b>
                <img src="../../assets/image/triangle.png" class="triangle">
            </router-link>
          </li>
      </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      myData: [
        {
          name: '我的简历',
          mySrc: '',
          myPath: '/resume'
        },
        {
          name: '求职意向',
          mySrc: '',
          myPath: '/findjob'
        },
        {
          name: '职位收藏',
          mySrc: '',
          myPath: '/collectjob'
        },
        {
          name: '设置',
          mySrc: '',
          myPath: '/setting'
        }
      ]
    }
  }
}
</script>
<style lang="css" scoped>
@import '../../assets/css/seeker/mytab.css';
</style>
