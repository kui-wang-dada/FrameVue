/** @format */

import axios from 'axios';
import uuid from 'uuid';
import { setStorage } from '@/utils';
import store from '@/store';
import { Toast } from 'vant';
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '../index';

const CancelToken = axios.CancelToken;
let CancelPromise = {};
let noLoadingApi = ['news'];

/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export function requestSuccessFunc(req) {
  console.log(req);
  if (!req.type) {
    store.commit('SET_LOADING', true);
  }
  var session_id = localStorage.getItem('session_id');
  if (!session_id) {
    session_id = uuid.v1();
    localStorage.setItem('session_id', session_id);
  }
  console.log('resq', req);
  req.headers['X-APIS-SID'] = session_id;
  req.headers['X-APIS-Version'] = 'v1';
  req.headers['X-APIS-Application'] = 'usercenter';

  //取消重复请求
  if (CancelPromise[req.url]) {
    CancelPromise[req.url]();
  }

  req.cancelToken = new CancelToken(c => {
    CancelPromise[req.url] = c;
  });

  CONSOLE_REQUEST_ENABLE && console.info('request', `url:${req.url}`, req);
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  return req;
}

/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc(reqError) {
  // 自定义请求失败逻辑，处理断网，请求发送监控等
  return Promise.reject(reqError);
}

/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export function responseSuccessFunc(response) {
  if (!response.config.type) {
    store.commit('SET_LOADING', false);
  }

  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  CONSOLE_RESPONSE_ENABLE && console.info('response', response);
  if (response && response.data) {
    let status = response.data.status;
    if (status.code !== 200 && status.code !== 401) {
      Toast({
        message: response.data.status.message
      });
    }
    if (status.code === 401) {
      Toast({
        message: response.data.status.message,
        onClose: () => {
          setStorage('loginEmail', null);
          store.commit('SET_LOGIN_EMAIL', null);
          store.commit('SET_USER', null);
        }
      });
    }

    return response.data;
  } else {
    // 异常处理
    console.log('warning', response.data.msg);
    return Promise.reject(
      'error：' + (response && response.data && response.data.msg)
    );
  }
}

/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc(resError) {
  store.commit('SET_LOADING', false);
  //如果是取消，返回空，前端不提示消息
  if (resError.toString() == 'Cancel') {
    resError = '';
  }
  console.log('fail', resError.response);
  // 响应失败，可根据resError信息做监控处理
  return Promise.reject(resError);
}
