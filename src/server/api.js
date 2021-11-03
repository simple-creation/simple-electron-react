import axios from "axios";
import { publicIp LOGIN } from './apiIp';
import { message } from 'antd';

let hide = null;

const instance = axios.create({
	timeout: 10000,
	baseURL: publicIp
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

let httpCode = {
    400: '请求参数错误',
    401: '权限不足, 请重新登录',
    403: '服务器拒绝本次访问',
    404: '请求资源未找到',
    500: '内部服务器错误',
    501: '服务器不支持该请求中使用的方法',
    502: '网关错误',
    504: '网关超时'
};

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    //config.headers['token'] = sessionStorage.getItem('token') || '';
    getUser();
    hide = message.loading({content: 'Loading...', duration: 0});
    if(user){
      // 设置统一的请求header
      config.headers.authorization = user.token; //授权(每次请求把token带给后台)
    }
    config.headers.platform = user ? user.platform : 8;

    // if (config.url.includes('pur/contract/export')) {
    //     config.headers['responseType'] = 'blob'
    // }
    // if (config.url.includes('pur/contract/upload')) {
    //     config.headers['Content-Type'] = 'multipart/form-data'
    // }
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
});

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    hide()
    if (response.statusText === 'ok') {     // 响应结果里的statusText: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
        return Promise.resolve(response.data)
    } else {
        message.error('响应超时')
        return Promise.reject(response.data.message)
    }
}, error => {
    hide();
    if (error.response) {
        // 根据请求失败的http状态码去给用户相应的提示
        let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
        message.error(tips)
        if (error.response.status === 401) {    // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
            //针对框架跳转到登陆页面
            localStorage.clear(); 
            this.props.history.push(LOGIN);
        }
        return Promise.reject(error)
    } else {
        message.error('请求超时, 请刷新重试')
        return Promise.reject('请求超时, 请刷新重试')
    }
});


// 处理请求返回的数据
function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if(response && (response.status === 200 || response.status === 304 || response.status === 400)){
      resolve(response.data);
    }else{
      message.success({
        content: '网络异常，请检查网络连接是否正常！',
        duration: 2
      });
    }
  });
};

/* 统一封装get和post请求 */
export default {
  post(url, params) {
    return axios({
      method: "post",
      url,
      data: params
    }).then(response => {
      return checkStatus(response);
    });
  },
  get(url, params) {
    return axios({
      method: "get",
      url,
      params,
    }).then(response => {
      return checkStatus(response);
    });
  }
};

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
};

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
};

// 获取缓存中的用户信息, 这是接口返回的信息。
var user;
function getUser() {
  if (localStorage.getItem('userInfo')) {
    user = JSON.parse(localStorage.getItem('userInfo'));
  }
}