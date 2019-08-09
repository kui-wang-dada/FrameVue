/** @format */
import { AXIOS_DEFAULT_CONFIG } from '@/config';
/**
 * 时间戳返回多久以前（刚刚/几秒前/几分钟前/几小时前/几天前/几周前/几个月前/几年前）
 * @timeStamp {number} 时间戳，单位为毫秒
 */
export function timeAgo(timeStamp) {
  //将字符串转换成时间格式
  let now = new Date(),
    oldTime = new Date(parseInt(timeStamp)),
    difference = now - oldTime,
    result = '',
    second = 1000,
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    halfamonth = day * 15,
    month = day * 30,
    year = month * 12,
    _year = difference / year,
    _month = difference / month,
    _week = difference / (7 * day),
    _day = difference / day,
    _hour = difference / hour,
    _min = difference / minute,
    _second = difference / second;
  // console.log(new Date(2008, 5, 12, 3, 2, 4).getTime());

  if (_year >= 1) {
    result = parseInt(_year) + '年前';
  } else if (_month >= 1) {
    result = parseInt(_month) + '个月前';
  } else if (_week >= 1) {
    result = parseInt(_week) + '周前';
  } else if (_day >= 1) {
    result = parseInt(_day) + '天前';
  } else if (_hour >= 1) {
    result = parseInt(_hour) + '小时前';
  } else if (_min >= 1) {
    result = parseInt(_min) + '分钟前';
  } else if (_second > 5000) {
    result = parseInt(_second) + '秒前';
  } else {
    result = '刚刚';
  }
  return result;
}

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
 * 默认图片，用于拼接图片地址&填充默认图片
 * @data {string} 图片地址
 * @isPic {boolean} 是否是图片模式，默认为头像模式
 */
export function checkImg(data, isPic) {
  console.log(isPic);
  let strategy = {
    teacher: require('@/assets/images/teacher.png')
  };
  let defaultImg;
  if (isPic) {
    defaultImg = strategy[isPic];
  } else {
    defaultImg = require('@/assets/images/pic_not.png');
  }

  if (data) {
    if (data.indexOf('http') > -1) {
      return data;
    } else {
      // console.log(123, AXIOS_DEFAULT_CONFIG.baseURL);
      // let base = AXIOS_DEFAULT_CONFIG.baseURL.replace(/\/apis/, '');
      // let base = 'https://baobao.cctar.us';
      let base = 'https://erp.wholerengroup.com';
      return base + data;
    }
  } else {
    return defaultImg;
  }
}
// xss转义
export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * 保留小数位
 * @param data 数值
 * @param num 保留的位数
 * @param float 是否小数
 */
export function toFixed(data, num, float) {
  if (float) {
    return data ? data.toFixed(num || 2) : data;
  } else {
    return data > 0 && parseInt(data) === data ? data.toFixed(num || 2) : data;
  }
}

/**
 * 首页user_tags的处理
 * @param data 数值
 * @param num 保留的位数
 * @param float 是否小数
 */
export function handleTags(data) {
  return data.split(',');
}
