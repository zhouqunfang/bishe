<template>
  <div class="search_list">
    <input-search></input-search>
    <div class="content_list">
      <ul class="company_content">
          <li v-for="(item,index) in companylist" :key=index>
            <router-link 
            :to="'/company/'+item.companyTitle"     
            >
              <div class="company_list">
                <img :src="item.companyImg" alt="">
                <div class="content_left">
                  <h4>{{item.companyTitle}}</h4>
                  <span>{{item.cityName}}</span>
                  <span>{{item.companyJob}}</span>
                </div>
              </div>
            </router-link>  
          </li>
        </ul>
    </div>

  </div>
</template>
<script>
import InputSearch from './companyinput.vue'
export default {
  components: {
    InputSearch
  },
  data () {
    return {
     
    }
  },
  created(){
 
  },
  mounted(){
console.log(this.$store.state.newcompanyList )
  },
  computed: {
    companylist () {
      return  this.$store.state.newcompanyList 
   }
  }
}
</script>
<style lang="scss" scoped>
  .content_list{
    .company_content{
        padding: 20px;
        li{
          a{
            font-size: 28px;
            color: black;
            .company_list{
              display: flex;
              margin: 40px 0;
            img{
              margin-right: 30px;
              }
              .content_left{
                h4{
                  font-size: 36px;
                  margin-bottom: 20px;
                }
                span{
                  font-size: 32px;
                }
              }

            }
          }
        }
      }
  }
</style>
