<template>
  <div class="simple_offer_container">
    <div class="price_container">
      <p>
        <span class="red">*&ensp;</span>单价:
      </p>
      <x-input v-model="price"
        ref="price"
        type="number"
        required
        placeholder="含税、运费、佣金的单价">
        <span class="input_badge" slot="right">
          元
        </span>
      </x-input>
      <p>
        <span class="red">*&ensp;</span>生产周期:
      </p>
      <x-input v-model="cycle"
        ref="cycle"
        type="number"
        required
        placeholder="请输入工作耗时(工作日)">
        <span class="input_badge" slot="right">
          工作日
        </span>
      </x-input>
      <p>
        面料:
      </p>
      <x-input v-model="fabric" placeholder="例如：90%棉花">
      </x-input>
      <p>
        说明
      </p>
      <x-textarea v-model="description" placeholder="该说明用户可见"></x-textarea>
    </div>
    <div class="statistic">
      <ul>
        <li>
          数量(件/套):
          <p>
            {{ count }}
          </p>
        </li>
        <li>
          总价(元):
          <p>
            <span>{{ price * count || 0 | fixed }}</span>
          </p>
        </li>
        <li>
          预计收入(元):
          <p>￥
            <span class="red_color">{{ price * count * 0.9 || 0 | fixed }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="offer_complex_other_footer">
      <button @click="cancel">取消</button>
      <button @click="submit">立即报价</button>
    </div>
  </div>
</template>

<script>
import { XInput, XTextarea } from "vux";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

export default {
  name: "other-cost",
  created() {
    const query = this.$route.query;
    const id = query.id;
    const c_id = query.c_id;
    if (!id || !c_id) {
      return this.$route.go(-1)
    }
    this.id = id;
    this.c_id = c_id;
    this.getSimpleOfferDetail(query)
  },
  computed: {
    ...mapState({
      simple_offer_detail: state => state.simple_offer_detail
    })
  },
  watch: {
    simple_offer_detail (data) {
      if (data) {
        var price = data.spofferviewbean.univalence;
        this.price = price >= 0 ? price : 0
        this.cycle = data.spofferviewbean.productionCycle;
        this.fabric = data.fabric.fabricDesc;
        this.description = data.spofferviewbean.description;
        this.count = data.spofferviewbean.customizedNum;
      }
    }
  },
  components: {
    XInput,
    XTextarea
  },
  data() {
    return {
      id: '',
      c_id: '',
      price: '',
      cycle: '',
      fabric: '',
      description: '',
      count: ''
    }
  },
  methods: {
    ...mapActions(['getSimpleOfferDetail', 'submitSimpleOffer']),
    cancel () {
      this.$router.push({
        path: '/order/detail',
        query: {
          id: this.id
        }
      })
    },
    submit () {
      if (this.$refs.cycle.valid && this.$refs.cycle.valid) {
        this.submitSimpleOffer({
          offerId: this.id,
          univalence: this.price, // 单价
          productionCycle: this.cycle, // 生产周期
          description: this.description, // 说明
          fabric: [
            { // 面料
              fabricDesc: this.fabric, // 面料名称
              reqOfferCategoryId: this.c_id
            }
          ],
          reqOfferCategoryId: this.c_id,
          customizedNum: this.count // 定制数量
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../../assets/less/skin.less";
.simple_offer_container {
  position: relative;
  padding-bottom: 106 / @rem;
  text-align: left;
  font-size: 26 / @rem;
  background-color: @body_bg;
  min-height: 100vh;
  .price_container {
    background-color: @white_bg;
    padding: 12/@rem 24/@rem 24/@rem 24/@rem;
    margin-bottom: 20/@rem;
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
  .statistic {
    background-color: @white_bg;
    margin-bottom: 20/@rem;
    .red_color {
      color: @color_red;
      font-size: 36/@rem;
    }
    ul {
      list-style-type: none;
      li {
        padding: 0 25/@rem;
        height: 100/@rem;
        line-height: 100/@rem;
        font-size: 26/@rem;
        text-align: left;
        border-bottom: 1px solid @wx_border;
        p {
          text-align: right;
          float: right;
          line-height: 100/@rem;
        }
      }
    }
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
