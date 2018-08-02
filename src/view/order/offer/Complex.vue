<template>
  <div class="offer_complex_container">
    <ul class="cost_list">
      <router-link to="/order/fabric">
        <li>面料成本
            <span>{{ this.complex.fabricPrice | fixed}}元</span>
            <img src="/static/images/right-next.png" alt="">
        </li>
      </router-link>
      <router-link to="/order/accessories">
        <li>辅料成本
          <span>{{ this.complex.accessoriesPrice | fixed }}元</span>
          <img src="/static/images/right-next.png" alt="">
        </li>
      </router-link>
      <router-link to="/order/other">
        <li>其他成本
          <span>{{ this.complex.othersPrice | fixed}}元</span>
          <img src="/static/images/right-next.png" alt="">
        </li>
      </router-link>
    </ul>
    <div class="describe_container">
      <p>
        <span class="red_color">*&ensp;</span>生产周期
      </p>
      <x-input ref="cycle" v-model="cycle" placeholder="请输入工作耗时(工作日)." required></x-input>
      <p>
        说明
      </p>
      <x-textarea v-model="description" placeholder="该说明用户可见"></x-textarea>
    </div>
    <div class="statistic">
      <ul>
        <li>
          最终单价(元):
          <p>
            ￥<span>{{ (this.complex.fabricPrice + this.complex.accessoriesPrice + this.complex.othersPrice) / 0.9 | fixed }}</span>
          </p>
        </li>
        <li>
          数量(件/套):
          <p>
            <span>{{ this.complex.count }}</span>
          </p>
        </li>
        <li>
          总成本(元):
          <p>
            ￥<span>{{ this.complex.fabricPrice + this.complex.accessoriesPrice + this.complex.othersPrice | fixed }}</span>
          </p>
        </li>
        <li>
          平台佣金(元):
          <p>￥
            <span>{{ ((this.complex.fabricPrice + this.complex.accessoriesPrice + this.complex.othersPrice) / 0.9) * 0.1 | fixed }}</span>
          </p>
        </li>
        <li>
          最终总报价(元):
          <p>￥
            <span class="red_color">{{ (this.complex.fabricPrice + this.complex.accessoriesPrice + this.complex.othersPrice) / 0.9 * this.complex.count | fixed }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="offer_complex_footer">
      <button @click="cancel">取消</button>
      <button @click="submit">立即报价</button>
    </div>
  </div>
</template>

<script>
import { XInput, XTextarea } from "vux";

import { fixed } from '@/filters/number'

import { SSet, SGet, SRemove, LSet, LGet, LRemove } from '@/api/storage';
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

import {
  SET_COMPLEX_OFFER_FABRIC,
  SET_COMPLEX_OFFER_ACCESSORIES,
  SET_COMPLEX_OFFER_OTHER
} from '@/store/mutation-types'

export default {
  name: "offer-complex",
  computed: {
    ...mapState({
      complex: state => state.complex
    })
  },
  created() {
    const query = this.$route.query;
    const id = query.id;
    const c_id = query.c_id;
    if (!id || !c_id) {
      this.$route.go(-1);
    }
    this.id = id;
    this.c_id = c_id;
    this.init(id, c_id);
    // 读取storage
    // this.initSession(id, c_id);
  },
  watch: {
    complex () {
      this.cycle = this.complex.productionCycle
      this.description = this.complex.description
    }
  },
  mounted () {
    this.cycle = this.complex.productionCycle
    this.description = this.complex.description
  },
  components: {
    XInput,
    XTextarea
  },
  data() {
    return {
      cycle: undefined,
      description: ''
    };
  },
  methods: {
    ...mapActions(["getComplexOfferDetail", "saveComplexOffer"]),
    ...mapMutations([SET_COMPLEX_OFFER_FABRIC, SET_COMPLEX_OFFER_ACCESSORIES, SET_COMPLEX_OFFER_OTHER]),
    init (id, c_id) {
      if (!this.complex || this.complex.offerId !== +id) {
        this.getComplexOfferDetail({
          offerId: id,
          reqOfferCategoryId: c_id
        });
      }
    },
    initSession (id, c_id) {
      const fabric_list = SGet(id + '_fabric_offer');
      const accessories_list = SGet(id + '_accessories_offer');
      const other_data = SGet(id + '_other_offer');
      // 面料
      if (fabric_list && fabric_list.length) {
        // this[SET_COMPLEX_OFFER_FABRIC](fabric_list);
      }
      // 辅料
      if (accessories_list && accessories_list.length) {
        // this[SET_COMPLEX_OFFER_ACCESSORIES](accessories_list);
      }
      // 其他
      if (other_data) {
        this[SET_COMPLEX_OFFER_OTHER](other_data)
      }
    },
    cancel() {
      this.$router.push({
        path: "/order/detail",
        query: {
          id: this.$route.query.id
        }
      });
    },
    submit () {
      if (this.$refs.cycle.valid) {
        this.saveComplexOffer({
          offerId: this.complex.offerId,
          accessories: this.complex.accessories,
          accessoriesPrice: this.complex.accessoriesPrice,
          description: this.description,
          fabric: this.complex.fabric,
          fabricPrice: this.complex.fabricPrice,
          fee: this.complex.fee,
          freight: this.complex.freight,
          productionCycle: this.cycle,
          profit: this.complex.profit,
          reqOfferCategoryId: this.complex.reqOfferCategoryId,
          specialTechnics: this.complex.specialTechnics,
          taxation: this.complex.taxation,
          univalence: Number(
            fixed(
              (this.complex.fabricPrice + this.complex.accessoriesPrice + this.complex.othersPrice) / 0.9
            )
          ) || 0
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../../assets/less/skin.less";
.offer_complex_container {
  min-height: 100vh;
  background-color: @body_bg;
  padding-bottom: 106 / @rem;
  .cost_list {
    li {
      position: relative;
      padding-left: 116 / @rem;
      height: 120 / @rem;
      line-height: 120 / @rem;
      text-align: left;
      margin-bottom: 20 / @rem;
      background: @white_bg 37 / @rem 34 / @rem no-repeat;
      background-size: 46 / @rem 46 / @rem;
      box-shadow: 0 1 6px 0px rgba(0, 0, 0, 0.3);
      &:nth-of-type(1) {
        background-image: url(/static/images/calculator-icon-a.png);
      }
      &:nth-of-type(2) {
        background-image: url(/static/images/calculator-icon-b.png);
      }
      &:nth-of-type(3) {
        background-image: url(/static/images/calculator-icon-c.png);
      }
      span {
        position: absolute;
        right: 200 / @rem;
        font-size: 30 / @rem;
        line-height: 120 / @rem;
      }
      img {
        position: absolute;
        width: 21 / @rem;
        height: 36 / @rem;
        right: 26 / @rem;
        top: 42 / @rem;
      }
    }
  }
  .describe_container {
    padding: 12 / @rem 24 / @rem 50 / @rem 24 / @rem;
    margin-bottom: 20 / @rem;
    background-color: @white_bg;
    box-shadow: 0 1 6px 0px rgba(0, 0, 0, 0.07);

    text-align: left;
    font-size: 26 / @rem;
    p {
      line-height: 60 / @rem;
      height: 60 / @rem;
    }
    .red_color {
      line-height: 32 / @rem;
      color: @color_important;
    }
    .vux-x-input.weui-cell,
    .weui-cell.vux-x-textarea {
      border: 1px solid @wx_border;
      &::before {
        display: none;
      }
    }
    .weui-cell.vux-x-textarea {
      height: 150 / @rem;
      textarea {
        height: 150 / @rem;
      }
    }
  }
  .statistic {
    background-color: @white_bg;
    margin-bottom: 20 / @rem;
    .red_color {
      color: @color_red;
      font-size: 36 / @rem;
    }
    ul {
      list-style-type: none;
      li {
        padding: 0 25 / @rem;
        height: 100 / @rem;
        line-height: 100 / @rem;
        font-size: 26 / @rem;
        text-align: left;
        border-bottom: 1px solid @wx_border;
        p {
          text-align: right;
          float: right;
        }
      }
    }
  }
  .offer_complex_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    button {
      width: 50%;
      height: 106 / @rem;
      font-size: 36 / @rem;
      outline: none;
      border: none;
      &:first-child {
        background-color: @white_button;
      }
      &:last-child {
        float: right;
        background-color: @red_button;
        color: @white_color;
        font-weight: bold;
      }
    }
  }
}
</style>
