import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

export default ({ store }) => {
  // 设置request拦截
  // request拦截器
  request.interceptors.request.use(
    config => {
      try {
        const { user } = store.state
        if (user && user.token) {
          config.headers['Authorization'] = 'Token ' + user.token
        }
      } catch (err) {
        // No valid cookie found
        console.log(err)
      }
      return config
    },
    error => {
      console.log(error)
      Promise.reject(error)
    }
  )
}