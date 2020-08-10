<template>
  <div>
    <div id="embed-captcha"></div>
    <p id="wait">验证码加载中...</p>
    <p id="notice">请先拖动验证码到相应位置</p>
  </div>
</template>

<script>

if (process.client) {
  require("~/assets/js/gt.js")
}

export default {
  head: {
    script: [
      { src: '//hcdn2.luffycity.com/media/js/jquery3.4.1.min.js' },
    ]
  },
  props: {
    product: String,
    openCaptcha: {
      default: false
    }
  },
  data() {
    return {
      captcha: null,
      result: {},
    }
  },
  mounted () {
    this.initCaptcha();
  },
  methods: {
    initCaptcha () {
      this.$performAction("authCaptcha", "get").then(resp => {
        initGeetest({
          width: "100%",
          gt: resp.data.gt,
          challenge: resp.data.challenge,
          product: this.product || "float",
          offline: !resp.data.success
        }, this.handler)
      })
    },
    handler (captcha) {
      let self = this
      this.captcha = captcha;
      // 不同的产品类型处理的验证码逻辑也不同
      if (this.product === "bind") {
        captcha.onReady(function () {
          $("#wait").hide();
          $("#notice").hide();
        }).onSuccess(function () {
          let result = captcha.getValidate();
          self.$emit("successHandler", result)
        });
      } else {
        $('#embed-captcha').empty();
        captcha.appendTo("#embed-captcha");
        captcha.onReady(function () {
          $("#wait").hide();
        }).onSuccess(function () {
          this.result = captcha.getValidate();
        });
        $("#embed-submit").click(function (e) {
          let validate = captcha.getValidate();
          if (!validate) {
            $("#notice").show();
            setTimeout(function () {
              $("#notice").hide();
            }, 2000);
            e.preventDefault()
          }
        });
      }
    },
    runVerify () {
      if (this.captcha) {
        this.captcha.verify()
      }
    }
  },
  watch: {
    openCaptcha (oldVal, newVal) {
      this.runVerify()
    }
  }
}

</script>

<style>

#embed-captcha {
  display: none;
  width: 100%;
}
#wait{
  display: none;
}
#notice{
  display: none;
}

</style>
