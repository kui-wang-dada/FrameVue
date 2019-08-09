<!-- @format -->

<template>
  <div class="no-data" v-if="!loading">
    <img src="@/assets/images/null.png">
    <p>{{label||$t('common.no_data')}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  components: {},
  props: {
    label: {
      type: String,
      default: ''
    }
  },

  computed: {
    ...mapGetters(['loading'])
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less">
@import '~assets/css/variable';
.no-data {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
  }
  p {
    font-size: 0.3rem;
    color: @color-font-des;
    margin-bottom: 0.4rem;
  }
}
</style>
