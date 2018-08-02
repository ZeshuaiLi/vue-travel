<template>
  <div class="quotation_container">
    <tab>
      <tab-item :selected="selected === 0" :badge-label="offer_count" @on-item-click="onItemClick">报价中</tab-item>
      <tab-item :selected="selected === 1" :badge-label="public_count" @on-item-click="onItemClick">已公布</tab-item>
      <tab-item :selected="selected === 2" :badge-label="not_involved_count" @on-item-click="onItemClick">未参与</tab-item>
      <tab-item :selected="selected === 3" @on-item-click="onItemClick">全部</tab-item>
    </tab>
    <!-- <transition name="slide"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";

import Publish from "./order/list/Publish";
import NotInvolved from "./order/list/NotInvolved";
import Offer from "./order/list/Offer";
import All from "./order/list/All";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("order");

export default {
  name: "Index",
  created() {
    const path = this.$route.path.split('/');
    switch (path.pop()) {
      case 'publish':
        this.selected = 1
        break;
      case 'not_involved':
        this.selected = 2
        break;
      case 'all':
        this.selected = 3
        break;
      default:
        this.selected = 0
    }
    this.getStatistic();
  },
  components: {
    Tab,
    TabItem
  },
  computed: {
    ...mapState({
      offer_count: state => state.offer_count,
      public_count: state => state.public_count,
      not_involved_count: state => state.not_involved_count
    })
  },
  data() {
    return {
      selected: '0'
    };
  },
  methods: {
    ...mapActions(["getStatistic"]),
    onItemClick(index) {
      this.selected = index;
      const paths = [
        "/quotation/offer",
        "/quotation/publish",
        "/quotation/not_involved",
        "/quotation/all"
      ];
      this.$router.push(paths[index]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/less/skin.less";
.quotation_container {
  min-height: 100vh;
  background-color: @body_bg;
  width: 100%;
  .vux-tab-wrap {
    z-index: 100;
  }
  .vux-tab .vux-tab-item.vux-tab-selected {
    color: @red_tab;
    border-bottom: 3px solid @red_tab;
  }
  .vux-tab-ink-bar {
    background-color: @red_tab;
  }
  .vux-tab-item-badge {
    background-color: @red_tab !important;
    top: -32 / @rem;
    font-weight: bold;
  }
  .vux-tab-container,
  .vux-tab {
    height: 100 / @rem;
    .vux-tab-item {
      line-height: 100 / @rem;
      outline: none;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
