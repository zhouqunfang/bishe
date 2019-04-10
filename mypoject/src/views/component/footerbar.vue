<template>
    <div id="footer_bar">
        <ul>
          <li>
            <router-link to='/index'>
                  <span class="first">首页</span>
            </router-link>
          </li>
          <li>
            <router-link to='/company'>
                 <span class="company">公司</span>
            </router-link>
          </li>
          <li>
              <router-link to='/message'>
                  <span class="message">消息</span>
              </router-link>
          </li>
          <li>
              <router-link to='/todo'>
                 <span class="todo">待办</span>
              </router-link>
          </li>
          <li>
            <router-link to='/my'>
                 <span class="my">简历</span>
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
@import '../../assets/css/seeker/footerbar.css';
</style>
