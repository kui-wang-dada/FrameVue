/** @format */

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.splice(newClass.indexOf(className), 1);
  el.className = newClass.join(' ');
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

export function getData(el, name, val) {
  const prefix = 'data-';
  if (val) {
    return el.setAttribute(prefix + name, val);
  }
  return el.getAttribute(prefix + name);
}
// 创造一个元素
let elementStyle = document.createElement('div').style;
// 拿到当前浏览器前缀
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

export function prefixStyle(style) {
  // 如果不是任何浏览器
  if (vendor === false) {
    return false;
  }
  // 如果是默认情况
  if (vendor === 'standard') {
    return style;
  }
  // 如果是其他浏览器
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
