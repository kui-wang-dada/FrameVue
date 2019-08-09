<!-- @format -->

<template>
  <div :class="'no-login-'+position">
    <div class="con-wrap">
      <p class="title">{{$t('auth.nologin.title')}}</p>
      <p class="des">{{$t('auth.nologin.label')}}</p>
    </div>
    <van-button v-jump="['login']" class="btn" size="small">{{$t('auth.nologin.btn')}}</van-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    position: {
      type: String,
      default: 'row'
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less">
@import '~assets/css/variable';
.no-login-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: @color-font-title;
  padding: 0.4rem;
  .con-wrap {
    .title {
      font-size: @font-size-h1;
      font-weight: bold;
    }
    .des {
      margin-top: 0.2rem;
      font-size: 0.26rem;
      color: @color-font-des;
    }
  }
  .btn {
    background: @color-theme;
    color: #fff;
    border-radius: 0.04rem;
    border: none;
    /deep/ .van-button__text {
      font-weight: bold;
      font-size: @font-size-h3;
    }
  }
}

.no-login-column {
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0.4rem;
  align-items: center;
  .con-wrap {
    .title {
      font-size: 0.3rem;
      text-align: center;
    }
    .des {
      margin-top: 0.2rem;
      font-size: 0.26rem;
    }
  }
  .btn {
    margin-top: 0.4rem;
  }
}
</style>
