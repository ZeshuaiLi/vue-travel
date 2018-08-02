<template>
  <div class="login">
    <div class="banner">
      <x-img default-src="/static/images/login-banner.jpg" class="logo_banner" error-class="ximg-error" container="#vux_view_box_body"></x-img>
    </div>
    <image-input
      v-model="account"
      validateType="emailOrMobile"
      placeholder="手机号/邮箱"
      type="text"
      bgi="/static/images/person-icon.png"
      ></image-input>
    <image-input 
      v-model="password"
      validateType="password"
      placeholder="密码"
      type="password"
      bgi="/static/images/password-icon.png"
      ></image-input>
    <q-r-code v-if="needCode" @validerSuccess="ercode"></q-r-code>
    <button @click="login" class="login_button">登录</button>
  </div>
</template>

<script>
import { Group, XInput, XImg, XButton } from 'vux'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('login')

import ImageInput from '../components/ImageInput'
import QRCode from '../components/QRCode'

export default {
  name: 'Login',
  created () {
  },
  computed: {
    ...mapState({
      needCode: state => state.needCode
    })
  },
  components: {
    Group,
    XInput,
    XImg,
    ImageInput,
    QRCode,
    XButton
  },
  data () {
    return {
      account: '',
      password: '',
      code: '',
      codeId: ''
    }
  },
  watch: {},
  methods: {
    ercode (data) {
      this.codeId = data.id;
      this.code = data.code;
    },
    ...mapActions({
      loginA: 'login'
    }),
    login () {
      if (this.needCode) {
        if (!this.code || !this.codeId) {
          return false;
        }
      }
      if (this.account && this.password) {
        this.loginA(this);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../assets/less/skin.less";
    .login {
      background-color: #fff;
      .banner {
        margin-top: 88 / @rem;
        .logo_banner {
          width: 270 / @rem;
          height: 356 / @rem;
        }
      }
      .login_button {
        width: 675/@rem;
        height: 100/@rem;
        margin-top: 25/@rem;
        background-color: @red;
        font-size: 36/@rem;
        font-weight: 600;
        line-height: 100/@rem;
        color: @white_color;
      }
      .login_button:active {
        background-color: @red_light;
      }
    }
</style>
