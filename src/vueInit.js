/** @format */
import 'babel-polyfill';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';

import './assets/css/index.css';

import Vue from 'vue';
import App from './App';

// 移动端300毫秒延迟
import fastclick from 'fastclick';
fastclick.attach(document.body);
// 公共方法
import * as utils from './utils';
import exp from './utils/regex';
import * as filters from './utils/filter'; // global filters
import * as directives from './utils/directive'; // global filters
// 导入插件
import plugin from '@/plugins';
import router from '@/router';
import store from '@/store';

//引入语言文件
import i18n from './assets/lang';

export default function init() {
  console.log(4);
  Vue.use(Vant);

  Vue.use(Lazyload, {
    preLoad: 1.3,
    error: require('@/assets/images/pic_not.png')
  });
  Vue.use(plugin);

  // register global utility filters.
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
  // register global utility directives.
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
  });
  // 原型上扩展一些公共方法
  Vue.prototype.$utils = utils;

  Vue.prototype.$exp = exp;

  Vue.config.productionTip = false;

  new Vue({
    el: '#app',
    i18n,
    store,
    router,
    components: {
      App
    },
    template: '<App/>'
  });
}
