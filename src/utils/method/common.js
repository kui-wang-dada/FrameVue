/** @format */

import { AXIOS_DEFAULT_CONFIG } from '@/config';

/**
 * 时间戳转日期格式
 * @timeStamp {number} 时间戳
 * @format {string} 格式[完整格式：yyyy-MM-dd HH:mm:ss，默认yyyy-MM-dd]
 */

export function formatTime(timeStamp, format) {
  if (timeStamp) {
    format = format || 'yyyy-MM-dd';
    let week = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ];
    let date = new Date(parseInt(timeStamp));
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S+': date.getMilliseconds(),
      'W+': week[date.getDay()]
    };

    if (/(y+)/.test(format))
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    for (let k in o)
      if (new RegExp('(' + k + ')').test(format))
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return format;
  }
}

/**
 * 异常处理
 * @param {boolean} condition
 * @param {string} msg
 */
export function assert(condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`);
}
/**
 * vue 跳转方法
 * @param name 路径或者名字
 * @param params  参数对象
 * @param isParams 是否以params方式传递参数，默认为false,即以query方式传递参数
 */
export function jump(name, params, isParams) {
  let type = !isParams ? 'query' : 'params';
  if (name.indexOf('/') > -1) {
    /*有斜杠为按路径跳转*/
    if (type === 'params') {
      this.$router.push({
        path: name,
        params: params || ''
      });
    } else {
      this.$router.push({
        path: name,
        query: params || ''
      });
    }
  } else {
    /*无斜杠为按路由名跳转*/
    if (type === 'params') {
      this.$router.push({
        name: name,
        params: params || ''
      });
    } else {
      this.$router.push({
        name: name,
        query: params || ''
      });
    }
  }
}
/**
 * 防抖函数
 * @param {function} func 需要防抖的函数
 * @param {time} delay 延迟时间
 */
export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 默认图片，用于拼接图片地址&填充默认图片
 * @data {string} 图片地址
 * @isPic {boolean} 是否是图片模式，默认为头像模式
 */
export function checkImg(data, isPic) {
  console.log(isPic);
  const defaultImg = isPic
    ? 'http://placeimg.com/200/120/people'
    : require('@/assets/images/pic_not.png');
  if (data) {
    if (data.indexOf('http') > -1) {
      return data;
    } else {
      // let base = AXIOS_DEFAULT_CONFIG.baseURL.replace(/\/apis/, '');
      let base = 'https://baobao.cctar.us';
      // let base = 'https://erp.wholerengroup.com';
      return base + data;
    }
  } else {
    return defaultImg;
  }
}
/**
 * 拿缓存数据
 * @param {String} key
 */
export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * 设置缓存数据
 * @param {String} key
 * @param {all} val
 */
export function setStorage(key, val) {
  return localStorage.setItem(key, JSON.stringify(val));
}

/**
 * 数组对象的去重
 */
export function getOnly(data, key) {
  let arr = [];
  data.forEach((item, index) => {
    let flag = arr.some((aItem, aIndex) => {
      return aItem[key] === item[key];
    });

    if (!flag) {
      arr.push(Object.assign({}, item));
    }
  });

  return arr;
}

/**
 * rem和px单位的换算
 */
export function remToPx(rem) {
  let style = document.getElementsByTagName('html')[0].style;
  let unit = style.fontSize.replace('px', '');
  return unit * rem;
}

export function getHeight(rem) {
  let height = document.body.clientHeight;
  let px = remToPx(rem);
  return height - px + 'px';
}

export function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}
