<template>
  <div class="fabric_container">
    <fabric v-for="(fabric, index) in fabric_list" @removeFabric="remove_fabric(index)" :fabric="fabric" :key="index"></fabric>
    <div @click="add_fabric" class="add_fabric">
      新增面料
    </div>
    <div class="offer_complex_fabric_footer">
      <button @click="$router.go(-1)" type="button">返回</button>
      <button @click="comfrim" type="submit">确定</button>
    </div>
  </div>
</template>

<script>
import { XInput, XTextarea } from "vux";
import Fabric from '@/components/Fabric';

import { SET_COMPLEX_OFFER_FABRIC } from '@/store/mutation-types';

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

import { SSet, SGet, SRemove, LSet, LGet, LRemove } from '@/api/storage';

export default {
  name: "offer-complex-fabric",
  created() {
    if (!this.complex.offerId) {
      return this.$router.go(-1);
    }
    this.fabric_list = this.complex.fabric.map(item => {
      return {
        fabricDesc: item.fabricDesc,
        fabricRate: item.fabricRate,
        unitPrice: item.unitPrice,
        reqOfferCategoryId: item.reqOfferCategoryId
      }
    })
  },
  computed: {
    ...mapState({
      complex: state => {
        window.b = state.complex;
        return state.complex
      }
    })
  },
  components: {
    XInput,
    XTextarea,
    Fabric
  },
  data() {
    return {
      fabric_list: []
    };
  },
  methods: {
    ...mapMutations([SET_COMPLEX_OFFER_FABRIC]),
    add_fabric () {
      this.fabric_list.push({
        fabricDesc: '',
        fabricRate: '',
        unitPrice: '',
        reqOfferCategoryId: this.complex.reqOfferCategoryId
      })
    },
    remove_fabric (index) {
      this.fabric_list = this.fabric_list.slice(0, index).concat(
        this.fabric_list.slice(index + 1)
      )
    },
    comfrim () {
      let valid = true;
      this.fabric_list.every(item => {
        if (!item.fabricRate || !item.unitPrice || !item.fabricDesc) {
          valid = false;
        }
        return valid;
      });
      if (valid) {
        // SSet(this.complex.offerId + '_fabric_offer', this.fabric_list)
        this[SET_COMPLEX_OFFER_FABRIC](this.fabric_list);
        this.$router.go(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../../assets/less/skin.less";
.fabric_container {
  min-height: 100vh;
  background-color: @body_bg;
  padding-bottom: 126/@rem;
  .add_fabric {
    height: 100/@rem;
    line-height: 100/@rem;
    font-size: 30/@rem;
    margin-top: 24/@rem;
    background-color: @white_bg;
    text-align: center;
    background: #fff url("/static/images/add-icon.png") 280/@rem center no-repeat;
    background-size: 18/@rem; 
  }
  .offer_complex_fabric_footer {
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
