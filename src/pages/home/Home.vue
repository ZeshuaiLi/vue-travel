<template>
  <div>
    <home-header></home-header>
    <index-swiper></index-swiper>
    <p>test</p>
  </div>
</template>
<script>
  import HomeHeader from "./components/Header"
  import IndexSwiper from "./components/Indexswiper"
  export default {
    name: 'Home',
    components: {
      HomeHeader,
      IndexSwiper
    }
  }
</script>
<style>

</style>
