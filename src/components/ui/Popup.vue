<!-- @format -->

<template>
  <div>
    <van-popup v-model="show" :position="position" :overlay="overlay">
      <header-top v-if="title" :title="title" :backFlag="true" @clickBack="toggleShow(false)"></header-top>
      <slot></slot>
    </van-popup>
  </div>
</template>

<script>
import { HeaderTop } from 'ui';
export default {
  components: { HeaderTop },
  props: {
    title: {
      type: String,
      defalut: ''
    },
    position: {
      type: String,
      default: 'bottom'
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    toggleShow(flag) {
      this.show = flag;
    }
  }
};
</script>

<style scoped lang="less">
@import '~assets/css/variable';

.van-popup--left,
.van-popup--right {
  width: 100%;
  height: 100%;
}
</style>
