<template>
  <div class="oauth-box">
    <div @click="oauthLogin('wx')">
      <img src="//hcdn2.luffycity.com/media/frontend/activity/wx_logo.png">
      <span>微信登录</span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginTypes: {
        "wx": "",
        "qq": ""
      },
    }
  },
  mounted () {
    this.initCallback()
    this.initOauthUrl()
  },
  methods: {
    // 初始化回调方法
    initCallback () {
      window["loginCallback"] = data => {
        this.loginCallback(data)
      }
    },
    // 初始化快捷登录 url
    initOauthUrl () {
      this.$performAction("ouathWechat", "get").then(resp => {
        this.loginTypes["wx"] = resp.data.oauth_url
      })
    },
    // 打开窗口
    oauthLogin (loginType) {
      const {
        availTop, // 返回浏览器可用空间左边距离屏幕（系统桌面）左边界的距离。
        availLeft, // 返回浏览器可用空间左边距离屏幕（系统桌面）左边界的距离。
        availHeight, // 浏览器在显示屏上的可用高度，即当前屏幕高度
        availWidth, // 浏览器在显示屏上的可用宽度，即当前屏幕宽度
      } = window.screen
      const pageWidth = 700 // 弹出窗口的宽度
      const pageHeight = 550 // 弹出窗口的高度
      let pageTop = (availHeight - pageHeight) / 2 // 窗口的垂直位置
      let pageLeft = (availWidth - pageWidth) / 2 // 窗口的水平位置;
      // 兼容 chrome 的bug
      if (navigator.userAgent.indexOf('Chrome') !== -1) {
        pageTop += availTop // 距顶偏移值
        pageLeft += availLeft // 距左偏移值
      }
      this.$store.commit("route/setPrevRoute", this.$route.fullPath)
      window.open(this.loginTypes[loginType], 'newwindow', `width=${pageWidth},height=${pageHeight},top=${pageTop},left=${pageLeft}`) // 实现居中弹窗
    },
    // 回调函数
    loginCallback (data) {
      // 如果已经绑定就表示已登录, 未绑定跳转至登录界面
      if (data.is_bind) {
        this.$message("登录成功")
        const authToken = data.token
        // 关闭登录框
        this.$store.commit('setNeedLoginState', false)
        // token 存储
        this.$store.commit('auth/setAuthToken', authToken)
        // 进行 token 认证
        this.$store.dispatch('auth/runTokenAuthentication')
        // 页面重定向
        this.$router.push(this.$store.state.route.prevRoute)
      } else {
        // 数据存储之后跳转至绑定手机页面
        window.localStorage.setItem("oauthInfo", JSON.stringify(data))
        this.$router.push('/oauth/bind-phone')
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.oauth-box {
  width: 100px;
  cursor: pointer;
  div {
    img {
      width: 24px;
    }
    span {
      line-height: 24px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(170,170,170,1);
      padding-left: 6px;
    }
  }
}

</style>
