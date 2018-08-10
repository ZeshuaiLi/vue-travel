<template>
    <div id="sms-code">
        <div class="list form-phone">
            <input type="text" v-model="tel" id="mobile-ipt" placeholder="您的手机" maxlength="11">
        </div>
        <div class="list form-vaid-code clearfix" v-if="needImgCode">
            <input type="text" v-model="imageAuthCode" maxlength="4" placeholder="验证码" id="vaid-code-ipt">
            <div class="code-img" @click="imageAuthCodeRefresh">
                <img :src="codeImg" id="image-auth-code">
            </div>
        </div>
        <div class="list form-message-code clearfix">
            <input type="text" v-model="smscode" id="vaid-code" maxlength="6" placeholder="动态码">
            <a class="send-message" :class="{active:sendMessageActive}" @click="sendImage">{{getMessageText}}</a>
        </div>
    </div>
</template>

<script>
	import {createNamespacedHelpers} from 'vuex'
	import axios from 'axios'
	import common from "../../../static/js/common"

	const {mapActions, mapState} = createNamespacedHelpers('login');
	export default {
		name: 'Smscode',
		data() {
			return {
				tel: "",
				smscode: "",
				needImgCode: false,
				codeImg: '',
				authCodeId: "",
				imageAuthCode: "",
				getMessageText: "获取动态码",
				countDown: 10,
				sendMessageActive: false
			}
		},
		components: {
		},
		methods: {
			sendImage: function () {
				var self = this;
				if (!/^1[23456789]\d{9}$/.test(self.tel)) {
					common.showTip("手机号码错误");
					return false;
				}
				if (self.sendMessageActive) {
					return;
				}
				var params = {
					mobile: self.tel,
					pageType: 1
				}
				if (self.needImgCode) {
					params.imageAuthCode = self.imageAuthCode,
						params.imageAuthCodeId = self.authCodeId
				}
				axios.get(HOME_HOST + '/authCode/getSMSCode', {
					params: params
				}).then(function (data) {
					console.log(data);
					if (data.code == '200') {
						self.componentsNew();
					}
					if (data.code == '201003') {
						self.needImgCode = true
					}
				}).catch(function (res) {
					console.log(res);
				})
			},
			imageAuthCodeRefresh: function () {
				var self = this;
				axios.get('http://home.efubao.qa/authCode/getImageAuthCode', {}).then(function (data) {
					console.log(data);
					self.codeImg = data.object.imgBase64Src;
					self.authCodeId = data.object.authCodeId;
				}).catch(function (res) {
					console.log(res);
				})
			},
			componentsNew: function () {
				var self = this;
				var time = self.countDown;
				self.sendMessageActive = true;
				console.log(self.sendMessageActive);
				var t = setInterval(function () {
					self.countDown -= 1;
					self.getMessageText = '重发  ' + self.countDown + 's';
					if (self.countDown <= 0) {
						clearInterval(t);
						self.getMessageText = "获取动态码";
						self.countDown = time;
						self.sendMessageActive = false;
					}
				}, 1000)
			}
		},
		watch: {
			needImgCode: function (val, oldval) {
				this.imageAuthCodeRefresh();
			}
		}
	}
</script>

<style scoped lang="less">
    @import "/src/assets/less/skin.less";
    #sms-code {
        margin-bottom: 15rem/@rem;
        margin: 50rem/@rem;
        .list {
            width: 100%;
            margin-bottom: 15rem/@rem;
        }
        input {
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            border: 1px solid #cccccc;
            font-size: 26rem/@rem;
            padding: 0 0.55rem;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            height: 90rem/@rem;
            width: 100%;
        }
        .form-vaid-code {
            input {
                width: 340rem/@rem;
                float: left;
            }
            .code-img {
                border: 1px solid #cccccc;
                width: 270rem/@rem;
                float: right;
                height: 90rem/@rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .form-message-code {
            input {
                width: 340rem/@rem;
                float: left;
            }
            .send-message {
                font-family: 'Microsoft YaHei';
                border: 1px solid #FF5252;
                width: 270rem/@rem;
                display: block;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 26rem/@rem;
                float: right;
                text-align: center;
                color: #FF5252;
                float: right;
                height: 90rem/@rem;
                line-height: 90rem/@rem;
                &.active {
                    color: #fff;
                    background-color: #FF5252;
                }
            }
        }

    }
</style>
