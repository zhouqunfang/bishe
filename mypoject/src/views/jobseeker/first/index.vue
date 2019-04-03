<template>
    <div class="index">
      <div class="top_search">
          <input-search></input-search>
          <span class="city_search" @click="choiceCity()">{{youChoiceCityName}}</span>
       </div>
        <position-piker
                  :is-show.sync='city.isShow'
                  :on-choose='city.onChoose'
                  :city-data='city.cityData'
                  :local-city='city.localCity'
                  :close="close"
                  >
        </position-piker>
       <mt-swipe :auto="4000">
          <mt-swipe-item><img src="@/assets/image/lunbo.jpg"  /></mt-swipe-item>
          <mt-swipe-item><img src="@/assets/image/lunbo(1).jpg" /></mt-swipe-item>
          <mt-swipe-item><img src="@/assets/image/lunbo.jpg"  /></mt-swipe-item>
      </mt-swipe>
      <job-list></job-list>
       <footer-bar></footer-bar>
    </div>

</template>
<script>
import FooterBar from '@/views/component/seeker/footerbar'
import PositionPiker from '../../component/PositionPiker'
import JobList from './firstjoblist'
import InputSearch from '@/views/component/seeker/inputsearch'
import {SetUserInfo} from '../../api/message/message.js'
export default {
  name: 'Index',
  components: {
    FooterBar,
    PositionPiker,
    JobList,
    InputSearch
  },
  data () {
    return {
      city: {
        isShow: false,
        cityData: [],
        onChoose: null,
        localCity: {},
        searchMessage: '',
        username:''

      },
      youChoiceCityName: '广州'
    }
  },
  created(){
  },
  mounted () {
    let _this = this
    this.setuserinfo()
    this.getCityInfo()
    this.city.onChoose = function (res) {
      // ToDo: 选完城市后......
      // console.log(res)
      _this.city.isShow = false
      _this.youChoiceCityName = res.cityName
      _this.city.localCity.cityName = res.cityName
    }
  },
  methods: {
    //获取用户信息 
    setuserinfo(){
      let username= localStorage.getItem('Username')
      let params = {username:username}
      SetUserInfo(params).then(res=>{
        console.log(res)
      this.$store.state.userInfo = res.data.userinfo
        })
      },
    getCityInfo () {
      this.$http.get('./static/data/city.json').then(res =>{
          this.city.cityData = res.data.city
      })
      this.city.localCity = {
        cityId: 301,
        cityName: '广州',
        citySpell: 'BAOSHAN',
        cityFirstLetter: 'B'
      }
    },
    choiceCity: function () {
      this.city.isShow = true
    },
    close () {
      this.city.isShow = false
      this.city2.isShow = false
    }
  }
}
</script>
<style lang="css">
@import './first.css';
</style>
