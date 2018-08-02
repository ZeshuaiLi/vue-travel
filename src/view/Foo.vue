<template>
    <div>
        <p>data1:{{data1}}</p>
        <p>data2:{{data2}}</p>
        <hellow></hellow>
    </div>
</template>
<script>
  import {Cell, Group} from 'vux'
  import {createNamespacedHelpers} from 'vuex'
  import hellow from "@/components/hellow";
  const {mapActions, mapState} = createNamespacedHelpers('test')

  import ImageInput from '../components/ImageInput'
  import QRCode from '../components/QRCode'

  export default {
    name: 'Foo',
    created() {
      this.getDataInfo();
    },
    components: {
      hellow
    },
    computed: {
      ...mapState({
        data1: state => state.data1,
        data2: state => state.data2
      })
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions([
        'getDataInfo'
      ])
    }
  }
</script>
<style scoped lang="less">
    @import "../assets/less/skin.less";
</style>
