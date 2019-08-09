/** @format */
/*封装一些指令 */
/**
 * Vue 跳转指令'v-jump',基于router.push方式
 * @param name/path 路由名或路径(必传)[eg:home或/home]
 * @param param 参数[eg:{id:123}]
 * @param type  按什么方式传递参数[1-按路由配置方式[eg:home/123]；2-按param方式[eg:{name/path:'',params:{id:123}}]；3-按query方式(默认)[eg:{name/path:'',query:{id:123}}]]
 * 例子：<div class="click-wrap" :data-id="item.id" v-jump="['home_detail', {id:123}, 2]">
 */
export const jump = {
  // el: 指令绑定的元素
  // vm: 拥有该指令的上下文 ViewModel
  // expression: 指令的表达式，不包括参数和过滤器
  // arg: 指令的参数
  // raw: 未被解析的原始表达式
  // name: 不带前缀的指令名
  bind: function(el, binding, vnode) {
    // 做绑定的准备工作（比如添加事件监听器，或是其他只需要执行一次的复杂操作）

    /*// 若和v-for指令共用，由于v-for的就地重用机制，需要指定一个唯一的key属性(对应vnode.key)，如果没有指定，这里需要修改
            vnode.key = Math.round(Math.random() * 12568)*/

    el.handler = function() {
      let data = binding.value || null;
      if (data) {
        let vm = vnode.context;
        let pathName = data[0] || null;
        let param = data[1] || null;
        let type = data[2] || 3;
        /*console.log('v-jump数据：', pathName, param, type);*/
        if (pathName) {
          if (type === 1) {
            /*path类型单独处理参数格式*/
            if (param) {
              var pStr = [];
              for (let j in param) {
                if (param.hasOwnProperty(j)) {
                  param[j] ? pStr.push(param[j]) : null;
                }
              }
            }
            vm.$router.push({
              path: '/' + pathName + (param ? '/' + pStr.join('/') : '')
            });
          }
          if (type === 2) {
            vm.$router.push({
              name: pathName,
              params: param
            });
          }
          if (type === 3) {
            vm.$router.push({
              name: pathName,
              query: param
            });
          } else {
            if (pathName.indexOf('/') > -1) {
              vm.$router.push({
                path: pathName
              });
            } else {
              vm.$router.push({
                name: pathName
              });
            }
          }
        } else {
          console.warn('好歹给个页面名啊！');
        }
      } else {
        console.error('v-jump似乎还需要点什么！');
      }
    };
    /*为Dom绑定事件*/
    el.addEventListener('click', el.handler, false);
  },
  update: function(newValue, oldValue) {
    // 根据获得的新值执行对应的更新（对于初始值也会被调用一次）
  },
  unbind: function(el) {
    // 做清理工作（比如移除在 bind() 中添加的事件监听器）
    /*为Dom移除事件*/
    el.removeEventListener('click', el.handler);
  }
};
