<template>
  <div class="company">
    <input-search></input-search>
    <footer-bar></footer-bar>
    <ul class="company_content">
        <li v-for="(item,index) in companylist" :key=index>
          <router-link 
          :to="{name:'Companydetail',params:{companyTitle:item.companyTitle}}"   
          >
            <div class="company_list">
              <img :src="item.companyImg" alt="">
              <div class="content_left">
                <h4>{{item.companyTitle}}</h4>
                <span>{{item.companyFullname}}</span>
                <span>{{item.companyPerson}}</span>
              </div>
            </div>
           </router-link>  
        </li>
    </ul>
  </div>
</template>
<script>
import FooterBar from '../../component/footerbar'
import InputSearch from './companyinput'
import {Searchcompany} from '@/views/api/company/company.js'
export default {
  name: 'Company',
  components: {
    FooterBar,
    InputSearch
  },
  data () {
    return {
      companylist:[]
    }
  },
  mounted(){
    this.searchcompany()
  },
  methods: {
    //请求公司列表数据
    searchcompany(){
     Searchcompany().then(res =>{
          this.companylist = res.data.data
      })

      }
    }
  }
</script>
<style lang="scss" scoped>
    .company{
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

