
// 用户认证状态树
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  user: {},
  isLogin: false,
  authToken: null
})

export const mutations = {
  setAuthToken (state, token) {
    state.authToken = token
    if (process.client) {
      Cookie.set('token', token)
    }
  },
  setUser (state, data) {
    state.isLogin = true
    state.user = data
  },
  removeAuthToken (state) {
    state.user  = {}
    state.isLogin = false
    state.authToken = null
    Cookie.remove('token')
  },
  resetCartNumber (state, number) {
    if (state.isLogin) {
      state.user.cart_number += number
    }
  }
}

export const actions = {
  async runTokenAuthentication ({ state, commit }) {
    // 根据 token 去进行认证
    const data = await this.$performAction('tokenAuth', 'get')
    if (data.code === 0) {
      commit('setUser', data.data)
    } else {
      commit('setAuthToken', null)
    }
  }
}
