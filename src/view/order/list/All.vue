<template>
  <div ref="all_list_container" class="all_list_container">
    <div v-if="!all_list.length" class="empty_order_container">
      <img class="" src="/static/images/order-empty.png" alt="">
      <p>暂无订单</p>
    </div>
    <order v-for="item in all_list" :data="item" :key="item.id"></order>
  </div>
</template>

<script>
import Order from "@/components/Order";
import VuePullTo from "vue-pull-to";

// import throttle from '@/api/throttle'

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("order");

export default {
  name: "All",
  created() {
    if (this.all_list.length === 0) {
      this.getList("all_list");
    }
    // 无限滚动
    window.addEventListener("scroll", this.scrollerHandler, true);
  },
  components: {
    Order
  },
  computed: {
    ...mapState({
      all_list: state => state.all_list,
      all_list_ajax: state => state.all_list_ajax
    })
  },
  data() {
    return {
      timer: null
    };
  },
  methods: {
    ...mapActions(["getList"]),
    loadmore() {
      if (!this.all_list_ajax && this.all_list.length % 10 === 0) {
        this.getList("all_list");
      }
    },
    scrollerHandler() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        var clientHeight = document.documentElement.clientHeight; // document.documentElement获取数据
        var scrollTop = document.documentElement.scrollTop; // document.documentElement获取数据
        var scrollHeight = document.documentElement.scrollHeight; // document.documentElement获取数据
        if (clientHeight + scrollTop + 40 >= scrollHeight) {
          this.loadmore()
        }
      }, 200);
    }
  },
  beforeDestroy() {
    console.log("destory");
    window.removeEventListener("scroll", this.scrollerHandler, true);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../../assets/less/skin.less";
.all_list_container {
  height: 100%;
  .empty_order_container {
    img {
      margin: 0 auto;
      max-width: 100%;
    }
    p {
      font-size: 32/@rem;
    }
  }
}
</style>
