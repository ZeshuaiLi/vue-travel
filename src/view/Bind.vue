<template>
  <div class="bind_container">
    <div class="banner">
      <img src="/static/images/bind-phone-text.png">
    </div>
    <div class="image-input margin-t">
      <img class="image-icon" src="/static/images/person-icon.png">
      <x-input ref="phone" type="text" v-model="phone" required is-type="china-mobile" placeholder="您的手机"></x-input>
    </div>
    <flexbox class="code_container">
      <flexbox-item gutter="8">
        <div class="image-input">
          <img class="image-icon" src="/static/images/password-icon.png">
          <x-input ref="code" type="text" :max="6" v-model="code" required placeholder="动态码"></x-input>
        </div>
      </flexbox-item>
      <flexbox-item gutter="8">
        <button @click="sendSmsCode" class="getCode">{{ code_ajax ? code_ajax + 's' : '获取动态码' }}</button>
      </flexbox-item>
    </flexbox>
    <x-button @click.native="bindPhoneHandler" class="login_button" type="primary"
      action-type="button"
      >立即绑定</x-button>
    <p class="tips">提示：绑定手机后，原有密码保持不变</p>
  </div>
</template>

<script>
import { XInput, XButton, Flexbox, FlexboxItem } from "vux";
import { createNamespacedHelpers } from "vuex";
import { setInterval, clearInterval } from 'timers';
const { mapActions } = createNamespacedHelpers("login");

export default {
  name: "Bind",
  created() {
  },
  components: {
    XInput,
    XButton,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      // 短信验证码请求
      code_ajax: 0,
      phone: '',
      code: '',
      interval_instance: false
    };
  },
  methods: {
    ...mapActions(["bindPhone", "sendCode"]),
    sendSmsCode () {
      if (this.$refs.phone.valid && !this.code_ajax) {
        this.code_ajax = 60;
        this.interval();
        this.sendCode(this.phone);
      }
    },
    bindPhoneHandler () {
      if (this.$refs.phone.valid && this.$refs.code.valid) {
        this.bindPhone({
          mobile: this.phone,
          smsAuthCode: this.code
        });
      }
    },
    interval () {
      if (this.interval_instance) {
        clearInterval(this.interval_instance);
      }
      this.interval_instance = setInterval(() => {
        this.code_ajax--
        if (this.code_ajax <= 0) {
          this.code_ajax = false;
          clearInterval(this.interval_instance);
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval_instance);
    this.code_ajax = 0;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/less/skin.less";
.bind_container {
  padding: 72/@rem 48/@rem;
  .banner {
    height: 105/@rem;
    text-align: left;
    img {
      height: 100%;
    }
  }
  .code_container, .margin-t{
    margin-top: 48/@rem;
  }
  .image-input {
    position: relative;
    .image-icon {
      position: absolute;
      left: 30 / @rem;
      width: 34 / @rem;
      height: 34 / @rem;
      top: 50%;
      margin-top: -17/@rem;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: @input_placeholder;
      font-family: "SimHei", "Microsoft YaHei";
    }
    .vux-x-input.weui-cell {
      height: 52 / @rem;
      border: 1px solid @input_border;
      border-radius: 3px;
      padding: 17 / @rem 10/@rem 16 / @rem 78 / @rem;
      font-size: 26 / @rem;
      line-height: 26 / @rem;
      &::after,
      &::before {
        display: none;
      }
    }
  }
  .login_button {
    height: 100 / @rem;
    margin-top: 48/@rem;
    background-color: @red;
    font-size: 36 / @rem;
    font-weight: 600;
    line-height: 100 / @rem;
  }
  .login_button:active {
    background-color: @red_light;
  }
  .getCode {
    width: 100%;
    height: 88/@rem;
    font-size: 26/@rem;
    line-height: 86/@rem;
    border: 1px solid @red_border;
    border-radius: 3px;
    color: @color_red;
    background-color: @white_button;
    outline: none;
  }
  .tips {
    margin-top: 50/@rem;
    font-size: 24/@rem;
    line-height: 20/@rem;
  }
}
</style>
