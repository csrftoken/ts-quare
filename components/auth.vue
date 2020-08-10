<template>
  <div class="singin-popup">
    <div class="popup-content">
      <div class="close-btn" @click="$store.commit('setNeedLoginState', false)"></div>
      <div class="signin" v-if="authMode == 'signin'">
        <ul>
          <li @click="signinMode = 'password'" :class="{ 'item-active': signinMode == 'password' }">密码登录</li>
          <li @click="signinMode = 'mobile'" :class="{ 'item-active': signinMode == 'mobile' }">短信登录</li>
        </ul>
        <div v-if="signinMode == 'password'">
          <div class="username inputcontain" :class="{ active: passwordSiginForm.username.isActive }">
            <img :src="`${imgHost}/media/frontend/index/shouji@1x_1560849098.2282765.svg`" alt="">
            <input type="text" v-model="passwordSiginForm.username.value" @focus="[passwordSiginForm.username.isActive, passwordSiginForm.username.error] = [true, '']" @blur="passwordSiginForm.username.isActive = false" maxlength="20" autocomplete="off" placeholder="用户名/手机号" />
            <a class="err" v-if="passwordSiginForm.username.error">{{ passwordSiginForm.username.error }}</a>
          </div>
          <div class="password inputcontain" :class="{ active: passwordSiginForm.password.isActive }">
            <img :src="`${imgHost}/media/frontend/index/mima-4@1x_1560849097.9023619.svg`" alt="">
            <input :type="isShowPwd ? 'text' : 'password'" v-model="passwordSiginForm.password.value" @focus="[passwordSiginForm.password.isActive, passwordSiginForm.password.error] = [true, '']" @blur="passwordSiginForm.password.isActive = false" maxlength="20" autocomplete="off" placeholder="密码" />
            <a class="eye" @click="isShowPwd = !isShowPwd">
              <img v-show="isShowPwd" :src="`${imgHost}/media/frontend/index/yanjing@1x_1560849097.8918953.svg`">
              <img v-show="!isShowPwd" :src="`${imgHost}/media/frontend/index/眼睛关闭@1x_1560849097.5098064.svg`">
            </a>
            <a class="err" v-if="passwordSiginForm.password.error">{{ passwordSiginForm.password.error }}</a>
          </div>
        </div>
        <div v-if="signinMode == 'mobile'">
          <div class="mobile inputcontain" :class="{ active: codeSiginForm.mobile.isActive }">
            <img :src="`${imgHost}/media/frontend/index/shouji@1x_1560849098.2282765.svg`" alt="">
            <input type="text" v-model="codeSiginForm.mobile.value" @focus="[codeSiginForm.mobile.isActive, codeSiginForm.mobile.error] = [true, '']" @blur="codeSiginForm.mobile.isActive = false" maxlength="20" placeholder="仅支持已注册手机号" />
            <a class="err" v-if="codeSiginForm.mobile.error">{{ codeSiginForm.mobile.error }}</a>
          </div>
          <div class="checkword inputcontain" :class="{ active: codeSiginForm.code.isActive }">
            <img :src="`${imgHost}/media/frontend/index/yanzhengma-7@1x_1560849098.1486425.svg`" alt="">
            <input type="text" v-model="codeSiginForm.code.value" @focus="[codeSiginForm.code.isActive, codeSiginForm.code.error] = [true, '']" @blur="codeSiginForm.code.isActive = false" maxlength="6" placeholder="验证码" />
            <span class="inline">|</span>
            <span class="link-btn" ref="number" @click="runCaptcha('signin')">获取验证码</span>
            <a class="err" v-if="codeSiginForm.code.error">{{ codeSiginForm.code.error }}</a>
            <captcha product="bind" :openCaptcha="openCaptcha" @successHandler="sendCode"></captcha>
          </div>
        </div>
        <button @click="validate(authUser)">登录</button>
        <div class="other-way">
          <oauth></oauth>
          <div>
            <span>没有账号，</span>
            <span class="link-btn" @click="authMode = 'signup'">立即注册</span>
          </div>
        </div>
      </div>
      <div class="signup" v-if="authMode == 'signup'">
        <h2>新用户注册</h2>
        <div class="mobile inputcontain" :class="{ active: signupForm.mobile.isActive }">
          <img :src="`${imgHost}/media/frontend/index/shouji@1x_1560849098.2282765.svg`" alt="">
          <span @click="showNationNode = !showNationNode">+{{ nationCode }}</span>
          <ul class="nation-code" v-if="showNationNode" @mouseleave="showNationNode = false">
            <li v-for="(item, index) in nationCodes" :key="index" @click="changeNationNode(item.nation_code)">{{item.nation_name}}（+{{item.nation_code}}）</li>
          </ul>
          <img :src="`${imgHost}/media/frontend/index/86下拉_1560592227.793595.png`"  @click="showNationNode = !showNationNode" class="arrow">
          <input type="text" v-model="signupForm.mobile.value" @focus="[signupForm.mobile.isActive, signupForm.mobile.error] = [true, '']" @blur="signupForm.mobile.isActive = false" maxlength="20" placeholder="手机号" />
          <a class="err" v-if="signupForm.mobile.error">{{ signupForm.mobile.error }}</a>
        </div>
        <div class="checkword inputcontain" :class="{ active: signupForm.code.isActive }">
          <img :src="`${imgHost}/media/frontend/index/yanzhengma-7@1x_1560849098.1486425.svg`" alt="">
          <input type="text" v-model="signupForm.code.value" @focus="[signupForm.code.isActive, signupForm.code.error] = [true, '']" @blur="signupForm.code.isActive = false" maxlength="6" placeholder="验证码" />
          <span class="inline">|</span>
          <span class="link-btn" ref="number" @click="runCaptcha('signup')">获取验证码</span>
          <a class="err" v-if="signupForm.code.error">{{ signupForm.code.error }}</a>
          <captcha product="bind" :openCaptcha="openCaptcha" @successHandler="sendCode"></captcha>
        </div>
        <div class="password inputcontain" :class="{ active: signupForm.password.isActive }">
          <img :src="`${imgHost}/media/frontend/index/mima-4@1x_1560849097.9023619.svg`" alt="">
          <input :type="isShowPwd ? 'text' : 'password'" v-model="signupForm.password.value" @focus="[signupForm.password.isActive, signupForm.password.error] = [true, '']" @blur="signupForm.password.isActive = false" maxlength="20" placeholder="密码" />
          <a class="eye" @click="isShowPwd = !isShowPwd">
            <img v-show="isShowPwd" :src="`${imgHost}/media/frontend/index/yanjing@1x_1560849097.8918953.svg`">
            <img v-show="!isShowPwd" :src="`${imgHost}/media/frontend/index/眼睛关闭@1x_1560849097.5098064.svg`">
          </a>
          <a class="err" v-if="signupForm.password.error">{{ signupForm.password.error }}</a>
        </div>
        <button @click="validate(authUser)">注册</button>
        <div class="other-way">
          <oauth></oauth>
          <div>
            <span>已有账号，</span>
            <span class="link-btn" @click="authMode = 'signin'">直接登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import oauth from "~/components/oauth"
