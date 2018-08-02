<template>
  <div class="index_container">
    <div class="head_container">
      <div class="head_top">
        <div class="head_top_left">
          <img src="/static/images/user-icon.png" alt="用户">
          <strong>{{ phone || account }}</strong>
        </div>
        <button @click="logout" class="logout">退出</button>
      </div>
      <h1 class="head_name">
        {{ shop_name }}
      </h1>
      <div class="head_identity">
        <ul>
          <li v-for="item in tags" :key="item">
            <strong>{{ item }}</strong>
          </li>
        </ul>
      </div>
    </div>
    <ul class="list_container">
      <li v-if="!phone">
        <router-link :to="{ name: 'bind' }">
          <h4>绑定手机号</h4>
          <p>使用手机号更便捷的登录</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'quotation' }">
          <h4>报价管理</h4>
          <p>让报价随时随地</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'foo' }">
          <h4>测试foo</h4>
          <p>让报价随时随地</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Cell, Group } from 'vux'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('login')

import ImageInput from '../components/ImageInput'
import QRCode from '../components/QRCode'

export default {
  name: 'Index',
  created () {
    this.getUserInfo();
  },
  components: {
    Group,
    Cell
  },
  computed: {
    ...mapState({
      account: state => {
        return state.account;
      },
      token: state => state.token,
      userId: state => state.userId,
      tags: state => state.tags,
      type: state => state.type,
      id: state => state.id,
      shop_name: state => state.shop_name,
      phone: state => state.phone
    })
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'logout',
      'getUserInfo'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../assets/less/skin.less";
    .index_container {
      min-height: 100vh;
      background-color: @body_bg;
      .head_container {
        width: 750/@rem;
        height: 420/@rem;
        background: @red url('/static/images/index-banner.jpg') no-repeat 0 0;
        background-size: cover;
        border: 1px solid transparent;
        .head_top {
          margin-top: 12/@rem;
          height: 44/@rem;
          .head_top_left {
            > img {
              width: 44/@rem;
              height: 44/@rem;
              margin-left: 28/@rem;
              float: left;
              vertical-align: middle;
              line-height: 44/@rem;
            }
            > strong {
              color: @white_color;
              font-size: 22/@rem;
              float: left;
              line-height: 44/@rem;
              text-indent: 10/@rem;
            }
          }
          .logout {
            float: right;
            margin-right: 10/@rem;
            height: 44/@rem;
            width: 128/@rem;
            background-color: @red_alpha;
            color: @white_color;
            font-weight: bolder;
            border: none;
            outline: none;
            &:active {
              background-color: @red_alpha_light;
            }
          }
        }
        .head_name {
          margin-top: 200/@rem;
          height: 36/@rem;
          text-align: center;
          color: @white_color;
          line-height: 34/@rem;
          font-size: 34/@rem;
        }
        .head_identity {
          margin-top: 36/@rem;
          > ul {
            li {
              display: inline-block;
              height: 36/@rem;
              border: 1px solid @white_border;
              font-size: 22/@rem;
              color: @white_color;
              border-radius: 100px;
              padding: 0 29/@rem;
              margin: 0 5/@rem;
              line-height: 40/@rem;
            }
          }
        }
      }
      .list_container {
        li {
          position: relative;
          margin-top: 24/@rem;
          height: 88/@rem;
          padding: 33/@rem 30/@rem 33/@rem 144/@rem;
          > a {
            float: left;
            width: 100%;
          }
          &:nth-of-type(1) {
            background: @white_bg url(/static/images/bind-phone-icon.png) no-repeat 28/@rem center;
            background-size: 88/@rem 88/@rem;
          }
          &:nth-of-type(2) {
            background: @white_bg url(/static/images/list-a.png) no-repeat 28/@rem center;
            background-size: 88/@rem 88/@rem;
          }

          h4, p {
            width: 90%;
            text-align: left;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          h4 {
            font-weight: normal;
            font-size: 30/@rem;
            line-height: 48/@rem;
            color: @333;
          }
          p {
            font-weight: bolder;
            font-size: 26/@rem;
            color: @888;
          }
          &::after {
            content: "";
            position: absolute;
            right: 30/@rem;
            top: 58/@rem;;
            width: 20/@rem;
            height: 36/@rem;
            background: url(/static/images/right-next.png) no-repeat left top;
            background-size: contain;
          }
        }
      }
    }
</style>
