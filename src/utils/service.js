import axios from 'axios'
import Vue from "vue";
import {
  Toast
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
    if (!config.hideloading) {
      // loading
      let toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '加载中...',
      })
      toastArr.push(toast)
    }
    config.headers['Authorization'] = 'Bearer ' + store.state.appInfo.Authorization
    config.headers['OS'] = store.state.appInfo.OS
    config.headers['Source'] = store.state.appInfo.Source
    config.headers['MobileModel'] = store.state.appInfo.MobileModel
    config.headers['AppVersion'] = store.state.appInfo.AppVersion

    if (!store.state.appInfo.Authorization && process.env.NODE_ENV === 'development') {
      // config.headers['Authorization'] = 'Bearer ' + '9E600497FC0474C8790C28E817258B43'
      config.headers['Authorization'] = 'Bearer ' + '5327A5B8E0C0FE3C719E68730E4515F8'
      config.headers['OS'] = '1'
      config.headers['Source'] = '10000'
      config.headers['MobileModel'] = 'Iphone8'
      config.headers['AppVersion'] = '1.0.0'
    }
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
    toast.clear()
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
    toast.clear()
    if (error.msg) {
      Toast(error.msg)
    } else {
      if (error.message.indexOf('timeout') > -1) {
        Toast('接口超时')
      } else if (error.message.indexOf('Network') > -1) {
        Toast('网络异常')
      } else {
        Toast("服务器异常")
      }

    }


    return Promise.reject(error)
  }
)

//返回一个Promise(发送post请求)
export function POST (url, params) {
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
export function GET (url, param) {
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

export function POSTFORMAT (url, params) {
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
