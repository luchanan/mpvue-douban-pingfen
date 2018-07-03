<template>
  <div class="film-star weui-flex">
    <div class="star-wrapper weui-flex" v-if="rating && rating.value">
      <div class="weui-flex" :style="{width: (rating.value / rating.max) * 100 + '%', overflow: 'hidden'}">
        <icon-font v-for="items in stars" iconColor="#F4F429" :key="items" iconClass="star"/>
      </div>
      <div class="weui-flex">
        <icon-font v-for="items in stars" :key="items" iconClass="star"/>
      </div>
    </div><template v-if="showScore">{{rating && rating.value ? rating.value : showText}}</template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stars: [1, 2, 3, 4, 5]
    }
  },
  props: {
    rating: {
      type: Object
    },
    showText: {
      type: String,
      default: '暂无评分'
    },
    showScore: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .film-star
    color #afafaf
    font-size 12px
    .star-wrapper
      position relative
      .weui-flex
        &:first-child
          position absolute
          top 0
          left 0
        &:last-child
          margin-right 5px
</style>