import captcha from "~/components/captcha"

import nationCodes from "../static/nationCode.json"

export default {
  components: {
    captcha,
    oauth
  },
  data () {
    return {
      // 是否开启滑动验证
      openCaptcha: false,
      // 计时器
      timer: null,
      // 认证模式：登录(signin)、注册(signup)
      authMode: 'signin',
      // 登录模式：密码(password)、验证码(code)
      signinMode: 'password',
      // 是否显示密码
      isShowPwd: false,
      showNationNode: false,
      nationCode: '86',
      nationCodes: nationCodes,
      // 密码模式登录 form
      passwordSiginForm: {
        username: {
          isActive: false,
          type: String,
          validator: function (value) {
            if (!value) {
              return '请输入用户名'
            }
          },
          value: '',
          error: '',
        },
        password: {
          isActive: false,
          validator: function (value) {
            if (!value) {
              return '请输入密码'
            }
            return ''
          },
          value: '',
          error: '',
        }
      },
      // 验证码登录 from
      codeSiginForm: {
        mobile: {
          isActive: false,
          type: String,
          validator: function (value) {
            if (!value) {
              return '请输入手机号码'
            }

            if (!/^[123456789]\d{6,}$/.test(value)) {
              return '手机号码格式不正确，请重新输入'
            }
            return ''
          },
          value: '',
          error: '',
        },
        code: {
          isActive: false,
          type: String,
          validator: function (value) {
            if (!value) {
              return '请输入验证码'
            }

            if (!/^\d{6}$/.test(value)) {
              return '请输入6位数字的验证码'
            }
            return ''
          },
          value: '',
          error: '',
        },
      },
      // 注册 form
      signupForm: {
        mobile: {
          isActive: false,
          type: String,
          validator: function (value) {
            if (!value) {
              return '请输入手机号码'
            }

            if (!/^[123456789]\d{6,}$/.test(value)) {
              return '手机号码格式不正确，请重新输入'
            }
            return ''
          },
          value: '',
          error: '',
        },
        code: {
          isActive: false,
          type: String,
          validator: function (value) {
            if (!value) {
              return '请输入验证码'
            }

            if (!/^\d{6}$/.test(value)) {
              return '请输入6位数字的验证码'
            }
            return ''
          },
          value: '',
          error: '',
        },
        password: {
          isActive: false,
          validator: function (value) {
            if (!value) {
              return '请输入密码'
            }

            if (!/[a-zA-Z0-9@\/'\\"#$%&\^*.~`!#$%^&=\-+_\[\]{}|<>?:;]{6,15}/.test(value)) {
              return '请输入6到15位的密码, 建议包含数字和字母'
            }
            return ''
          },
          value: '',
          error: '',
        }
      }
    }
  },
  methods: {
    // 加载滑动验证码
    runCaptcha (mode) {
      if (this.timer) return
      let form = mode == 'signin' ? this.codeSiginForm : this.signupForm
      let mobileErrmsg = form.mobile.validator(form.mobile.value)
      if (mobileErrmsg) return this.$message(mobileErrmsg)
      this.$performAction(
        "checkExists", "get",
        { field: 'mobile', mobile: form.mobile.value }
      ).then(resp => {
        let exists = resp.data.exists
        if (mode == 'signin') {
          if (!exists) mobileErrmsg = "手机号未注册，请注册"
        } else {
          if (exists) mobileErrmsg = "手机号已被注册"
        }
      }).then(msg => {
        if (mobileErrmsg) {
          this.$message(mobileErrmsg)
        } else {
          this.openCaptcha = !this.openCaptcha
        }
      }).catch(error => {
        this.openCaptcha = !this.openCaptcha
      })
    },
    sendCode (captchaInfo) {
      // 验证成功后自动触发，发送验证码
      let number = 60
      let form = this.authMode == 'signin' ? this.codeSiginForm : this.signupForm
      this.$performAction(
        "smsSend", "post",
        {},
        { mobile: form.mobile.value, nation_code: this.nationCode, ...captchaInfo }
      ).then(resp => {
        if (resp.code === 0) {
          this.$message("发送成功")
          this.timer = setInterval(() => {
            if (number > 0) {
              this.$refs.number.textContent = `${number--}s`
            } else {
              clearInterval(this.timer)
              this.timer = null
              this.$refs.number.textContent = "获取验证码"
            }
          }, 1000)
        } else {
          this.$message("发送失败，请稍后再试")
        }
      })
    },
    changeNationNode (data) {
      this.nationCode = data
      this.showNationNode = false
    },
    validate (callback) {
      let form
      if (this.authMode === 'signin') {
        form = this.signinMode == 'password' ? this.passwordSiginForm : this.codeSiginForm
      } else {
        form = this.signupForm
      }
      // 字段校验
      let valid = true
      Object.keys(form).forEach(key => {
        let field = form[key]
        let errmsg = field.validator(field.value)
        if (errmsg) {
          field.error = errmsg
          valid = false
        }
      })

      if (callback) {
        callback(this.authMode, valid, form)
      }
    },
    authUser (authMode, valid, form) {
      if (!valid) return
      let data = {}
      Object.keys(form).forEach(key => {
        data[key] = form[key].value
      })
      if (authMode === "signup") {
        data["nation_code"] = this.nationCode
      }
      this.$performAction(authMode, "post", { loginWay: this.signinMode }, data).then(resp => {
        if (resp.code == -1) {
          if (resp.data.hasOwnProperty("global_error")) {
            this.$message(resp.data.global_error.toString())
          } else {
            Object.keys(resp.data).forEach(key => {
              let errors = resp.data[key]
              if (form.hasOwnProperty(key)) {
                form[key].error = errors.toString()
              }
            })
          }
        } else {
          this.$message("登录成功")
          const authToken = resp.data.token
          // 关闭登录框
          this.$store.commit("setNeedLoginState", false)
          // token 存储
          this.$store.commit("auth/setAuthToken", authToken)
          // 进行 token 认证
          this.$store.dispatch("auth/runTokenAuthentication")
          // QUESTION: 重定向(此处之后可以看需求，目前似乎是不需要的)
          this.$router.push({ name: this.$route.name, params: this.$route.params, query: this.$route.query })
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .singin-popup {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background:rgba(0,0,0,0.75);
    z-index: 100;
    .popup-content {
      width: 400px;
      height: auto;
      background: #fff;
      border-radius:4px;
      text-align: center;
      padding: 38px 38px 58px;
      box-sizing: border-box;
      position: relative;
      .signin {
        width: 100%;
        height: auto;
        .err {
          color: red!important;
          font-size: 12px!important;
          padding: 0!important;
          display: block;
          text-decoration: none;
          position: absolute;
          left: 6px;
          bottom: -20px;
          width: 100%!important;
          text-align: left;
        }
        .active {
          border: 1px solid rgba(255,194,16,1) !important;
        }
        button {
          width: 324px;
          height: 42px;
          background: rgba(255,194,16,1);
          font-size: 16px;
          font-weight: 500;
          color: #FFF;
          margin-top: 30px;
          font-family: PingFangSC-Regular;
          letter-spacing: 1px;
        }
        .link-btn {
          color: #FFC220!important;
          cursor: pointer;
        }
        .other-way {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          span {
            line-height: 24px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(170,170,170,1);
            font-family: PingFangSC-Regular;
          }
        }
        ul {
          width: 324px;
          display: flex;
          justify-content: center;
          li {
            width: 50%;
            font-size: 16px;
            font-weight: 500;
            color: #4A4A4A;
            cursor: pointer;
            padding-bottom: 20px;
            border-bottom: 1px solid #E9E9E9;
          }
          .item-active {
            color: #FFC210;
            border-bottom: 1px solid #FFC210;
          }
        }
        .username {
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          img {
            width: 14px;
          }
          input {
            flex: 1;
            margin-left: 12px;
            font-size: 14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
        }
        .mobile {
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          input {
            flex: 1;
            margin-left: 12px;
            font-size:14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
        }
        .password {
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          img{
            width: 14px;
          }
          input {
            flex: 1;
            margin-left: 12px;
            font-size: 14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
          .eye {
            width: 18px!important;
            display: inline-block;
            float: right!important;
            margin-right: 15px;
            margin-left: 15px;
            cursor: pointer;
            img{
              width: 100%!important;
            }
          }
        }
        .checkword{
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          img {
            width: 14px;
          }
          input{
            flex: 1;
            margin-left: 12px;
            font-size:14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
          span {
            font-size: 14px;
            font-weight: 400;
            color:rgba(216,216,216,1);
            margin-right: 15px;
          }
        }
      }
      .signup {
        width: 100%;
        height: auto;
        h2 {
          font-size:18px;
          font-weight:500;
          color:rgba(40,40,40,1);
          font-family: PingFangSC-Regular;
        }
        .err {
          color: red!important;
          font-size: 12px!important;
          padding: 0!important;
          display: block;
          text-decoration: none;
          position: absolute;
          left: 6px;
          bottom: -20px;
          width: 100% !important;
          text-align: left;
        }
        .nation-code {
          position: absolute;
          top: -45px;
          margin-left: -1px;
          left: 0;
          width: 210px;
          background: white;
          border: 1px solid #dddddd;
          color: #999999;
          max-height: 280px;
          overflow: scroll;
          z-index: 6;
          display: block!important;
          li {
            text-align: left;
            width: 100%;
            height: 30px;
            cursor: pointer;
            line-height: 30px;
            font-size: 14px;
            padding-left: 10px;
            font-family: PingFangSC-Regular;
          }
          li:hover {
            background-color: #f9f9f9;
          }
        }
        .active {
          border: 1px solid rgba(255,194,16,1) !important;
        }
        button{
          width: 324px;
          height: 42px;
          background: rgba(255,194,16,1);
          font-size: 16px;
          font-weight: 500;
          color: #FFF;
          margin-top: 30px;
          font-family: PingFangSC-Regular;
          letter-spacing: 1px;
        }
        .link-btn {
          color: #FFC220!important;
          cursor: pointer;
        }
        .other-way {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          span {
            line-height: 24px;
            font-size:14px;
            font-weight:500;
            color:rgba(170,170,170,1);
            font-family: PingFangSC-Regular;
          }
        }
        ul{
          width: 324px;
          display: flex;
          margin-top: 80px;
          li{
            font-size:18px;
            font-weight:500;
            color:rgba(153,153,153,1);
            margin-right: 50px;
            cursor: pointer;
            padding-bottom: 20px;
          }
          .item-active {
            color:rgba(40,40,40,1)!important;
            border-bottom: 3px solid rgba(40,40,40,1);
            margin-bottom: -4px;
          }
        }
        .username{
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          img {
            width: 14px;
          }
          input{
            flex: 1;
            margin-left: 12px;
            font-size: 14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
        }
        .mobile {
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          span {
            width: 50px;
            font-size: 14px;
            color: #333;
            padding-left: 11px;
            padding-right: 6px;
            cursor: pointer;
          }
          img {
            width: 14px;
          }
          .arrow {
            width: 10px;
            cursor: pointer;
            margin-top: 2px;
          }
          input{
            flex: 1;
            margin-left: 12px;
            font-size:14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
        }
        .password{
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          img {
            width: 14px;
          }
          input{
            flex: 1;
            margin-left: 12px;
            font-size:14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
          .eye {
            width: 18px!important;
            display: inline-block;
            float: right!important;
            margin-right: 15px;
            margin-left: 15px;
            cursor: pointer;
            img {
              width: 100%!important;
            }
          }
        }
        .checkword{
          border: 1px solid #dddddd;
          padding-left: 15px;
          display: flex;
          align-items: center;
          margin-top: 40px;
          position: relative;
          img {
            width: 14px;
          }
          input {
            flex: 1;
            margin-left: 12px;
            font-size:14px;
            color:rgba(40,40,40,1);
            height: 34px;
            border: none;
          }
          span {
            font-size:14px;
            font-weight:500;
            color:rgba(216,216,216,1);
            font-family: PingFangSC-Regular;
            margin-right: 15px;
          }
        }
      }
    }
    .close-btn {
      width: 26px;
      height: 26px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
    .close-btn:before,.close-btn:after {
      transform: rotate(45deg);
    }
    .close-btn::before {
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      height: 0;
      width: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -1px;
      margin-left: -10px;
    }
    .close-btn::before {
      content: "";
      display: block;
      background-color: #000;
    }
    .close-btn:after {
      content: "";
      display: block;
      background-color: #000;
    }
    .close-btn::after {
      border-left: 1px solid #000;
      border-right: 1px solid #000;
      height: 20px;
      width: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -1px;
      margin-top: -10px;
    }
  }
  </style>
