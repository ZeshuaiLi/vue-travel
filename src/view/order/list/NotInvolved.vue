<template>
  <div class="not_involved_container">
    <div v-if="!not_involved_list.length" class="empty_order_container">
      <img class="" src="/static/images/order-empty.png" alt="">
      <p>暂无订单</p>
    </div>
    <order v-for="item in not_involved_list" :data="item" :key="item.id"></order>
  </div>
</template>

<script>
import Order from "@/components/Order";
import VuePullTo from 'vue-pull-to';

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("order");

export default {
  name: "NotInvolved",
  created() {
    if (this.not_involved_list.length === 0) {
      this.getList("not_involved_list");
    }
    // 无限滚动
    window.addEventListener("scroll", this.scrollerHandler, true);
  },
  components: {
    Order,
    VuePullTo
  },
  computed: {
    ...mapState({
      not_involved_list: state => state.not_involved_list,
      not_involved_list_ajax: state => state.not_involved_list_ajax
    })
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["getList"]),
    loadmore () {
      if (!this.not_involved_list_ajax && this.not_involved_list.length % 10 === 0) {
        this.getList("not_involved_list");
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
.not_involved_container {
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
