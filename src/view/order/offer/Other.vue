<template>
  <div class="other_cost_container">
    <h1>其他成本
      <span>（<span class="red">*</span>为必填项）</span>
    </h1>
    <p>
      <span class="red">*&ensp;</span>工费:
    </p>
    <x-input ref="fee" required type="number" v-model="fee" placeholder="">
      <span class="input_badge" slot="right">
        元
      </span>
    </x-input>
    <p>
      <span class="red">*&ensp;</span>税费:
    </p>
    <x-input ref="taxation" required type="number" v-model="taxation" placeholder="">
      <span class="input_badge" slot="right">
        元
      </span>
    </x-input>
    <p>
      <span class="red">*&ensp;</span>利润:
    </p>
    <x-input ref="profit" required type="number" v-model="profit" placeholder="">
      <span class="input_badge" slot="right">
        元
      </span>
    </x-input>
    <p>
      <span class="red">*&ensp;</span>运费:
    </p>
    <x-input ref="freight" required type="number" v-model="freight" placeholder="">
      <span class="input_badge" slot="right">
        元
      </span>
    </x-input>
    <p>
      特殊工艺:
    </p>
    <x-input type="number" v-model="specialTechnics" placeholder="">
      <span class="input_badge" slot="right">
        元
      </span>
    </x-input>
    <div class="offer_complex_other_footer">
      <button @click="$router.go(-1)" type="button">返回</button>
      <button @click="comfrim" type="submit">确定</button>
    </div>
  </div>
</template>

<script>
import { XInput, XTextarea } from "vux";

import { SET_COMPLEX_OFFER_OTHER } from '@/store/mutation-types';
import { SSet, SGet, SRemove, LSet, LGet, LRemove } from '@/api/storage';

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

export default {
  name: "other-cost",
  created() {
    if (!this.complex.offerId) {
      return this.$router.go(-1);
    }
    const data = this.complex;
    this.fee = data.fee; // 加工费
    this.taxation = data.taxation; // 税费
    this.profit = data.profit; // 利润
    this.freight = data.freight; // 运费
    this.specialTechnics = data.specialTechnics; // 特殊工艺
  },
  computed: {
    ...mapState({
      complex: state => state.complex
    })
  },
  components: {
    XInput,
    XTextarea
  },
  data() {
    return {
      fee: '',
      taxation: '',
      profit: '',
      freight: '',
      specialTechnics: ''
    };
  },
  methods: {
    ...mapMutations([SET_COMPLEX_OFFER_OTHER]),
    comfrim () {
      if (
        this.$refs.fee.valid &&
        this.$refs.taxation.valid &&
        this.$refs.profit.valid &&
        this.$refs.freight.valid
      ) {
        this[SET_COMPLEX_OFFER_OTHER]({
          fee: this.fee,
          taxation: this.taxation,
          profit: this.profit,
          freight: this.freight,
          specialTechnics: this.specialTechnics
        })
        // SSet(this.complex.offerId + '_other_offer', {
        //   fee: +this.fee,
        //   taxation: +this.taxation,
        //   profit: +this.profit,
        //   freight: +this.freight,
        //   specialTechnics: this.specialTechnics ? +this.specialTechnics : 0
        // })
        this.$router.go(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../../assets/less/skin.less";
.other_cost_container {
  position: relative;
  padding-bottom: 106 / @rem;
  text-align: left;
  font-size: 26 / @rem;
  background-color: @white_bg;
  padding: 12/@rem 24/@rem 0 24/@rem;
  h1 {
    position: relative;
    height: 88/@rem;
    font-size: 30/@rem;
    line-height: 88/@rem;
    font-weight: 400;
    span{
      color: @color_888;
      font-size: 24/@rem;
    }
  }
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
  .input_badge {
    color: @input_badge;
  }
  .red {
    color: @color_red;
  }
  .offer_complex_other_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 1px 6px 1px rgba(0, 0, 0, 0.07);
    button {
      width: 50%;
      height: 106/@rem;
      font-size: 36/@rem;
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
