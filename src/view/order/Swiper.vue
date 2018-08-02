<template>
  <div class="swiper_page_container">
    <swiper :aspect-ratio="1" v-model="index" :list="files"></swiper>
  </div>
</template>

<script>
import { XDialog, Swiper } from "vux";
import VueUploadComponent from "vue-upload-component";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

export default {
  name: "swiper_page_container",
  created () {
    const query = this.$route.query;
    const id = query.id;
    const c_id = query.c_id;
    if (!id) {
      return this.$router.push({
        path: '/order/index'
      })
    }
    if (!c_id) {
      return this.$router.push({
        path: '/order/detail',
        query: {
          id: id
        }
      })
    }
    this.index = +query.index || 0
    this.getImage(id, c_id)
  },
  components: {
    Swiper
  },
  data() {
    return {
      files: [],
      index: 0
    };
  },
  methods: {
    getImage (id, c_id) {
      this.$http({
        method: 'post',
        url: '/api/offer/offerfile',
        data: {
          offerCategoryId: c_id,
          offerId: id,
          index: 1
        }
      }).then(result => {
        if (result.code === '200') {
          this.files = result.data.map(item => {
            return {
              url: 'javascript:',
              img: PICTURE_HOST + item.url,
              title: item.title
            }
          })
        } else {
          return this.$store.dispatch('reset_toast_message', result.message);
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/less/skin.less";
.swiper_page_container {
  
}
</style>
