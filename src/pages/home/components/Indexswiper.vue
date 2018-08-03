<template>
    <div class="wrapper">
        <swiper :options="swiperOption" class="homeswiper">
            <!-- slides -->
            <swiper-slide>
                <img src="http://m.efubao.com/static_new/img/index/banner-1-180801.jpg">
            </swiper-slide>
            <swiper-slide>
                <img src="http://m.efubao.com/static_new/img/index/banner-2-180801.jpg">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <!--左右箭头-->
            <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
            <!--<div class="swiper-button-next" slot="button-next"></div>-->
            <!--下面的条-->
            <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
    </div>
</template>
<script>
  export default {
    name: 'IndexSwiper',
    data: function () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true
        }
      }
    }
  }
</script>
<style scoped lang="less">
    @import "../../../assets/less/skin.less";
    .wrapper /deep/ .swiper-pagination-bullet-active {
        background-color: #fff !important;
    }
    .wrapper {
        width: 100%;
        height: 0;
        overflow: hidden;
        height: 410rem/@rem;
        background-color: #eee;
        .homeswiper{
            img {
                width: 100%;
                display: block;
                height: 410rem/@rem;
            }
        }
    }
</style>
<style>

</style>
