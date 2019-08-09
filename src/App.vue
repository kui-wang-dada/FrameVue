<!-- @format -->

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  // rem对屏幕进行适配
  computed: {
    ...mapGetters(['loading'])
  },
  watch: {
    loading(newV) {
      if (newV) {
        this.$toast.allowMultiple();
        this.toastLoading = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner'
        });
      } else {
        this.toastLoading.clear();
      }
    }
  },
  created() {
    this.$utils.check_update();
  },
  beforeMount() {
    let docEl = document.documentElement;
    let resizeEvt =
      'orientationchange' in window ? 'orientationchange' : 'resize';
    let recalc = function() {
      let deviceWidth = docEl.clientWidth;
      if (!deviceWidth) return;
      // if (deviceWidth > 750) deviceWidth = 750;
      document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    };
    if (!document.addEventListener) return;
    recalc();
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
    window.recalc = recalc;
  }
};
</script>

<style>
html {
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
}

body {
  /* Status bar height on iOS 11.0
  padding-top: constant(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom); */
  /* box-sizing: border-box;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  background: #fff; */
  /* margin: 0.4rem; */
}


</style>
