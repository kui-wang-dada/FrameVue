/** @format */

import router from '@/router';
import store from '@/store';
import i18n from '@/assets/lang';
import { getStorage, setStorage } from '@/utils';
/**
 * @msg:路由拦截
 * @param {Object} to 希望跳转的路由
 * @param {Object} from 从哪个路由跳
 * @param {Function} next 执行下一步操作
 * @return:
 */
export function routerBeforeEachFunc(to, from, next) {
  // 如果曾经登录过，登录id会存入localstorage
  let loginEmail = getStorage('loginEmail');
  if (loginEmail) {
    // vuex中存入登录状态，来控制页面显示
    if (!store.state.user.loginEmail) {
      store.commit('SET_LOGIN_EMAIL', loginEmail);
    }

    // 拉取用户信息
    if (!store.state.user.user) {
      store
        .dispatch('GetUserInfo')
        .then(user => {
          let language = user.language.toLowerCase();

          if (language === 'zh' || language === 'en') {
            i18n.locale = language;
            setStorage('language', language);
          } else {
            i18n.locale = 'zh';
          }
          next();
        })
        .catch(() => {
          localStorage.removeItem('loginEmail');
          next({
            path: '/'
          });
        });
    } else {
      next();
    }
  } else {
    store.commit('SET_LOGIN_EMAIL', null);
    store.commit('SET_USER', null);
    next();
  }
}

export function routerAfterEachFunc(to, from) {}
