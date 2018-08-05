<template>
  <div>
    <home-header></home-header>
    <index-swiper></index-swiper>
    <Menu></Menu>
  </div>
</template>
<script>
  import HomeHeader from "./components/Header"
  import IndexSwiper from "./components/Indexswiper"
  import Menu from "./components/Menu"
  export default {
    name: 'Home',
    components: {
      HomeHeader,
      IndexSwiper,
      Menu
    }
  }
</script>
<style>

</style>
