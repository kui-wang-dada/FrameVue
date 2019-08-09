/** @format */

import api from '@/plugins/api';
import i18n from '@/assets/lang';
import { setStorage, getStorage } from '@/utils';
export default {
  state: {
    loginEmail: null,
    // 用户信息
    user: null
  },
  mutations: {
    // 设置用户信息
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_LOGIN_EMAIL: (state, email) => {
      state.loginEmail = email;
    }
  },
  actions: {
    /**
     * @msg:拿到用户信息
     * @param {type}
     * @return: promise
     */
    GetUserInfo({ commit, state }) {
      let newUrl = getStorage('loginEmail');
      return new Promise((resolve, reject) => {
        api['user/userInfo']()
          .then(res => {
            if (!res.data.display) {
              reject(new Error('error'));
            }

            commit('SET_USER', res.data.display);

            resolve(res.data.display);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
