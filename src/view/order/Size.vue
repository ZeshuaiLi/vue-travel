<template>
  <div class="size_page_container">
    <img :src="src" alt="">
  </div>
</template>

<script>
import VueUploadComponent from "vue-upload-component";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

export default {
  name: "swiper_page_container",
  created () {
    const query = this.$route.query;
    const id = query.id;
    const s_id = query.s_id;
    if (!id) {
      return this.$router.push({
        path: '/order/index'
      })
    }
    if (!s_id) {
      return this.$router.push({
        path: '/order/detail',
        query: {
          id: id
        }
      })
    }
    this.getImage(id, s_id)
  },
  components: {
  },
  data() {
    return {
      src: undefined
    };
  },
  methods: {
    getImage (id, s_id) {
      this.$http({
        method: 'post',
        url: '/api/offer/offerSizePic',
        data: {
          spOfferId: s_id
        }
      }).then(result => {
        if (result.code === '200') {
          this.src = PICTURE_HOST + result.data.sizePic;
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
.size_page_container {
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
