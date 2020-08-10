
// 获取 api 映射
import { apiMapping } from "~/request/api"

export default ({ app, store }, inject) => {
  // api 方法注入
  inject("performAction", (action, method, params = {}, data = {}) => {
    let headers = {}
    if (store.state.auth.authToken) {
      headers["Authorization"] = `Bearer ${store.state.auth.authToken}`
    }

    return app.$axios.request({
      method,
      params,
      data,
      headers,
      url: apiMapping[action](params),
      baseURL: process.env.baseURL
    })
  })

  // 注入需要登录的提示框
  inject("requiredSignIn", () => {
    store.commit("setNeedLoginState", true)
    store.commit("auth/removeAuthToken")
  })
}
