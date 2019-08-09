<!-- @format -->

<!--
    by : kuiwang 2018/07/26
    name : 组件-底部导航
    notes: 备注……
-->
<template>
  <van-tabbar v-model="active" active-color="#3fc375" class="tabbar" ref="tabbar">
    <van-tabbar-item :to="{name:item.to}" v-for="(item,index) in footBar" :key="item.to">
      <span class="label">{{$t(item.label)}}</span>
      <i
        slot="icon"
        :class="['iconfont',active===index?'icon-'+item.iconActive:'icon-'+item.icon]"
      />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'footerBar',
  data() {
    return {
      active: null,
      footBar: [
        {
          label: 'common.foot.home',
          to: 'home',
          icon: 'home1',
          iconActive: 'home2'
        },
        {
          label: 'common.foot.service',
          to: 'service',
          icon: 'service1',
          iconActive: 'service2'
        },
        {
          label: 'common.foot.my',
          to: 'my',
          icon: 'wode1',
          iconActive: 'wode2'
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.footBar.forEach((item, index) => {
        if (item.to === this.$route.name) {
          this.active = index;
        }
      });
    }
  },
  created() {
    this.footBar.forEach((item, index) => {
      if (item.to === this.$route.name) {
        this.active = index;
      }
    });
  },
  mounted() {
    // console.log(this.$refs.footerBar.style.height);
  }
};
</script>

<style lang="less" scoped>
@import '~assets/css/variable';
.tabbar {
  height: 1.2rem;
  background: #fff;

  i {
    font-size: 0.44rem;
  }
  .label {
    font-size: 0.24rem;
  }
  &.van-hairline--top-bottom::after {
    border-bottom: none;
  }
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .tabbar {
    padding-bottom: 0.4rem;
    background: #fff;
  }
}
</style>
