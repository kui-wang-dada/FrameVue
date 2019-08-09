<!-- @format -->

<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot></slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <van-loading></van-loading>
          </div>
        </div>
      </slot>
    </div>
    <slot
      name="pulldown"
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :isPullingDown="isPullingDown"
      :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <van-loading></van-loading>
          </div>
          <div v-else>
            <span>{{refreshTxt}}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import Bubble from './bubble.vue';
import BScroll from 'better-scroll';

const COMPONENT_NAME = 'scroll';
const DIRECTION_H = 'hor';
const DIRECTION_V = 'ver';
export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },

    pullDownRefresh: {
      type: Object,
      default: () => {
        return { threshold: 90, stop: 40 };
      }
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    scrollHeight: {
      type: Number,
      default: 0
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0
    };
  },
  computed: {
    pullUpTxt() {
      const moreTxt =
        (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
        this.$t('common.scroll.more');
      const noMoreTxt =
        (this.pullUpLoad &&
          this.pullUpLoad.txt &&
          this.pullUpLoad.txt.noMore) ||
        this.$i18n.t('common.scroll.noMore');
      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    refreshTxt() {
      return (
        (this.pullDownRefresh && this.pullDownRefresh.txt) ||
        this.$i18n.t('common.scroll.pulldown')
      );
    }
  },
  created() {
    this.pullDownInitTop = -90;
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }

      if (this.scrollHeight) {
        let height = document.body.clientHeight;
        this.$refs.wrapper.style.height = `${height - this.scrollHeight}px`;
      }

      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${this.getRect(
          this.$refs.wrapper
        ).height + 1}px`;
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      };
      this.scroll = new BScroll(this.$refs.wrapper, options);
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos);
        });
      }
      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', pos => {
          this.$emit('scroll-end', pos);
        });
      }
      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart');
        });
        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start');
        });
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }
      if (this.pullUpLoad) {
        this._initPullUpLoad();
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    autoPullDownRefresh() {
      this.scroll && this.scroll.autoPullDownRefresh();
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    clickItem(e, item) {
      console.log(e);
      this.$emit('click', item);
    },
    destroy() {
      this.scroll.destroy();
    },

    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      } else {
        this.refresh();
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.$emit('pulldown');
      });
      this.scroll.on('scroll', pos => {
        if (!this.pullDownRefresh) {
          return;
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        } else {
          this.bubbleY = 0;
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 -
            (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true;
        this.$emit('pullingUp');
      });
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh;
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          resolve();
        }, stopTime);
      });
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
    getRect(el) {
      if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        };
      } else {
        return {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        };
      }
    }
  },
  watch: {
    data(newV) {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
    }
    // pullUpLoad(newV) {
    //   if (newV !== this.pullUpLoad) {
    //     console.log(123, newV);
    //     this.initScroll();
    //   }
    // }
  },
  components: {
    Bubble
  }
};
</script>
<style lang="less" scoped>
.list-wrapper {
  position: relative;
  height: 100%;

  overflow: hidden;
  background: #fff;
  .scroll-content {
    position: relative;
    // z-index: 1;
  }
}

.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  .after-trigger {
    margin-top: 10px;
    font-size: 0.28rem;
    color: #666;
  }
}

.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  .before-trigger {
    margin-top: 10px;
    font-size: 0.28rem;
    color: #666;
  }
}
</style>
