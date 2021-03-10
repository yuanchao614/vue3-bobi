import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import Store from '@/store'
import { getLocalStorageValue } from '../../utils'

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status
  /** notice text */
  let message = 'Request Error'
  switch (code) {
    case 400:
      message = 'Request Error'
      break
    case 401:
      message = 'Unauthorized, please login'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '访问资源不存在'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '位置错误'
      break
    case 501:
      message = '承载服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务暂不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = '暂不支持的 HTTP 版本'
      break
    default:
      message = '位置错误'
  }
  return message
}

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const service = Axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    'User-Type': 'bus'
  }
})

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // 如果是获取token接口：
  if (config.url === 'auth/login') {
    // let userAccount = ''
    // // 若存在username，则为登录情况，判断user-account
    // if (config.params.username) {
    //   userAccount = config.params.username.includes('-')
    //     ? 'ACCOUNT_USER'
    //     : 'ADMIN_USER'
    // } else {
    //   // 刷新token情况，通过用户信息email是否有值判断
    //   userAccount = Store.state.user.userDetail.email
    //     ? 'ADMIN_USER'
    //     : 'ACCOUNT_USER'
    // }

    // config.headers['User-Account'] = userAccount
    // config.headers.Authorization = 'Basic ZmViczoxMjM0NTY='
  } else {
    // 如果保存有token，则取，否则不添加Authorization
    const token = getLocalStorageValue('access_token');
    if (token) {
      const tokenType = 'Bearer'
      config.headers.Authorization = `${tokenType} ${token}` // type后必须有一个空格
    }
  }

  return config
})

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
  /** 请求有响应 */
  async (response: AxiosResponse) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      const __text = getErrorCode2text(response)
      return Promise.reject(new Error(__text))
    }
  },
  /** 请求无响应 */
  (error: AxiosError) => {
    let __emsg: string = error.message || ''

    if (error.message) {
      __emsg = error.message
    }

    if (error.response) {
      __emsg = error.response.data.message
        ? error.response.data.message
        : error.response.data.data
    }
    // timeout
    if (__emsg.indexOf('timeout') >= 0) {
      __emsg = 'timeout'
    }

    if (error?.response?.status === 401) {
      if (router.currentRoute.value.path !== '/login') {
        ElMessage.error('登录凭证已过期，请重新登录')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
      return Promise.reject(new Error('401'))
    }
    return Promise.reject(new Error(__emsg))
  }
)

export default service