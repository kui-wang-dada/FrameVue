<!-- @format -->

<!--
    by : wk 2019/04/14
    name : 组件-标题栏
    notes: 备注……
-->
<template>
  <div class="vx-header-bar" :class="fixed?'fixed':''">
    <van-nav-bar :title="title" :border="border">
      <div slot="title" class="title">{{title}}</div>
      <div slot="left" class="left-wrap" @click="onClickLeft" v-if="showLeft">
        <van-icon name="arrow-left" color="#666"></van-icon>
        <p>{{$t('common.back')}}</p>
      </div>
      <div slot="right" v-if="right" class="right" v-jump="[right.route]">
        <i :class="['iconfont','icon-'+right.icon]"></i>
      </div>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    right: {
      type: Object,
      default: null
    },
    /**
     * 标题
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 是否固定在顶部
     */
    fixed: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有底部边框
     */
    border: {
      type: Boolean,
      default: true
    },
    /**是否显示左边*/
    showLeft: {
      type: Boolean,
      default: true
    },
    /**
     * 自定义样式
     */
    backFlag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route(to, from) {
      console.log(1, this.showLeft);
    }
  },

  methods: {
    /**
     * 返回上一步
     */
    onClickLeft() {
      if (this.backFlag) {
        this.$emit('clickBack');
      } else {
        console.log('router', this.$router);
        this.$router.back();
      }
    }
  }
};
</script>

<style lang="less">
@import '~assets/css/variable';

.vx-header-bar {
  position: relative;
  z-index: 15;
  width: 100%;
  .van-nav-bar {
    height: 1rem;
    line-height: 1rem;
  }
  .title {
    font-size: @font-size-h1;
    color: @color-font-title;
    font-weight: bold;
  }
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
  }
  .left-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 1.5rem;
    font-size: @font-size-p1;
    p {
      color: @color-font-des;
    }
  }
  .right {
    width: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    i {
      font-size: 0.4rem;
    }
  }
}
</style>
