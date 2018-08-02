<template>
  <div class="accessories_container">
    <accessories v-for="(accessories, index) in accessories_list" @removeAccessories="remove_accessories(index)" :accessories="accessories" :key="index"></accessories>
    <div @click="add_accessories" class="add_accessories">
      新增辅料
    </div>
    <div class="offer_complex_accessories_footer">
      <button @click="$router.go(-1)" type="button">返回</button>
      <button @click="comfrim" type="submit">确定</button>
    </div>
  </div>
</template>

<script>
import { XInput, XTextarea } from "vux";
import Accessories from '@/components/Accessories';

import { SSet, SGet, SRemove, LSet, LGet, LRemove } from '@/api/storage';
import { SET_COMPLEX_OFFER_ACCESSORIES } from '@/store/mutation-types';

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

export default {
  name: "offer-complex-fabric",
  created() {
    if (!this.complex.offerId) {
      return this.$router.go(-1);
    }
    this.accessories_list = this.complex.accessories.map(item => {
      return {
        accessoriesName: item.accessoriesName,
        accessoriesPrice: item.accessoriesPrice,
        reqOfferCategoryId: item.reqOfferCategoryId
      }
    })
  },
  computed: {
    ...mapState({
      complex: state => state.complex
    })
  },
  components: {
    XInput,
    XTextarea,
    Accessories
  },
  data() {
    return {
      accessories_list: []
    };
  },
  methods: {
    ...mapMutations([SET_COMPLEX_OFFER_ACCESSORIES]),
    add_accessories () {
      this.accessories_list.push({
        accessoriesName: '',
        accessoriesPrice: '',
        reqOfferCategoryId: this.complex.reqOfferCategoryId
      })
      console.log(this.accessories_list)
    },
    remove_accessories (index) {
      this.accessories_list = this.accessories_list.slice(0, index).concat(
        this.accessories_list.slice(index + 1)
      )
    },
    comfrim () {
      let valid = true;
      this.accessories_list.every(item => {
        if (!item.accessoriesName || !item.accessoriesPrice) {
          valid = false;
        }
        return valid;
      });
      if (valid) {
        // SSet(this.complex.offerId + '_accessories_offer', this.accessories_list)
        this[SET_COMPLEX_OFFER_ACCESSORIES](this.accessories_list);
        this.$router.go(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../../assets/less/skin.less";
.accessories_container {
  min-height: 100vh;
  background-color: @body_bg;
  padding-bottom: 126/@rem;
  .add_accessories {
    height: 100/@rem;
    line-height: 100/@rem;
    font-size: 30/@rem;
    margin-top: 24/@rem;
    background-color: @white_bg;
    text-align: center;
    background: #fff url("/static/images/add-icon.png") 280/@rem center no-repeat;
    background-size: 18/@rem; 
  }
  .offer_complex_accessories_footer {
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
