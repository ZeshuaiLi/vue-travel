<template>
  <div class="offer_container">
    <div v-if="!offer_list.length" class="empty_order_container">
      <img class="" src="/static/images/order-empty.png" alt="">
      <p>暂无订单</p>
    </div>
    <order v-for="item in offer_list" :data="item" :key="item.id"></order>
  </div>
</template>

<script>
import Order from "@/components/Order";
import VuePullTo from 'vue-pull-to';

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("order");

export default {
  name: "Offer",
  created() {
    if (this.offer_list.length === 0) {
      this.getList("offer_list");
    }
    // 无限滚动
    window.addEventListener("scroll", this.scrollerHandler, true);
  },
  components: {
    Order
  },
  computed: {
    ...mapState({
      offer_list: state => state.offer_list,
      offer_list_ajax: state => state.offer_list_ajax
    })
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["getList"]),
    loadmore () {
      if (!this.offer_list_ajax && this.offer_list.length % 10 === 0) {
        this.getList("offer_list");
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
    window.removeEventListener("scroll", this.scrollerHandler, true);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../../assets/less/skin.less";
.offer_container {
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
