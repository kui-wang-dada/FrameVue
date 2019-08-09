/** @format */

/** @format */
import { mapGetters } from 'vuex';
import { Scroll } from 'ui';
export const keepAliceMixins = {
  data() {
    return {
      isShowContent: false
    };
  },
  activated() {
    if (!this.$utils.isObjectValueEqual(this.query, this.$route.query)) {
      this.name = this.$route.query.name;
      this.query = this.$route.query;
      this.reset();
      this.init();
    } else {
      this.isShowContent = true;
      console.log(123);
      if (this.$refs.scroll) {
        this.$refs.scroll.refresh();
      }
    }
  },
  deactivated() {
    this.isShowContent = false;
  }
};

export const scrollMixins = {
  components: {
    Scroll
  },
  methods: {
    pulldown() {
      this._getData('pull');
    }
  }
};
