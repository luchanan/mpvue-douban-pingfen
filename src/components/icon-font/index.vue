<template>
  <i :class="iconName" :style="{color: iconColor}"></i>
</template>

<script>
import './iconfont.css'
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      default: '#CDCDCD'
    }
  },
  computed: {
    iconName () {
      return `iconfont icon-${this.iconClass}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .iconfont
    font-size 12px !important
</style>
