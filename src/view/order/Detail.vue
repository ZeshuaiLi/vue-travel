<template>
  <div class="order_detail_container">
    <div class="order_header">
      <div class="left">
        <p>订单号:
          <span>{{ detail.reqInfoNo }}</span>
        </p>
        <p>状态:
          <span>{{ detail.stateName }}</span>
        </p>
      </div>
      <div class="address">
        <p>交付日期:
          <span>{{ detail.deliveryDate }}</span>
        </p>
        <p>送货地址:
          <span>{{ detail.location }}</span>
        </p>
        <p>发票要求:
          <span v-if="detail.invoiceType === 0">不开发票</span>
          <span v-if="detail.invoiceType === 1">普通发票</span>
          <span v-if="detail.invoiceType === 2">增值税发票</span>
        </p>
      </div>
    </div>
    <div class="detail">
      <offer-detail 
        :isTraders="detail.isTraders"
        :data="item"
        v-for="item in detail.categorys"
        :key="item.id"
        :state="detail.state"
        ></offer-detail>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("order");

import OfferDetail from '@/components/OfferDetail'

export default {
  name: "detail",
  created() {
    const id = this.$route.query.id;
    if (!id) {
      return this.$router.push('/index')
    }
    this.getDetail(id);
  },
  components: {
    OfferDetail
  },
  computed: {
    ...mapState(['detail'])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getDetail"]),
    onItemClick(index) {
      const paths = ['/quotation/offer', '/quotation/publish', '/quotation/not_involved', '/quotation/all']
      this.$router.push(paths[index])
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/less/skin.less";
.order_detail_container {
  min-height: 100vh;
  background-color: @body_bg;
  .order_header {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }
  p {
    line-height: 40 / @rem;
    font-size: 24 / @rem;
    min-height: 40 / @rem;
    text-align: left;
  }
  .left, .address {
    padding: 24/@rem;
    border-bottom: 1px solid @wx_border;
    background-color: @white_bg;
  }
}
</style>
