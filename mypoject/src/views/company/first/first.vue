<template>
  <div class="company_first">
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
      <first-list></first-list>
      <footer-bar></footer-bar>
  </div>
</template>
<script>
import InputSearch from '@/views/component/inputsearch'
import PositionPiker from '../../component/PositionPiker'
import FirstList from './firstlist';
import FooterBar from '../component/tab.vue'
export default {
  name:'First',
  components:{
    InputSearch,
    PositionPiker,
    FirstList,
    FooterBar
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
  mounted () {
    let _this = this
    this.getCityInfo()
    this.city.onChoose = function (res) {
      // ToDo: 选完城市后......
      // console.log(res)
      _this.city.isShow = false
      _this.youChoiceCityName = res.cityName
      _this.city.localCity.cityName = res.cityName
     //选择到的城市
     this.$store.dispatch('searchcity',res.cityName)
    }
  },
  methods: {
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

