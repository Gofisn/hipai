import axios from 'axios'
import Vue from "vue";
import {
  Toast,
  Dialog
} from 'vant'
import qs from 'qs'
import store from '@/store'
// import {
//   getSystemInfoFromApp
// } from '@/assets/js/utils'


let baseurl = process.env.NODE_ENV === 'development' ? '' : ''
const service = axios.create({
  baseURL: baseurl, // url = base url + request url
  // withCredentials: true, // 表示跨域请求时是否需要使用凭证
})
Toast.allowMultiple()
var toastArr = [];
// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    // if (!config.hideloading) {
    if ((config.params && config.params.hideloading == true) || (config.data && config.data.indexOf('hideloading=true') !== -1)) {} else {
      // loading
      let toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: 'Memuat...',
      })
      toastArr.push(toast)
    }
    config.headers['Authorization'] = 'Bearer ' + store.state.appInfo.Authorization
    config.headers['OS'] = store.state.appInfo.OS
    config.headers['Source'] = store.state.appInfo.Source
    config.headers['MobileModel'] = store.state.appInfo.MobileModel
    config.headers['AppVersion'] = store.state.appInfo.AppVersion
    config.headers['RequestedAt'] = parseInt(Date.now() / 1000)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    let toast = toastArr.pop()
    if (toast) {
      toast.clear()
    }
    const res = response.data
    if (res.code && res.code !== 200) {
      // 登录超时,重新登录
      if (res.code === 401) {
        // if (window.android && window.android.loginApp) {
        //   window.android.loginApp();
        // }
        Vue.prototype.$getSystemInfoFromApp('loginApp')
      }

    }
    return Promise.resolve(res)
  },
  error => {
    let toast = toastArr.pop()
    if (toast) {
      toast.clear()
    }
    if (error.msg) {
      Toast(error.msg)
    } else {
      if (error.message.indexOf('timeout') > -1) {
        Toast('Sistem error')
      } else if (error.message.indexOf('Network') > -1) {
        Toast('Jaringan internet tidak normal')
      } else {
        Toast("Layanan sedang error")
      }

    }


    return Promise.reject(error)
  }
)

//返回一个Promise(发送post请求)
export function POST(url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, qs.stringify(params))
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })

  })
}

//返回一个Promise(发送get请求)
export function GET(url, param) {
  return new Promise((resolve, reject) => {
    service.get(url, {
        params: param
      })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function POSTFORMAT(url, params) {
  return new Promise((resolve, reject) => {
    service({
        url: url,
        method: 'post',
        data: params,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default service