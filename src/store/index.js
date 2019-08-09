/** @format */

import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import user from './modules/user';
import createLogger from 'vuex/dist/logger';

import { VUEX_DEFAULT_CONFIG } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  ...VUEX_DEFAULT_CONFIG,
  modules: {
    app,
    user
  },
  getters,
  strict: VUEX_DEFAULT_CONFIG.strict,
  plugins: VUEX_DEFAULT_CONFIG.strict ? [createLogger()] : []
});
