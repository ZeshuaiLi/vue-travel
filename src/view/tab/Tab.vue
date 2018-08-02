<template>
  <div id="tab">
    <!-- <transition name="slide"> -->
      <router-view></router-view>
    <!-- </transition> -->
    <tab-nav></tab-nav>
  </div>
</template>

<script>
import { Loading } from 'vux'

import TabNav from '../../components/TabNav.vue'

export default {
  name: 'app',
  components: {
    TabNav,
    Loading
  }
}
</script>
<style lang="less">
  #tab {
    height: 100%;
  }
</style>
