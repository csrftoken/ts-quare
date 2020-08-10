
// const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  // 是否需要登录的状态
  isNeedLogin: false,
  // 是否隐藏头部
  isHideHeader: false,
})

export const mutations = {
  setNeedLoginState (state, value) {
    state.isNeedLogin = value
  },
  setHeaderState (state, value) {
    state.isHideHeader = value
  }
}

export const actions = {
  // 每次界面刷新的时候，加载用户认证信息
  async nuxtServerInit ({ dispatch, commit }, { req }) {
    // let authToken = null
    // if (req.headers.cookie) {
    //   const parsed = cookieparser.parse(req.headers.cookie)
    //   authToken = parsed.token
    // }
    // await commit("auth/setAuthToken", authToken)
    // await dispatch("auth/runTokenAuthentication")
    // await dispatch("getStudentResultCount")
  }
}
