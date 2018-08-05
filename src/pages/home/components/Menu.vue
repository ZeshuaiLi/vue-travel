<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in pageFn" :key="index">
        <ul class="menu">
          <li v-for="(liitem, index) in item" :key="liitem.id">
            <a :href="liitem.herf">
              <img :src="liitem.imgUrl">
              <p>{{liitem.text}}</p>
            </a>
          </li>
        </ul>
      </swiper-slide>
      <!--<swiper-slide>-->
        <!--<ul class="menu clearfix">-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/case.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu1.png">-->
              <!--<p>定制案例</p>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/zhuanti.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu2.png">-->
              <!--<p>精选专题</p>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/taocan.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu3.png">-->
              <!--<p>场景定制</p>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/article_1_1.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu4.png">-->
              <!--<p>定制攻略</p>-->
            <!--</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</swiper-slide>-->
      <!--<swiper-slide>-->
        <!--<ul class="menu clearfix">-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/case.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu1.png">-->
              <!--<p>定制案例</p>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/zhuanti.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu2.png">-->
              <!--<p>精选专题</p>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/taocan.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu3.png">-->
              <!--<p>场景定制</p>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="http://m.efubao.com/article_1_1.html">-->
              <!--<img src="http://m.efubao.com/static_new/img/menu4.png">-->
              <!--<p>定制攻略</p>-->
            <!--</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</swiper-slide>-->
    </swiper>
  </div>
</template>
<script>
  export default {
    name: 'HomeMenu',
    data() {
      return {
        swiperOption: {},
        menuLists: [
          {
            id: '001',
            imgUrl: 'http://m.efubao.com/static_new/img/menu1.png',
            text: '定制案例',
            herf: 'http://m.efubao.com/case.html'
          },
          {
            id: '002',
            imgUrl: 'http://m.efubao.com/static_new/img/menu2.png',
            text: '精选专题22',
            herf: 'http://m.efubao.com/zhuanti.html'
          },
          {
            id: '003',
            imgUrl: 'http://m.efubao.com/static_new/img/menu3.png',
            text: '场景定制',
            herf: 'http://m.efubao.com/taocan.html'
          },
          {
            id: '004',
            imgUrl: 'http://m.efubao.com/static_new/img/menu4.png',
            text: '定制攻略',
            herf: 'http://m.efubao.com/article_1_1.html'
          },
          {
            id: '005',
            imgUrl: 'http://m.efubao.com/static_new/img/menu3.png',
            text: '场景定制',
            herf: 'http://m.efubao.com/taocan.html'
          }
        ]
      }
    },
    computed: {
      pageFn() {
        var page = [];
        this.menuLists.forEach(function (item, index) {
          let floor = Math.floor(index / 4);
          if (!page[floor]) {
            page[floor] = [];
          }
          page[floor].push(item);
        })
        console.log(page)
        return page
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../../assets/less/skin.less";

  .menu {
    padding-top: 0.9rem;
    padding-bottom: 0.6rem;
  }

  .menu > li {
    float: left;
    margin-left: 0.475rem;
    padding: 0 26rem/@rem;
  }

  .menu > li a {
    display: block;
  }

  .menu > li:first-child {
    margin-left: 36rem/@rem;
  }

  .menu > li img {
    width: 104rem/@rem;
    height: 104rem/@rem;
  }

  .menu > li p {
    line-height: 1.25rem;
    height: 1.25rem;
    font-size: 0.5rem;
    color: #7D7D7D;
  }
</style>
