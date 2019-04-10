<template>
    <div id="footer_bar">
        <ul>
          <li>
            <router-link to='/first'>
                  <span class="first">简历</span>
            </router-link>
          </li>
          <li>
            <router-link to='/sendjob'>
                 <span class="company">发布职位</span>
            </router-link>
          </li>
          <li>
              <router-link to='/companyinfo'>
                  <span class="message">公司信息</span>
              </router-link>
          </li>
          <li>
              <router-link to='/companymsg'>
                 <span class="companymsg">消息</span>
              </router-link>
          </li>
        </ul>
    </div>
</template>
<script>
export default{
  data () {
    return {

    }
	 }
}
</script>
<style lang="css" scoped>
@import '../../../assets/css/seeker/footerbar.css';
</style>