<template>
  <div id="app">
    <!-- <transition name="slide"> -->
      <router-view></router-view>
    <!-- </transition> -->
    <loading v-model="isLoading"></loading>
    <toast v-model="show_toaster" type="text" is-show-mask :time="step" :position="'bottom'">{{ message }}</toast>
  </div>
</template>

<script>
import { Loading, Toast } from "vux";
import { mapState } from "vuex";
import { setTimeout, clearTimeout } from "timers";

//    <header-nav class="header"></header-nav>
//    <div class="seize"></div>

export default {
  name: "app",
  components: {
    Loading,
    Toast
  },
  data() {
    return {
      show_toaster: false,
      step: 1500,
      timer: null
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      message: state => state.message
    })
  },
  watch: {
    message(n) {
      if (n) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.show_toaster = true;
        this.timer = setTimeout(() => {
          this.show_toaster = false;
          this.$store.commit('SET_TOAST_MESSAGE')
        }, this.step);
      }
    }
  },
  methods: {}
};
</script>
<style lang="less">
@import "~vux/src/styles/reset.less";
</style>
<style lang="less">
#app {
  font-family: "SimHei", "microsoft yahei", "Avenir", Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* min-height: 100vh; */
  /* padding-bottom: 53px; */
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    margin-bottom: 1px;
  }
  .seize {
    height: 46px;
  }
  width: 100%;
}
html,
body {
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  .weui-toast {
    transform: none;
    margin-left: -3.8rem !important;
  }
  .weui-toast.vux-toast-bottom {
    transform: none;
  }
}
* {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
