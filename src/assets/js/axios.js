import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = '/api/'
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  console.log('错误的传参')
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
  if(!res.data.success){
    return Promise.resolve(res);
  }
  return res;
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error);
});
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  console.log('错误的传参')
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
  if(!res.data.success){
    return Promise.resolve(res);
  }
  return res;
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error);
});

export default {
  postData (url, params) {
    return axios.post(url, params || {})
  },
  getData (url,params) {
    return axios.get(url,params)
  }
}
