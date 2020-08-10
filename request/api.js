
// 版本号
const VERSION = 'v1'
// URI 前缀
const BASIC_URI_PREFIX = `/api/${VERSION}`

export const apiMapping = {
  // 认证 -> 登录
  signin: params => `${BASIC_URI_PREFIX}/auth/${params.loginWay}/login/`,
  // 认证 -> 注册
  signup: params => `${BASIC_URI_PREFIX}/auth/register/`,
  // 认证 -> 授权注册
  oauthSignup: params => `${BASIC_URI_PREFIX}/auth/registration/`,
  // 认证 -> token，如果有效返回个人相关信息
  tokenAuth: params => `${BASIC_URI_PREFIX}/auth/token/`,
  // 认证 -> 滑动验证码
  authCaptcha: params => `${BASIC_URI_PREFIX}/auth/captcha/`,
  // 认证 -> 微信快捷登录
  ouathWechat: params => `${BASIC_URI_PREFIX}/auth/wechat/`
}
