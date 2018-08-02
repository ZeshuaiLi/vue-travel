<template>
  <view-box ref="viewBox" class="home">
    <swiper :list="banner" :auto="true" :loop="true"></swiper>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item label="订制案例" icon="http://m.efubao.qa/static_new/img/menu1.png">
      </grid-item>
      <grid-item label="推荐专题" icon="http://m.efubao.qa/static_new/img/menu2.png">
      </grid-item>
      <grid-item label="场景订制" icon="http://m.efubao.qa/static_new/img/menu3.png">
      </grid-item>
      <grid-item label="订制攻略" icon="http://m.efubao.qa/static_new/img/menu4.png">
      </grid-item>
    </grid>
    <h4>- 精选款式类型 -</h4>
    <div class="type_container">
      <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item label=""  v-for="item in type" :key="item.url">
          <img class="type_image" :src="item.img">
        </grid-item>
      </grid>
    </div>
  </view-box>
</template>

<script>
import { Swiper, Grid, GridItem, ViewBox } from 'vux'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('home')
const mapActions_title = createNamespacedHelpers('title').mapActions

export default {
  name: 'Home',
  created () {
    this.setTitle('依服宝')
    this.getData()// this.$store.dispatch('home/getData')
    console.log(this.$router.currentRoute)
  },
  beforeCreate () {
  },
  components: {
    Swiper,
    Grid,
    GridItem,
    ViewBox
  },
  computed: {
    ...mapState({
      banner: state => {
        console.log('state', state)
        return state.banner
      },
      enterprise: state => state.enterprise,
      type: state => state.type,
      case: state => state.case
    })
  },
  data () {
    return {
      msg: 'Home'
    }
  },
  methods: {
    ...mapActions([
      'getData'
    ]),
    ...mapActions_title([
      'setTitle'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .home {
    .weui-grid__icon {
      width: 50px;
      height: 50px;
    }
    .type_container {
      .weui-grid__icon {
        display: none;
      }
      .type_image {
        width: 100%;
      }
    }
  }
</style>
