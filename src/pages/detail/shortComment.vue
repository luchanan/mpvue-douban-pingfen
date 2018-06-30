<template>
  <div class="short-comment">
    <h2>短评({{detail.total}})</h2>
    <ul>
      <li class="weui-flex" v-for="(items, index) in detail.interests" :key="index">
        <img :src="items.user.avatar">
        <div class="weui-flex__item">
          <h3 class="weui-flex"><span class="name">{{items.user.name}}</span> <filmStarOne :rating="items.rating" :show-score="false"></filmStarOne></h3>
          <time>{{items.create_time}}</time>
          <div class="content">{{items.comment}}</div>
        </div>
      </li>
    </ul>
    <div class="getMore">查看更多短评</div>
  </div>
</template>

<script>
import * as API from '@/api'
import filmStarOne from '@/components/film/star'
export default {
  data() {
    return {
      detail: {
        total: 0,
        interests: []
      }
    }
  },
  props: {
    params: {
      type: Object
    }
  },
  components: { filmStarOne },
  watch: {
    'params.id': {
      handler (val, oldVal) {
        this.getShortComment()
      },
      deep: true
    }
  },
  mounted () {
    console.log(this.params.id)
    this.getShortComment()
  },
  methods: {
    getShortComment () {
      API.getShortComment({id: this.params.id}).then(res => {
        console.log(res)
        this.detail = Object.assign({}, this.detail, res.data)
        console.log(this.detail)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/stylus/variable'
  .short-comment
    font-size 14px
    .name
      margin-right 10px
    time
      color $gray
      font-size 12px
    h2
      color $gray
      padding 0 10px 10px 10px
    ul
      padding 0 10px
      li
        margin 0 0 10px 0
      img
        width 40px
        height 40px
        border-radius 50%
        margin-right 10px
    .getMore
      text-align center
      padding 20px 0 30px 0
      color $green
</style>
