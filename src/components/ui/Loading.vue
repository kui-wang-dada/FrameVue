<!-- @format -->

<template>
  <div class="loading">
    <img src="@/assets/images/loading.gif" width="24" height="24" alt>
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入'
    }
  }
};
</script>
<style scoped lang='less'>
@import '~assets/css/variable';
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 16px;
    font-size: 0.3rem;
    color: @color-font-des;
  }
}
</style>
